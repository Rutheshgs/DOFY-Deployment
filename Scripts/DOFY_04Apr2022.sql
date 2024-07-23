ALTER View [dbo].[vw_PersonList]

AS
       Select 
          Id,
          LoginId,
          UserRoleId,
          FirstName,
          MiddleName,
          LastName,
		  (FirstName + Case When IsNULL(MiddleName, '') != '' Then ' '+ MiddleName End + 
					Case When IsNULL(LastName, '') != '' Then ' '+ LastName End) as FullName,
          Email,
          Prefix,
          Suffix,
          Mobile,
          SecondaryMobile,
          DateOfBirth,
          UploadImagePath,
          UploadImageName,
          RowOrder,
          Active,
          Created,
          CreatedBy,
          Modified,
          ModifiedBy
        From PERSON (NoLock) 
        Where Active = 1 

GO

ALTER PROCEDURE [dbo].[GetOrdersList]
    @WhereClause varchar(200),
    @SortOrder varchar(100),
    @OffsetStart int,
    @RowsPerPage int,
	@StatusId bigint = null,
	@ProductTypeId bigint = null
AS
    BEGIN

                Declare @inSortOrder varchar(50) = @SortOrder;
                Declare @inWhereClause varchar(50) = @WhereClause;
                Declare @inOffsetStart int = @OffsetStart;
                Declare @inRowsPerPage int = @RowsPerPage;
                Declare @SortColumn varchar(50);
                Declare @Direction varchar(4);

                Select @inOffsetStart = OffsetStart, @inRowsPerPage = RowsPerPage, @SortColumn = SortColumn, @Direction = Direction, @inWhereClause = WhereClause From 
                                    [dbo].[fn_GetSPDefaults] (@inOffsetStart, @inRowsPerPage, @inSortOrder, @inWhereClause);

                Select 
                     od.Id,
                     od.PersonId,
                     od.ServiceTypeId,
					 sr.DisplayName as ServiceType,
                     od.ModelVariantId,
					 mv.DisplayName as ModelVariantName,
					 mv.ThumbnailPath,
					 od.OrderCode,
					 mv.ProductTypeName,
					 mv.BrandMasterName,
					 mv.SeriesModelName,
					 pl.FullName as UserName,
					 pl.Mobile as UserMobile,
					 apl.AppointmentDate,
					 apl.StartTime,
					 'TNagar' as AppointmentCity, -- Todo add appointment address id in appointments
					 '600017' as AppointmentPincode,  -- Todo add appointment address id in appointments                    
                     od.StatusId,
					 apl.AssigneeId,
					 asg.FirstName + ' ' + asg.LastName as AssigneeName, 
					 sl.DisplayName as StatusName,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_OrdersList od
				 Inner Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
				 Inner Join vw_ServiceTypeList sr on sr.Id = od.ServiceTypeId				 
				 Inner Join vw_PersonList pl on pl.Id = od.PersonId
				 Inner Join vw_StatusList sl on sl.Id = od.StatusId
				 Left Outer Join vw_AppointmentList apl on apl.OrderId = od.Id
				 Left Outer join vw_PersonList asg on asg.Id =apl.AssigneeId				 
                Where (@StatusId is null or od.StatusId = @StatusId)
				and (@ProductTypeId is null or mv.ProductTypeId = @ProductTypeId)
				And (@inWhereClause Is Null
                        Or (OrderCode LIKE @inWhereClause
							or mv.BrandMasterName Like @inWhereClause
							or mv.SeriesModelName Like @inWhereClause
							or pl.Mobile Like @inWhereClause
							or pl.FirstName Like @inWhereClause
							or pl.LastName Like @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'ORDERCODE' THEN OrderCode
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), od.Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'ORDERCODE' THEN OrderCode                       
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), od.Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @OffsetStart ROWS 
                FETCH NEXT @RowsPerPage ROWS ONLY
End
GO


Create PROCEDURE [dbo].[GetOrderSummary]
    @OrderId bigint   
AS
    BEGIN

	Declare @QuestionaireVersion bigint = (Select Max(Version) From vw_QuestionnaireResponsesList where OrderId = @OrderId);

	--Order data
	Select 
                     od.Id,
                     od.PersonId,
                     od.ServiceTypeId,
					 sr.DisplayName as ServiceType,
                     od.ModelVariantId,
					 mv.DisplayName as ModelVariantName,
					 mv.ThumbnailPath,
					 od.OrderCode,
					 mv.ProductTypeName,
					 mv.BrandMasterName,
					 mv.SeriesModelName,
					 pl.FullName as UserName,
					 pl.Mobile as UserMobile,
					 pl.SecondaryMobile,									                
                     od.StatusId,
					 sl.DisplayName as StatusName
                 From vw_OrdersList od
					 Inner Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
					 Inner Join vw_ServiceTypeList sr on sr.Id = od.ServiceTypeId				 
					 Inner join vw_PersonList pl on pl.Id = od.PersonId
					 Inner Join vw_StatusList sl on sl.Id = od.StatusId
				 Where od.Id = @OrderId

	--Appointment Data
	--To do --Add address in this table
			Select 
				Id
				, OrderId
				, AssigneeId
				, StatusId
				, AppointmentDate
				, StartTime
				, Remarks
				, TechnicianComments
				, RowOrder
				, IsReschedule
				, Active
				, 'TNagar' as AppointmentCity -- Todo add appointment address id in appointments
				, '600017' as AppointmentPincode  -- Todo add appointment address id in appointments 
			From vw_AppointmentList apl
			Where apl.OrderId = @OrderId

	-- Assingee details
		Select pl.Id
			  , LoginId
			  , UserRoleId
			  , FullName AssigneeName			  
			  , Email		  
			  , Mobile
			  , SecondaryMobile
			  , UploadImagePath
			  , UploadImageName
			  , 5 as UserRating
			  , ual.Address
			  , ual.PinCode
			  , ual.CityId
		From vw_PersonList pl
			Inner join vw_AppointmentList apl on apl.AssigneeId = pl.Id
			Inner join vw_UserAddressList ual on ual.PersonId = pl.Id
		Where apl.OrderId = @OrderId and ual.IsDefault = 1

		-- Order Documents

		Select 
				odl.Id
				, OrdersId
				, DocumentTypeId
				, DocumentPath
				, odl.RowOrder
				, odl.Active
				, dyl.DisplayName as DocumentTypeName
		From vw_OrderDocumentsList odl
			Inner join vw_DocumentTypeList dyl on dyl.Id = odl.DocumentTypeId
		Where odl.OrdersId = @OrderId

		-- Questionaire Response

		Select qrl.Id
			  , OrderId
			  , QuestionnaireTemplateId
			  , qrl.Selected
			  , qrl.Threshold
			  , qrl.RowOrder
			  , qrl.Version
			  , qrl.Active
			  , qt.DisplayName as Question
			  , qt.AnswerType
			  , qt.ThumbnailPath
			  , qt.Type as QuestionType
			  , qt.QuestionnaireTypeId
			  , qtl.DisplayName as QuestionaireType
			  , qt.ParentId
		From vw_QuestionnaireResponsesList qrl
			Inner Join vw_QuestionnaireTemplateList qt on qt.Id = qrl.QuestionnaireTemplateId
			Inner Join vw_QuestionnaireTypeList qtl on qtl.Id = qt.QuestionnaireTypeId
		Where qrl.OrderId = @OrderId and qrl.Version = @QuestionaireVersion


		-- Repair Orders

		Select opl.Id
			  , OrderId
			  , opl.RepairTypeId
			  , PartTypeId
			  , opl.RowOrder
			  , opl.Active
			  , rt.DisplayName as RepairType
			  , pt.DisplayName as PartType
		From vw_OrderPartsList opl
			Inner Join vw_RepairTypeList rt on rt.Id = opl.RepairTypeId
			Inner Join vw_PartTypeList pt on pt.Id = opl.PartTypeId
		Where opl.OrderId = @OrderId


End
GO

Create PROCEDURE [dbo].[GetPersonAddress]    
	@PersonId bigint
AS
    BEGIN

                Declare @inPersonId varchar(50) = @PersonId;               

                Select 
                     ua.Id,
                     AddressTypeId,
                     PersonId,
                     CountryId,
                     StateId,
                     CityId,
                     PinCode,
                     Address,
                     MobilePhone,
                     WorkPhone,
                     HomePhone,
                     EmailId,
                     LocationPin,
                     IsDefault,
                     ua.Active,
                     ua.RowOrder,
					 pl.FullName as UserName,
					 ad.DisplayName as AddressType,
					 'Chennai' as CityName,
					 'TamilNadu' as StateName
                 From vw_UserAddressList ua
				 Inner Join vw_PersonList pl on pl.Id = ua.PersonId
				 Inner Join vw_AddressTypeList ad on ad.Id = ua.AddressTypeId
				 Where pl.Id = @PersonId
             
End
GO

Create PROCEDURE [dbo].[GetPersonOrders]    
	@PersonId bigint
AS
    BEGIN

           Select 
                     od.Id,
                     od.PersonId,
                     od.ServiceTypeId,
					 sr.DisplayName as ServiceType,
                     od.ModelVariantId,
					 mv.DisplayName as ModelVariantName,
					 mv.ThumbnailPath,
					 od.OrderCode,
					 mv.ProductTypeName,
					 mv.BrandMasterName,
					 mv.SeriesModelName,
					 pl.FullName as UserName,
					 pl.Mobile as UserMobile,
					 apl.AppointmentDate,
					 apl.StartTime,
					 'TNagar' as AppointmentCity, -- Todo add appointment address id in appointments
					 '600017' as AppointmentPincode,  -- Todo add appointment address id in appointments                    
                     od.StatusId,
					 apl.AssigneeId,
					 asg.FirstName + ' ' + asg.LastName as AssigneeName,   
					 od.StatusId,
					 od.FinalPaid,
					 sl.DisplayName as StatusName,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_OrdersList od
				 Inner Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
				 Inner Join vw_ServiceTypeList sr on sr.Id = od.ServiceTypeId				 
				 Inner Join vw_PersonList pl on pl.Id = od.PersonId
				 Inner Join vw_StatusList sl on sl.Id = od.StatusId
				 Left Outer Join vw_AppointmentList apl on apl.OrderId = od.Id
				 Left Outer join vw_PersonList asg on asg.Id =apl.AssigneeId
             
End
GO