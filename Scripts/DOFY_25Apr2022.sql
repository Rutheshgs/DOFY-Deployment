Update QuestionnaireTemplate set AnswerType = 'Multi_Select' where Identifier in ('31', '32', '33', '34');
GO

-- Dummy Data for PartType Service charge
Update PartType set ServiceCharge = 1000 where PartName = 'Speakers';
Update PartType set ServiceCharge = 1100 where PartName = 'Aux Port';
Update PartType set ServiceCharge = 1200 where PartName = 'Proximity Sensor';
Update PartType set ServiceCharge = 1300 where PartName = 'Battery';
Update PartType set ServiceCharge = 1400 where PartName = 'Charging Port and Charging IC';
Update PartType set ServiceCharge = 1500 where PartName = 'Touch Screen and Display panel';
Update PartType set ServiceCharge = 1600 where PartName = 'Part needs evaluation';
Update PartType set ServiceCharge = 1700 where PartName = 'Panels';
Update PartType set ServiceCharge = 1800 where PartName = 'Mic and Speaker and ICs';
GO

Alter Table QuestionnaireTemplate
Add ResponseYes varchar(200) null,
	ResponseNo varchar(200) null
GO

update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 3;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 9;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 11;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 12;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 13;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 14;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 15;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 16;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 17;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 18;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 19;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 20;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 21;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 22;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 23;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 24;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 25;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 26;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 27;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 28;
update QuestionnaireTemplate set ResponseYes = 'Working', ResponseNo = 'Not Working' where Identifier = 37;


update QuestionnaireTemplate set ResponseYes = 'Available', ResponseNo = 'Not Available' where Identifier = 31;
update QuestionnaireTemplate set ResponseYes = 'Available', ResponseNo = 'Not Available' where Identifier = 32;
update QuestionnaireTemplate set ResponseYes = 'Available', ResponseNo = 'Not Available' where Identifier = 33;
update QuestionnaireTemplate set ResponseYes = 'Available', ResponseNo = 'Not Available' where Identifier = 34;



update QuestionnaireTemplate set ResponseYes = 'Large visible spots' where Identifier = 39;
update QuestionnaireTemplate set ResponseYes = '3 or more minor spots' where Identifier = 40;
update QuestionnaireTemplate set ResponseYes = '1-2 minor spots' where Identifier = 41;
update QuestionnaireTemplate set ResponseYes = 'No spots' where Identifier = 42;


update QuestionnaireTemplate set ResponseYes = 'Faded Display' where Identifier = 44;
update QuestionnaireTemplate set ResponseYes = 'Visible line(s)' where Identifier = 45;
update QuestionnaireTemplate set ResponseYes = 'No line(s)' where Identifier = 46;

update QuestionnaireTemplate set ResponseYes = 'Screen cracked' where Identifier = 48;
update QuestionnaireTemplate set ResponseYes = 'Chipped' where Identifier = 49;
update QuestionnaireTemplate set ResponseYes = 'More than 2 scratches' where Identifier = 50;
update QuestionnaireTemplate set ResponseYes = 'More than 2 scratches' where Identifier = 51;
update QuestionnaireTemplate set ResponseYes = 'No scratches' where Identifier = 52;


update QuestionnaireTemplate set ResponseYes = 'Major dent(s)' where Identifier = 60;
update QuestionnaireTemplate set ResponseYes = '1-2 minor dents' where Identifier = 61;
update QuestionnaireTemplate set ResponseYes = 'No dents' where Identifier = 62;


update QuestionnaireTemplate set ResponseYes = 'Cracked' where Identifier = 64;
update QuestionnaireTemplate set ResponseYes = 'Missing side' where Identifier = 65;
update QuestionnaireTemplate set ResponseYes = 'Back panel' where Identifier = 66;


update QuestionnaireTemplate set ResponseYes = 'Curved panel' where Identifier = 68;
update QuestionnaireTemplate set ResponseYes = 'Loose screen' where Identifier = 69;
update QuestionnaireTemplate set ResponseYes = 'Phone not bent' where Identifier = 70;
update QuestionnaireTemplate set ResponseYes = 'Less than 30 days' where Identifier = 73;
update QuestionnaireTemplate set ResponseYes = 'Less than 90 days' where Identifier = 74;
update QuestionnaireTemplate set ResponseYes = 'Less than  180 days' where Identifier = 75;
update QuestionnaireTemplate set ResponseYes = 'Less than  270 days' where Identifier = 76;
update QuestionnaireTemplate set ResponseYes = 'Less than 330 days' where Identifier = 77;
GO


ALTER View [dbo].[vw_ModelVariant]
 as
SELECT mv.Id
	  , bm.ProductTypeId	  
	  , bs.BrandMasterId
      , sm.BrandSeriesId
      , mv.SeriesModelId
	  , pt.Name as ProductTypeName
	  , pt.EnumName as ProductTypeEnumName
	  , bm.Name as BrandMasterName
	  , bm.EnumName as BrandMasterEnumName
	  , bs.Name as BrandSeriesName
	  , bs.EnumName as BrandSeriesEnumName
	  , sm.Name as SeriesModelName
	  , sm.EnumName as SeriesModelEnumName
      , mv.Name
      , mv.DisplayName
      , mv.EnumName
      , mv.DateOfIntroduction
      , mv.DisplayInList
	  , mv.DisplayForRepair
	  , mv.DisplayForSale
	  , mv.ThumbnailPath
	  , mv.MinimumValue
	  , mv.MaximumValue
	  , mv.Category
	  , mv.Specification
      , mv.RowOrder
      , mv.Active
      , mv.Created
      , mv.CreatedBy
      , mv.Modified
      , mv.ModifiedBy
  FROM ModelVariant mv
	Inner Join SeriesModel sm on sm.Id = mv.SeriesmodelId
	Inner Join BrandSeries bs on bs.Id = sm.BrandSeriesId
	Inner Join BrandMaster bm on bm.Id = bs.BrandMasterId
	Inner Join ProductType pt on pt.Id = bm.ProductTypeId;
GO

IF OBJECT_ID('GetModelVariants', 'P') IS NOT NULL
    DROP PROCEDURE GetModelVariants
GO

Create PROCEDURE [dbo].[GetModelVariants]
   @SeriesModelId bigint = null
AS
    BEGIN
                Select 
                     Id,
                     SeriesModelId,
					 SeriesModelName,
                     Name,                    
                     ThumbnailPath,
                     MinimumValue,
                     MaximumValue,                    
                     RowOrder,
					 Active
                 From vw_ModelVariant
				 Where SeriesModelId = @SeriesModelId
				 Order by SeriesModelId, RowOrder
End
GO

ALTER View [dbo].[vw_SeriesModel]
as
SELECT sm.Id
	  , bm.ProductTypeId	  
	  , bs.BrandMasterId
      , sm.BrandSeriesId
	  , pt.Name as ProductTypeName
	  , pt.EnumName as ProductTypeEnumName
	  , bm.Name as BrandMasterName
	  , bm.EnumName as BrandMasterEnumName
	  , bs.Name as BrandSeriesName
	  , bs.EnumName as BrandSeriesEnumName
      , sm.Name
      , sm.DisplayName
      , sm.EnumName
      , sm.DateOfIntroduction
      , sm.DisplayInList
	  , sm.ThumbnailPath
	  , sm.Specification
      , sm.RowOrder
      , sm.Active
      , sm.Created
      , sm.CreatedBy
      , sm.Modified
      , sm.ModifiedBy
  FROM SeriesModel sm 
	Inner Join BrandSeries bs on bs.Id = sm.BrandSeriesId
	Inner Join BrandMaster bm on bm.Id = bs.BrandMasterId
	Inner Join ProductType pt on pt.Id = bm.ProductTypeId;

GO

IF OBJECT_ID('GetSeriesModelByBrandMasterId', 'P') IS NOT NULL
    DROP PROCEDURE GetSeriesModelByBrandMasterId
GO

CREATE PROCEDURE [dbo].[GetSeriesModelByBrandMasterId]
 @BrandMasterId bigint = null
AS
    BEGIN
                Select 
                     Id,
					 BrandMasterId,
                     BrandSeriesId,
                     Name,
                     DisplayName,
                     EnumName,
                     DateOfIntroduction,
                     DisplayInList,
                     ThumbnailPath,
					 Active,
					 RowOrder
                 From vw_SeriesModel
                Where (BrandMasterId is null or BrandMasterId = @BrandMasterId)
               
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
			mv.ThumbnailPath,
			od.OrderCode,
			mv.ProductTypeName,
			mv.BrandMasterName,
			IsNull(mv.SeriesModelName, sm.DisplayName) as SeriesModelName,
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
		OFFSET @inOffsetStart ROWS
		FETCH NEXT @inRowsPerPage ROWS ONLY
End
GO

IF OBJECT_ID('GetQuestionnaireBasedModelVariantId', 'P') IS NOT NULL
    DROP PROCEDURE GetQuestionnaireBasedModelVariantId
GO

CREATE PROCEDURE GetQuestionnaireBasedModelVariantId 
	-- Add the parameters for the stored procedure here
	@ModelVariantId int
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	declare @Count  int

	set @Count=0;

	select @Count = Count(*) from QuestionnaireTemplate where ModelVariantId = @ModelVariantId

IF  @Count > 0  
	BEGIN
		SELECT Id,
				ProductTypeId,
				QuestionnaireTypeId,
				OSTypeId,
				ModelVariantId,
				Identifier,
				ParentId,
				ThresholdLevel,
				[Name],
				DisplayName,
				EnumName,
				SubHeading,
				[Type],
				AnswerType,
				Threshold,
				RowOrder,
				DisplayInList,
				ThumbnailPath,
				[Enabled],
				Active
		FROM vw_QuestionnaireTemplates 
		WHERE ModelVariantId = @ModelVariantId;
	END
ELSE
	BEGIN
		SELECT 0 as Id,
				ProductTypeId,
				QuestionnaireTypeId,
				OSTypeId,
				@ModelVariantId as ModelVariantId,
				Identifier,
				ParentId,
				ThresholdLevel,
				[Name],
				DisplayName,
				EnumName,
				SubHeading,
				[Type],
				AnswerType,
				Threshold,
				RowOrder,
				DisplayInList,
				ThumbnailPath,
				[Enabled],
				Active
		FROM vw_QuestionnaireTemplates 
		WHERE ModelVariantId is null ;
	END
END
GO

ALTER PROCEDURE [dbo].[GetRepairTypeList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null,
	@SeriesModelColorId bigint = null
AS
    BEGIN

                Declare @inSortOrder varchar(50) = @SortOrder;
                Declare @inWhereClause varchar(50) = @WhereClause;
                Declare @inOffsetStart int = @OffsetStart;
                Declare @inRowsPerPage int = @RowsPerPage;
                Declare @SortColumn varchar(50);
                Declare @Direction varchar(4);

				Declare @RepairAmount Table
				(
					RepairTypeId bigint,
					Amount decimal(16, 2)
				)

				Insert into @RepairAmount
				Select RepairTypeId,
						Sum(ISNULL(ServiceCharge, 0))
				From vw_PartTypeList pt
				Inner Join vw_RepairTypeList rt on rt.Id = pt.RepairTypeId				
				Where pt.SeriesModelColorId = @SeriesModelColorId
				Group by pt.SeriesModelColorId, RepairTypeId

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
					 ThumbnailPath,
					 ra.Amount as AllocatedPrice,
					 0 as OfferPrice,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_RepairTypeList rt
				 Left outer join @RepairAmount ra on ra.RepairTypeId = rt.Id
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

ALTER View [dbo].[vw_SeriesModelColors]
as
SELECT sm.Id
	  , bm.ProductTypeId	  
	  , bs.BrandMasterId
      , s.BrandSeriesId
	  , s.Id as SeriesModelId
	  , pt.Name as ProductTypeName
	  , pt.EnumName as ProductTypeEnumName
	  , bm.Name as BrandMasterName
	  , bm.EnumName as BrandMasterEnumName
	  , bs.Name as BrandSeriesName
	  , bs.EnumName as BrandSeriesEnumName
	  , s.Name as SeriesModelName
	  , s.EnumName as SeriesModelEnumName
      , sm.Name
      , sm.DisplayName
      , sm.EnumName
      , sm.DisplayInList
	  , sm.ThumbnailPath
      , sm.RowOrder
      , sm.Active
      , sm.Created
      , sm.CreatedBy
      , sm.Modified
      , sm.ModifiedBy
  FROM SeriesModelColors sm
	Inner Join SeriesModel s on s.Id = sm.SeriesModelId
	Inner Join BrandSeries bs on bs.Id = s.BrandSeriesId
	Inner Join BrandMaster bm on bm.Id = bs.BrandMasterId
	Inner Join ProductType pt on pt.Id = bm.ProductTypeId;

GO


ALTER PROCEDURE [dbo].[GetSeriesModelColorsList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null,
	@SeriesModelId bigint = null
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
						Id
					  , ProductTypeId	  
					  , BrandMasterId
					  , BrandSeriesId
					  , SeriesModelId
					  , SeriesModelEnumName
					  , SeriesModelName
					  , Name
					  , DisplayName
					  , EnumName
					  , DisplayInList
					  , ThumbnailPath
					  , RowOrder
					  , Active
					  , Created
					  , CreatedBy
					  , Modified
					  , ModifiedBy
                      , COUNT(*) OVER() as TotalRowsCount
                 From vw_SeriesModelColors 
                Where (@SeriesModelId is null or SeriesModelId = @SeriesModelId) and
					(@inWhereClause Is Null
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


ALTER PROCEDURE [dbo].[GetQuote]
    @OrderId bigint
AS
    BEGIN

		Declare @productMinimumValue Float;
		Declare @productMaximumValue Float;
		Declare @FinalValue Float;
		Declare @RequoteStatusId bigint;
		Declare @OrderStatusId bigint;

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

		Select Top 1 @RequoteStatusId = Id From vw_StatusList s where s.EnumName = 'ReQuote' and EntityType = 'Orders';

		Select @productMinimumValue = IsNull(mv.MinimumValue, 0), 
				@productMaximumValue = IsNull(mv.MaximumValue, 0),
				@OrderStatusId = o.StatusId
		From  Orders (nolock) o 
			Inner Join ModelVariant (nolock) mv on mv.Id = o.ModelVariantId
		Where o.Id = @OrderId;

		Insert Into @QuoteThreshold
		Select qtp.QuestionnaireTypeId, qtp.RowOrder, @productMinimumValue, @productMaximumValue, Sum(IsNull(qr.Threshold, 0)), Max(IsNull(qtp.Threshold, 0)), 0, 0
		FROM QuestionnaireResponses (nolock) qr
			Inner Join vw_QuestionnaireTemplates (nolock) qt on qt.Id = qr.QuestionnaireTemplateId		
			Inner Join vw_QuestionnaireTemplates (nolock) qtp on 
				qtp.ProductTypeId = qt.ProductTypeId
				and qt.QuestionnaireTypeId = qtp.QuestionnaireTypeId 
				-- and qtp.Identifier = qt.ParentId	
				and IsNull(qtp.ThresholdLevel, 0) = 1
		Where qr.OrderId = @orderId
			And IsNull(qr.Selected, 0) = 1
		Group by qtp.QuestionnaireTypeId, qtp.RowOrder
		Order by qtp.QuestionnaireTypeId, qtp.RowOrder;
		
		Update @QuoteThreshold 
			Set ProductDiminishedValue = Case When IsNull(MaximumThreshold, 0) < IsNull(SelectedThreshold, 0) Then (IsNull(ProductMaximumValue, 0) * IsNull(MaximumThreshold, 0))/100
								Else (IsNull(ProductMaximumValue, 0) * IsNull(SelectedThreshold, 0))/100 End;

		Update @QuoteThreshold Set FinalValue = IsNull(ProductMaximumValue, 0) - (Select Sum(IsNull(ProductDiminishedValue, 0)) From @QuoteThreshold);

		Set @FinalValue = (Select Top 1 FinalValue from @QuoteThreshold Order By RowOrder DESC);

		If @FinalValue < @productMinimumValue 
			Begin
				Set @FinalValue = @productMinimumValue;
			End;

		If @OrderStatusId = @RequoteStatusId
			Begin
				Update Orders set RequoteAmount = IsNull(@FinalValue, 0) where Id = @OrderId;
			End
		Else
			Begin
				Update Orders set SuggestedCost = IsNull(@FinalValue, 0) where Id = @OrderId;
			End;

		Select @FinalValue as FinalValue;

End
GO

ALTER View [dbo].[vw_QuestionnaireTemplateList]

AS
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
		  ResponseYes,
		  ResponseNo
        From QUESTIONNAIRETEMPLATE (NoLock) 
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
			  , qtl.DisplayName as QuestionaireType
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