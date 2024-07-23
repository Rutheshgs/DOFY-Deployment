Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_3spots.png' where Identifier = 40;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_visiblelines.png' where Identifier = 45;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_2morescratches.png' where Identifier = 50;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_1scratches.png' where Identifier = 51;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_Noscratche.png' where Identifier = 52;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_2morescratches_body.png' where Identifier = 56;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_1scratches_body.png' where Identifier = 57;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_Noscratche_body.png' where Identifier = 58;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_Major_dent.png' where Identifier = 60;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_1_2_dents.png' where Identifier = 61;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_No_dents.png' where Identifier = 62;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_side_panel_broken.png' where Identifier = 64;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_Missing_panel.png' where Identifier = 65;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_No_defect_panel.png' where Identifier = 66;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_Bent_panel.png' where Identifier = 68;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_loose_screen.png' where Identifier = 69;
Update QuestionnaireTemplate set ThumbnailPath = 'questionnaire_Phone_not_bent.png' where Identifier = 70;
GO

Update QuestionnaireTemplate set ParentId = 72 where ParentId = 8;
GO

Insert into QuestionnaireTemplate (ProductTypeId, QuestionnaireTypeId, OSTypeId, Identifier, ParentId, ThresholdLevel, Name, DisplayName, Type, AnswerType, Threshold, RowOrder, DisplayInList, Enabled, Active)
Values(2, 49, 2, 72, 8, 2, 'Select the purchase date range', 'Select the purchase date range', 'Questions', 'None', 0, 7200, 1, 1,1);
GO

Insert into QuestionnaireTemplate (ProductTypeId, QuestionnaireTypeId, OSTypeId, Identifier, ParentId, ThresholdLevel, Name, DisplayName, Type, AnswerType, Threshold, RowOrder, DisplayInList, Enabled, Active)
Values(2, 49, 3, 72, 8, 2, 'Select the purchase date range', 'Select the purchase date range', 'Questions', 'None', 0, 7200, 1, 1,1);
GO

Alter Table SeriesModelColors
Add ColorCode varchar(20) null,
	ThumbnailPath varchar(200) null
GO


Update UserRoles set Active = 1;
GO

-- --Update thumbnail path for modelvarient
UPDATE ModelVariant SET ThumbnailPath = sm.ThumbnailPath
from ModelVariant mv
Left outer Join SeriesModel sm on sm.Id =mv.SeriesModelId
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
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_OrdersList od
					 Inner Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
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

ALTER PROCEDURE [dbo].[GetOrderSummary]
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
					 od.SuggestedCost,
					 od.FinalPaid,
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
			  , pt.PartName as PartType
		From vw_OrderPartsList opl
			Inner Join vw_RepairTypeList rt on rt.Id = opl.RepairTypeId
			Inner Join vw_PartTypeList pt on pt.Id = opl.PartTypeId
		Where opl.OrderId = @OrderId


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
					 mv.ThumbnailPath,
					 od.OrderCode,
					 mv.ProductTypeName,
					 mv.BrandMasterName,
					 mv.SeriesModelName,
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
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_OrdersList od
					 Inner Join vw_ModelVariant mv on mv.Id = od.ModelVariantId
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

ALTER PROCEDURE [dbo].[GetPersonList]
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
                     pl.Id,
                     LoginId,
                     UserRoleId,
                     FirstName,
                     MiddleName,
                     LastName,
                     Email,
                     Prefix,
                     Suffix,
                     Mobile,
                     SecondaryMobile,
                     DateOfBirth,
                     UploadImagePath,
                     UploadImageName,
					 rl.Name as UserRoleName,
                     pl.RowOrder,
                     pl.Active,
                     pl.Created,
                     pl.CreatedBy,
                     pl.Modified,
                     pl.ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_PersonList pl
					Left outer join vw_UserRolesList ur on ur.Id = pl.UserRoleId
					Left Outer Join vw_RolesList rl on rl.Id = ur.RoleId
                Where (@inWhereClause Is Null
                        Or (FirstName LIKE @inWhereClause
                             OR MiddleName LIKE @inWhereClause
                             OR LastName LIKE @inWhereClause
                             OR Email LIKE @inWhereClause
                             OR Prefix LIKE @inWhereClause
                             OR Suffix LIKE @inWhereClause
                             OR Mobile LIKE @inWhereClause
                             OR SecondaryMobile LIKE @inWhereClause
                             OR UploadImagePath LIKE @inWhereClause
                             OR UploadImageName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'FIRSTNAME' THEN FirstName
                        WHEN 'MIDDLENAME' THEN MiddleName
                        WHEN 'LASTNAME' THEN LastName
                        WHEN 'EMAIL' THEN Email
                        WHEN 'PREFIX' THEN Prefix
                        WHEN 'SUFFIX' THEN Suffix
                        WHEN 'MOBILE' THEN Mobile
                        WHEN 'SECONDARYMOBILE' THEN SecondaryMobile
                        WHEN 'DATEOFBIRTH' THEN CONVERT(CHAR(19), DateOfBirth, 120)
                        WHEN 'UPLOADIMAGEPATH' THEN UploadImagePath
                        WHEN 'UPLOADIMAGENAME' THEN UploadImageName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), pl.Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), pl.Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'FIRSTNAME' THEN FirstName
                        WHEN 'MIDDLENAME' THEN MiddleName
                        WHEN 'LASTNAME' THEN LastName
                        WHEN 'EMAIL' THEN Email
                        WHEN 'PREFIX' THEN Prefix
                        WHEN 'SUFFIX' THEN Suffix
                        WHEN 'MOBILE' THEN Mobile
                        WHEN 'SECONDARYMOBILE' THEN SecondaryMobile
                        WHEN 'DATEOFBIRTH' THEN CONVERT(CHAR(19), DateOfBirth, 120)
                        WHEN 'UPLOADIMAGEPATH' THEN UploadImagePath
                        WHEN 'UPLOADIMAGENAME' THEN UploadImageName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), pl.Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), pl.Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO