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


ALTER FUNCTION [dbo].[fn_GetSPDefaults] 
(
	@OffsetStart int, @RowsPerPage int, @SortOrder varchar(50), @WhereClause varchar(250)
)
RETURNS @SPDefaults TABLE 
(	
	OffsetStart int,
    RowsPerPage int,
	SortColumn varchar(100), 
	Direction varchar(4), 
	WhereClause varchar(250)	
)
AS
BEGIN

    Declare @SortColumn varchar(100), @Direction varchar(4)

    Set @SortColumn = Upper(IsNull(dbo.[fn_GetSortColumn](@SortOrder, 'columnname'), 'modified'));
    Set @Direction = Upper(IsNull(dbo.[fn_GetSortColumn](@SortOrder, 'direction'), 'asc'));    

	If @RowsPerPage = -1 or @RowsPerPage is null
		Set @RowsPerPage = 50000;

	Set @OffsetStart = IsNull(@OffsetStart, 0);
    Set @RowsPerPage = IsNull(@RowsPerPage, 10);

    If IsNull(@WhereClause,'') != ''
    Begin
	   Set @WhereClause = '%' + @WhereClause + '%';
    End
    Else
    Set @WhereClause = Null;

    Insert @SPDefaults
    Select @OffsetStart , @RowsPerPage, @SortColumn, @Direction, @WhereClause

    RETURN 
END
GO

ALTER PROCEDURE [dbo].[GetBrandMasterList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     ProductTypeId,
                     Name,
                     DisplayName,
                     EnumName,
                     DateOfIntroduction,
                     DisplayInList,
                     ThumbnailPath,
                     OperatingSystem,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_BrandMasterList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR ThumbnailPath LIKE @inWhereClause
                             OR OperatingSystem LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'DATEOFINTRODUCTION' THEN CONVERT(CHAR(19), DateOfIntroduction, 120)
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'OPERATINGSYSTEM' THEN OperatingSystem
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'DATEOFINTRODUCTION' THEN CONVERT(CHAR(19), DateOfIntroduction, 120)
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'OPERATINGSYSTEM' THEN OperatingSystem
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO



ALTER PROCEDURE [dbo].[GetBrandSeriesList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     BrandMasterId,
                     Name,
                     DisplayName,
                     EnumName,
                     DateOfIntroduction,
                     DisplayInList,
                     ThumbnailPath,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_BrandSeriesList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR ThumbnailPath LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'DATEOFINTRODUCTION' THEN CONVERT(CHAR(19), DateOfIntroduction, 120)
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'DATEOFINTRODUCTION' THEN CONVERT(CHAR(19), DateOfIntroduction, 120)
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO



ALTER PROCEDURE [dbo].[GetCancellationTypeList]
     @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     RowOrder,
                     DisplayInList,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_CancellationTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO




ALTER PROCEDURE [dbo].[GetAddressTypeList]
   @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     Year,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_AddressTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR Year LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'YEAR' THEN Year
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'YEAR' THEN Year
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO



ALTER PROCEDURE [dbo].[GetDocumentTypeList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     RowOrder,
                     DisplayInList,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_DocumentTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO



ALTER PROCEDURE [dbo].[GetAppointmentSlotsList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     StartTime,
                     EndTime,
                     EventDate,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_AppointmentSlotsList
                Where (@inWhereClause Is Null                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'STARTTIME' THEN CONVERT(CHAR(19), StartTime, 120)
                        WHEN 'ENDTIME' THEN CONVERT(CHAR(19), EndTime, 120)
                        WHEN 'EVENTDATE' THEN CONVERT(CHAR(19), EventDate, 120)
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'STARTTIME' THEN CONVERT(CHAR(19), StartTime, 120)
                        WHEN 'ENDTIME' THEN CONVERT(CHAR(19), EndTime, 120)
                        WHEN 'EVENTDATE' THEN CONVERT(CHAR(19), EventDate, 120)
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetEmailTemplatesList]
     @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     TemplateName,
                     DisplayName,
                     Template,
                     EmailGroupId,
                     EmailSubject,
                     EmailCC,
                     EmailBCC,
                     SenderEmail,
                     AdditionalInformation,
                     AttachementRequired,
                     IncludeLoginInfo,
                     VerCol,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_EmailTemplatesList
                Where (@inWhereClause Is Null
                        Or (TemplateName LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR Template LIKE @inWhereClause
                             OR EmailSubject LIKE @inWhereClause
                             OR EmailCC LIKE @inWhereClause
                             OR EmailBCC LIKE @inWhereClause
                             OR SenderEmail LIKE @inWhereClause
                             OR AdditionalInformation LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'TEMPLATENAME' THEN TemplateName
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'TEMPLATE' THEN Template
                        WHEN 'EMAILSUBJECT' THEN EmailSubject
                        WHEN 'EMAILCC' THEN EmailCC
                        WHEN 'EMAILBCC' THEN EmailBCC
                        WHEN 'SENDEREMAIL' THEN SenderEmail
                        WHEN 'ADDITIONALINFORMATION' THEN AdditionalInformation
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'TEMPLATENAME' THEN TemplateName
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'TEMPLATE' THEN Template
                        WHEN 'EMAILSUBJECT' THEN EmailSubject
                        WHEN 'EMAILCC' THEN EmailCC
                        WHEN 'EMAILBCC' THEN EmailBCC
                        WHEN 'SENDEREMAIL' THEN SenderEmail
                        WHEN 'ADDITIONALINFORMATION' THEN AdditionalInformation
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetModelVariantList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     SeriesModelId,
                     Name,
                     DisplayName,
                     EnumName,
                     DateOfIntroduction,
                     DisplayInList,
                     ThumbnailPath,
                     MinimumValue,
                     MaximumValue,
                     Category,
                     DisplayForSale,
                     DisplayForRepair,
                     Specification,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_ModelVariantList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR ThumbnailPath LIKE @inWhereClause
                             OR Category LIKE @inWhereClause
                             OR Specification LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'DATEOFINTRODUCTION' THEN CONVERT(CHAR(19), DateOfIntroduction, 120)
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CATEGORY' THEN Category
                        WHEN 'SPECIFICATION' THEN Specification
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'DATEOFINTRODUCTION' THEN CONVERT(CHAR(19), DateOfIntroduction, 120)
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CATEGORY' THEN Category
                        WHEN 'SPECIFICATION' THEN Specification
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO



ALTER PROCEDURE [dbo].[GetOSTypeList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_OSTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetPartTypeList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     ProductTypeId,
                     RepairTypeId,
                     ModelVariantId,
                     Name,
                     DisplayName,
                     EnumName,
                     PartValue,
                     ServiceValue,
                     RowOrder,
                     DisplayInList,
                     Enabled,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_PartTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetPaymentDetailsList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     OrderId,
                     PersonId,
                     PaymentTypeId,
                     StatusId,
                     Notes,
                     DebitAmount,
                     PaymentReferenceNumber,
                     PaymentGatewayStatus,
                     PaymentDateTime,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_PaymentDetailsList
                Where (@inWhereClause Is Null
                        Or (PaymentGatewayStatus LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'PAYMENTGATEWAYSTATUS' THEN PaymentGatewayStatus
                        WHEN 'PAYMENTDATETIME' THEN CONVERT(CHAR(19), PaymentDateTime, 120)
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'PAYMENTGATEWAYSTATUS' THEN PaymentGatewayStatus
                        WHEN 'PAYMENTDATETIME' THEN CONVERT(CHAR(19), PaymentDateTime, 120)
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetProductTypeList]
     @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     Year,
                     DisplayInList,
                     Enabled,
                     ThumbnailPath,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_ProductTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR Year LIKE @inWhereClause
                             OR ThumbnailPath LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'YEAR' THEN Year
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'YEAR' THEN Year
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetQuestionnaireTemplateList]
   @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     ProductTypeId,
                     QuestionnaireTypeId,
                     OSTypeId,
                     ModelVariantId,
                     Identifier,
                     ParentId,
                     ThresholdLevel,
                     Name,
                     DisplayName,
                     EnumName,
                     SubHeading,
                     Type,
                     AnswerType,
                     Threshold,
                     RowOrder,
                     DisplayInList,
                     ThumbnailPath,
                     Enabled,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_QuestionnaireTemplateList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR SubHeading LIKE @inWhereClause
                             OR Type LIKE @inWhereClause
                             OR AnswerType LIKE @inWhereClause
                             OR ThumbnailPath LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'SUBHEADING' THEN SubHeading
                        WHEN 'TYPE' THEN Type
                        WHEN 'ANSWERTYPE' THEN AnswerType
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'SUBHEADING' THEN SubHeading
                        WHEN 'TYPE' THEN Type
                        WHEN 'ANSWERTYPE' THEN AnswerType
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetQuestionnaireTypeList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_QuestionnaireTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO



ALTER PROCEDURE [dbo].[GetQuestionnaireTypeList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_QuestionnaireTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetRecomendationItemsList]
     @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     RowOrder,
                     DisplayInList,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_RecomendationItemsList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetRepairTypeList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     RowOrder,
                     DisplayInList,
                     Enabled,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_RepairTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetSeriesModelList]
     @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     BrandSeriesId,
                     Name,
                     DisplayName,
                     EnumName,
                     DateOfIntroduction,
                     DisplayInList,
                     ThumbnailPath,
                     Specification,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_SeriesModelList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR ThumbnailPath LIKE @inWhereClause
                             OR Specification LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'DATEOFINTRODUCTION' THEN CONVERT(CHAR(19), DateOfIntroduction, 120)
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'SPECIFICATION' THEN Specification
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'DATEOFINTRODUCTION' THEN CONVERT(CHAR(19), DateOfIntroduction, 120)
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'SPECIFICATION' THEN Specification
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetServiceTypeList]
     @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     Name,
                     DisplayName,
                     EnumName,
                     Code,
                     ThumbnailPath,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_ServiceTypeList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR Code LIKE @inWhereClause
                             OR ThumbnailPath LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CODE' THEN Code
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CODE' THEN Code
                        WHEN 'THUMBNAILPATH' THEN ThumbnailPath
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetStatusList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     EntityType,
                     Name,
                     Description,
                     DisplayName,
                     EnumName,
                     TemplateText,
                     DisplayInList,
                     ExternalStatus,
                     Active,
                     RowOrder,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_StatusList
                Where (@inWhereClause Is Null
                        Or (EntityType LIKE @inWhereClause
                             OR Name LIKE @inWhereClause
                             OR Description LIKE @inWhereClause
                             OR DisplayName LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR TemplateText LIKE @inWhereClause
                             OR ExternalStatus LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'ENTITYTYPE' THEN EntityType
                        WHEN 'NAME' THEN Name
                        WHEN 'DESCRIPTION' THEN Description
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'TEMPLATETEXT' THEN TemplateText
                        WHEN 'EXTERNALSTATUS' THEN ExternalStatus
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'ENTITYTYPE' THEN EntityType
                        WHEN 'NAME' THEN Name
                        WHEN 'DESCRIPTION' THEN Description
                        WHEN 'DISPLAYNAME' THEN DisplayName
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'TEMPLATETEXT' THEN TemplateText
                        WHEN 'EXTERNALSTATUS' THEN ExternalStatus
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO


ALTER PROCEDURE [dbo].[GetUserRolesList]
     @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null
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
                     Id,
                     UserId,
                     RoleId,
                     RowOrder,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_UserRolesList
                Where (@inWhereClause Is Null                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO




Update Status set Active = 1;
GO

Create FUNCTION [dbo].[fn_SplitIds]
(
	@sInputList VARCHAR(max),
	@sDelimiter VARCHAR(10) = ','
)
RETURNS @List TABLE 
(
	id int, 
	item VARCHAR(max)
)
BEGIN

    DECLARE @sItem VARCHAR(max)
		DEclare @currentId int;
		Set @currentId = 0;
    WHILE CHARINDEX(@sDelimiter, @sInputList, 0) <> 0
    BEGIN

				Set @currentId = @currentId + 1;

        SELECT @sItem = RTRIM(LTRIM(SUBSTRING(@sInputList, 1, CHARINDEX(@sDelimiter, @sInputList,0) - 1))),
               @sInputList = RTRIM(LTRIM(SUBSTRING(@sInputList, CHARINDEX(@sDelimiter, @sInputList, 0) + LEN(@sDelimiter),LEN(@sInputList))))

        -- Indexes to keep the position of searching
        IF LEN(@sItem) > 0

        INSERT INTO @List SELECT @currentId, @sItem

    END

    IF LEN(@sInputList) > 0
    BEGIN

        INSERT INTO @List SELECT @currentId + 1, @sInputList -- Put the last item in

    END

    RETURN

END
GO

ALTER PROCEDURE [dbo].[GetPersonOrders]    
	@PersonId bigint,
	@StatusIds varchar(100),
	@FromDate datetime = null,
	@ToDate datetime = null,
	@WhereClause varchar(200)
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
					 Left Outer join vw_PersonList asg on asg.Id = apl.AssigneeId
				Where od.PersonId = @inPersonId
					and (@inStatusIds is null or od.StatusId in (Select Id from @Status))
					and (@inFromDate is null or od.Created >= @inFromDate) -- Todo add order date in order table for filter
					and (@inToDate is null or od.Created <= @inToDate)	-- Todo add order date in Order table for filter
					and @inWhereClause Is Null
                        Or (mv.DisplayName LIKE @inWhereClause
							or  mv.SeriesModelName Like @inWhereClause
							or sl.DisplayInList Like @inWhereClause)
				order by od.Created desc
             
End
GO




Alter PROCEDURE [dbo].[GetPersonAddress]    
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

Drop Procedure GetQuotedAmountForOrder;
GO

ALTER PROCEDURE [dbo].[GetQuote]
    @OrderId bigint,
	@Responses varchar(max) null
AS
    BEGIN

		Declare @productMinimumValue Float;
		Declare @productMaximumValue Float;
		Declare @FinalValue Float;

		Declare @QuoteThreshold Table
		(
			QuestionnaireTypeId Float,
			RowOrder int,
			ProductMinimumValue Float,
			ProductMaximumValue Float,
			SelectedThreshold Float,
			MaximumThreshold Float,
			ProductDiminishedValue Float,
			FinalValue Float
		)

		Select @productMinimumValue = mv.MinimumValue, 
				@productMaximumValue = mv.MaximumValue
		From  Orders (nolock) o 
			Inner Join ModelVariant (nolock) mv on mv.Id = o.ModelVariantId
		Where o.Id = @OrderId;

		Insert Into @QuoteThreshold
		Select qtp.QuestionnaireTypeId, qtp.RowOrder, @productMinimumValue, @productMaximumValue, Sum(qr.Threshold), Max(qtp.Threshold), 0, 0
		FROM QuestionnaireResponses (nolock) qr
			Inner Join vw_QuestionnaireTemplates (nolock) qt on qt.Id = qr.QuestionnaireTemplateId		
			Inner Join vw_QuestionnaireTemplates (nolock) qtp on 
				qtp.ProductTypeId = qt.ProductTypeId
				and qt.QuestionnaireTypeId = qtp.QuestionnaireTypeId 
				-- and qtp.Identifier = qt.ParentId	
				and qtp.ThresholdLevel = 1
		Where qr.OrderId = @orderId
			And qr.Selected = 1
		Group by qtp.QuestionnaireTypeId, qtp.RowOrder
		Order by qtp.QuestionnaireTypeId, qtp.RowOrder;
		
		Update @QuoteThreshold 
			Set ProductDiminishedValue = Case When MaximumThreshold < SelectedThreshold Then (ProductMaximumValue * MaximumThreshold)/100
								Else (ProductMaximumValue * SelectedThreshold)/100 End;

		Update @QuoteThreshold Set FinalValue = ProductMaximumValue - (Select Sum(ProductDiminishedValue) From @QuoteThreshold);

		Set @FinalValue = (Select Top 1 FinalValue from @QuoteThreshold Order By RowOrder DESC);

		Update Orders set SuggestedCost = @FinalValue where Id = @OrderId;

		Select @FinalValue;

End
GO







