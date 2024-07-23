ALTER View [dbo].[vw_PersonList]

AS
       Select 
          Id,
          LoginId,
          UserRoleId,
          FirstName,
          MiddleName,
          LastName,
		  CONCAT(FirstName, Case When IsNULL(MiddleName, '') != '' Then ' '+ MiddleName End, 
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


ALTER PROCEDURE [dbo].[GetOrderSummary]
    @OrderId bigint   
AS
    BEGIN

	Declare @QuestionaireVersion bigint = (Select Max(Version) From vw_QuestionnaireResponsesList where OrderId = @OrderId);

	Declare @SeriesModelColorId bigint = (Select Top 1 SeriesModelColorId 
											From vw_OrderPartsList opl
											Inner Join vw_PartTypeList pl on pl.Id = opl.PartTypeId
											where OrderId = @OrderId);

	--Order data
	Select 
                     od.Id,
                     od.PersonId,
                     od.ServiceTypeId,
					 sr.DisplayName as ServiceType,
                     od.ModelVariantId,
					 mv.DisplayName as ModelVariantName,					
					 od.OrderCode,
					 IsNULL(mv.ProductTypeName, sm.ProductTypeName) as ProductTypeName,
					 IsNULL(mv.BrandMasterName, sm.BrandMasterName) as BrandMasterName,
					 IsNULL(mv.SeriesModelName, sm.DisplayName) as SeriesModelName,
					 pl.FullName as UserName,
					 pl.Mobile as UserMobile,
					 pl.SecondaryMobile,									                
                     od.StatusId,
					 od.SuggestedCost,
					 od.FinalPaid,
					 sl.DisplayName as StatusName,
					 IsNULL(mv.ThumbnailPath, sm.ThumbnailPath) as ThumbnailPath,
					 od.CustomerExpectation,
					 smc.DisplayName SeriesModelColor
                 From vw_OrdersList od
					 Left outer Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
					 Left Outer Join vw_SeriesModel sm on sm.Id = od.SeriesModelId
					 Inner Join vw_ServiceTypeList sr on sr.Id = od.ServiceTypeId				 
					 Inner join vw_PersonList pl on pl.Id = od.PersonId
					 Inner Join vw_StatusList sl on sl.Id = od.StatusId
					 Left Outer Join vw_SeriesModelColors smc on smc.Id = @SeriesModelColorId
				 Where od.Id = @OrderId

	--Appointment Data
	--To do --Add address in this table
			Select 
				apl.Id
				, OrderId
				, AssigneeId
				, AppointmentDate
				, StartTime
				, EndTime
				, Remarks
				, TechnicianComments
				, apl.RowOrder
				, IsReschedule
				, apl.Active
				, ua.Address
				, ua.City as AppointmentCity 
				, ua.PinCode as AppointmentPincode 
			From vw_AppointmentList apl
			Left Outer Join vw_UserAddressList ua on ua.Id = apl.UserAddresId
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
			  , qtl.DisplayName as QuestionnaireType
			  , qt.ParentId
			  , Case When qrl.Selected = 1 then qt.ResponseYes 
				When qrl.Selected = 0 then qt.ResponseNo
				Else null End as ResponseText
		From vw_QuestionnaireResponsesList qrl
			Inner Join vw_QuestionnaireTemplateList qt on qt.Id = qrl.QuestionnaireTemplateId
			Inner Join vw_QuestionnaireTypeList qtl on qtl.Id = qt.QuestionnaireTypeId
		Where qrl.OrderId = @OrderId and qrl.Version = @QuestionaireVersion


		-- Repair Orders

		--Select opl.Id
		--	  , OrderId
		--	  , opl.RepairTypeId
		--	  , PartTypeId
		--	  , opl.RowOrder
		--	  , opl.Active
		--	  , rt.DisplayName as RepairType
		--	  , pt.PartName as PartType
		--From vw_OrderPartsList opl
		--	Inner Join vw_RepairTypeList rt on rt.Id = opl.RepairTypeId
		--	Inner Join vw_PartTypeList pt on pt.Id = opl.PartTypeId
		--Where opl.OrderId = @OrderId

		Select	OrderId
			  , opl.RepairTypeId
			  , 0 PartTypeId
			  , rt.RowOrder
			  , opl.Active
			  , rt.DisplayName as RepairType
			  , '' as PartType
			  , Sum(IsNULL(pt.ServiceCharge, 0)) as ServiceCharge
		From vw_OrderPartsList opl
			Inner Join vw_RepairTypeList rt on rt.Id = opl.RepairTypeId
			Inner Join vw_PartTypeList pt on pt.Id = opl.PartTypeId
		Where opl.OrderId = @OrderId
		Group by opl.OrderId, opl.RepairTypeId, rt.RowOrder, rt.DisplayName, opl.Active
		order by OrderId

		--OrderSpecifications

		Select os.Id
			, os.OrderId
			, os.IMEINumber
			, os.RowOrder
			, os.IEMIVerified
		from vw_OrderSpecificationsList os 
		where os.OrderId = @OrderId
End
GO

ALTER PROCEDURE [dbo].[GetPersonOrders]    
	@PersonId bigint = null,
	@StatusIds varchar(100) = null,
	@FromDate datetime = null,
	@ToDate datetime = null,
	@WhereClause varchar(200) = null
AS
    BEGIN

			Declare @inPersonId bigint = @PersonId;
            Declare @inWhereClause varchar(200) = @WhereClause;
            Declare @inStatusIds varchar(100) = @StatusIds;
            Declare @inFromDate Datetime = @FromDate;
            Declare @inToDate DateTime = @ToDate;

			 Declare @Status Table
			 (
				Id bigint
			 )

			 Insert into @Status 
			 Select Item from dbo.fn_SplitIds (@inStatusIds,',')

           Select 
                     od.Id,
                     od.PersonId,
                     od.ServiceTypeId,
					 sr.DisplayName as ServiceType,
                     od.ModelVariantId,
					 mv.DisplayName as ModelVariantName,
					 ISNULL(mv.ThumbnailPath, sm.ThumbnailPath) as ThumbnailPath,
					 od.OrderCode,
					 ISNULL(mv.ProductTypeName, sm.ProductTypeName) as ProductTypeName,
					 ISNULL(mv.BrandMasterName, sm.BrandMasterName) as BrandMasterName,
					 ISNULL(mv.SeriesModelName, sm.DisplayName) as SeriesModelName,
					 od.SeriesModelId,
					 pl.FullName as UserName,
					 pl.Mobile as UserMobile,
					 apl.AppointmentDate,
					 apl.StartTime,
					 ua.City as AppointmentCity,
					 ua.Address,
					 ua.PinCode as AppointmentPincode,                    
                     od.StatusId,
					 apl.AssigneeId,
					 asg.FirstName + ' ' + asg.LastName as AssigneeName,   
					 od.StatusId,
					 od.SuggestedCost,
					 od.FinalPaid,
					 sl.DisplayName as StatusName,
					 od.CustomerExpectation,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_OrdersList od
					 Left outer Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
					 Left outer Join vw_SeriesModel sm on sm.Id = od.SeriesModelId
					 Inner Join vw_ServiceTypeList sr on sr.Id = od.ServiceTypeId				 
					 Inner Join vw_PersonList pl on pl.Id = od.PersonId
					 Inner Join vw_StatusList sl on sl.Id = od.StatusId
					 Left Outer Join vw_AppointmentList apl on apl.OrderId = od.Id
					 Left Outer join vw_PersonList asg on asg.Id = apl.AssigneeId
					 Left Outer join vw_UserAddressList ua on ua.Id = apl.UserAddresId
				Where od.PersonId = @inPersonId
					and (@inStatusIds is null or od.StatusId in (Select Id from @Status))
					and (@inFromDate is null or od.OrderDate >= @inFromDate) 
					and (@inToDate is null or od.OrderDate <= @inToDate)
					and @inWhereClause Is Null
                        Or (mv.DisplayName LIKE @inWhereClause
							or  mv.SeriesModelName Like @inWhereClause
							or sl.DisplayInList Like @inWhereClause)
				order by od.Created desc
             
End
GO

ALTER PROCEDURE [dbo].[GetOrdersByRider]    
	@PersonId bigint,	
	@FromDate datetime = null,
	@ToDate datetime = null,
	@WhereClause varchar(200) = null

AS
    BEGIN

			Declare @inPersonId bigint = @PersonId;
            Declare @inWhereClause varchar(200) = @WhereClause;           
            Declare @inFromDate Datetime = @FromDate;
            Declare @inToDate DateTime = @ToDate;

           Select 
                     od.Id,
					 apl.AssigneeId,
                     od.ServiceTypeId,
					 sr.DisplayName as ServiceType,
                     od.ModelVariantId,
					 mv.DisplayName as ModelVariantName,
					 ISNULL(mv.ThumbnailPath, sm.ThumbnailPath) as ThumbnailPath,
					 od.OrderCode,
					 ISNULL(mv.ProductTypeName, sm.ProductTypeName) as ProductTypeName,
					 ISNULL(mv.BrandMasterName, sm.BrandMasterName) as BrandMasterName,
					 ISNULL(mv.SeriesModelName, sm.DisplayName) as SeriesModelName,
					 pl.FullName as UserName,
					 pl.Mobile as UserMobile,
					 apl.AppointmentDate,
					 apl.StartTime,
					 ua.Address,
					 ua.City as AppointmentCity,
					 ua.PinCode as AppointmentPincode,                  
                     od.StatusId,
					 apl.AssigneeId,
					 asg.FirstName + ' ' + asg.LastName as AssigneeName,   
					 od.StatusId,
					 od.FinalPaid,
					 sl.DisplayName as StatusName,
					 od.CustomerExpectation,
					 od.SeriesModelId,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_OrdersList od
					 Left outer Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
					 Left outer Join vw_SeriesModel sm on sm.Id = od.SeriesModelId
					 Inner Join vw_ServiceTypeList sr on sr.Id = od.ServiceTypeId				 
					 Inner Join vw_PersonList pl on pl.Id = od.PersonId
					 Inner Join vw_StatusList sl on sl.Id = od.StatusId
					 Left Outer Join vw_AppointmentList apl on apl.OrderId = od.Id
					 Left Outer Join vw_UserAddressList ua on ua.Id = apl.UserAddresId
					 Left Outer join vw_PersonList asg on asg.Id = apl.AssigneeId
				Where apl.AssigneeId = @inPersonId					
					and (@inFromDate is null or od.OrderDate >= @inFromDate) 
					and (@inToDate is null or od.OrderDate <= @inToDate)
					and @inWhereClause Is Null
                        Or (mv.DisplayName LIKE @inWhereClause
							or  mv.SeriesModelName Like @inWhereClause
							or sl.DisplayInList Like @inWhereClause)
				order by od.Created desc
             
End
GO

ALTER PROCEDURE [dbo].[GetOrdersList]
	@WhereClause varchar(200) = null,
	@SortOrder varchar(100) = null,
	@OffsetStart int = null,
	@RowsPerPage int = null,
	@StatusId varchar(100) = null,
	@ProductTypeId bigint = null
AS
BEGIN

	Declare @inSortOrder varchar(50) = @SortOrder;
	Declare @inWhereClause varchar(50) = @WhereClause;
	Declare @inOffsetStart int = @OffsetStart;
	Declare @inRowsPerPage int = @RowsPerPage;
	Declare @SortColumn varchar(50);
	Declare @Direction varchar(4);

	Declare @Status Table
	(
		Id bigint
	)



	if @StatusId is not null
		Begin
			Insert into @Status
			Select Item from dbo.fn_SplitIds (@StatusId,',')
		End
	Else
		Begin
			Insert Into @Status
			Select Id From vw_StatusList where EntityType = 'Orders' and EnumName != 'PENDING'
		End



	Select @inOffsetStart = OffsetStart, @inRowsPerPage = RowsPerPage, @SortColumn = SortColumn, @Direction = Direction, @inWhereClause = WhereClause From
	[dbo].[fn_GetSPDefaults] (@inOffsetStart, @inRowsPerPage, @inSortOrder, @inWhereClause);



		Select
			od.Id,
			od.PersonId,
			od.ServiceTypeId,
			od.SeriesModelId,
			sr.DisplayName as ServiceType,
			od.ModelVariantId,
			mv.DisplayName as ModelVariantName,
			ISNULL(mv.ThumbnailPath, sm.ThumbnailPath) as ThumbnailPath,
			od.OrderCode,
			ISNULL(mv.ProductTypeName, sm.ProductTypeName) as ProductTypeName,
			ISNULL(mv.BrandMasterName, sm.BrandMasterName) as BrandMasterName,
			ISNULL(mv.SeriesModelName, sm.DisplayName) as SeriesModelName,
			pl.FullName as UserName,
			pl.Mobile as UserMobile,
			apl.AppointmentDate,
			apl.StartTime,
			ua.City as AppointmentCity,
			ua.PinCode as AppointmentPincode,
			od.StatusId,
			apl.AssigneeId,
			asg.FirstName + ' ' + asg.LastName as AssigneeName,
			sl.DisplayName as StatusName,
			sl.ColorCode,
			COUNT(*) OVER() as TotalRowsCount
		From vw_OrdersList od
			Left outer Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
			Left outer join vw_SeriesModel sm on sm.Id = od.SeriesModelId
			Inner Join vw_ServiceTypeList sr on sr.Id = od.ServiceTypeId
			Inner Join vw_PersonList pl on pl.Id = od.PersonId
			Inner Join vw_StatusList sl on sl.Id = od.StatusId
			Left Outer Join vw_AppointmentList apl on apl.OrderId = od.Id
			Left Outer join vw_PersonList asg on asg.Id =apl.AssigneeId
			Left Outer Join vw_UserAddressList ua on ua.Id = apl.UserAddresId
		Where (od.StatusId in (Select Id from @Status))
			and (@ProductTypeId is null or mv.ProductTypeId = @ProductTypeId or sm.ProductTypeId = @ProductTypeId)
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
		OFFSET @inOffsetStart ROWS
		FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO