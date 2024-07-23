Alter Table Orders
Drop column SeriesModleId;
GO

Alter Table Orders
Add SeriesModelId bigint null;
GO

Alter table RepairType
Add ThumbnailPath varchar(200) null;
GO

CREATE PROCEDURE [dbo].[GetAssigneeList]
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
				Declare @RiderRoleId int = (Select Top 1 Id From Roles where EnumName = 'Rider');

                Select @inOffsetStart = OffsetStart, @inRowsPerPage = RowsPerPage, @SortColumn = SortColumn, @Direction = Direction, @inWhereClause = WhereClause From 
                                    [dbo].[fn_GetSPDefaults] (@inOffsetStart, @inRowsPerPage, @inSortOrder, @inWhereClause);

                Select 
                     Id,
                     LoginId,
                     UserRoleId,
                     FirstName,
                     MiddleName,
                     LastName,
					 FullName,
                     Email,
                     Prefix,
                     Suffix,
                     Mobile,
                     SecondaryMobile,
                     DateOfBirth,
                     UploadImagePath,
                     UploadImageName,                     
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_PersonList
                Where UserRoleId in (Select Id from UserRoles where RoleId = @RiderRoleId and Active = 1) and
					(@inWhereClause Is Null
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
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
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
    @RowsPerPage int = null,
	@SeriesId bigint = null
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

ALTER View [dbo].[vw_UserAddressList]

AS
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
          ua.Created,
          ua.CreatedBy,
          ua.Modified,
          ua.ModifiedBy,
		  gl.Name as City,
		  gls.Name as StateName
        From USERADDRESS ua(NoLock) 
		Left Join vw_DofyGeoList gl on gl.Id = ua.CityId
		Left Outer Join vw_DofyGeoList gls on gls.Id = ua.StateId
        Where ua.Active = 1 

GO


Create PROCEDURE [dbo].[GetOrdersByRider]    
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

ALTER View [dbo].[vw_RepairTypeList]

AS
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
		  ThumbnailPath
        From REPAIRTYPE (NoLock) 
        Where Active = 1 

GO

ALTER PROCEDURE [dbo].[GetRepairTypeList]
    @WhereClause varchar(200) = null,
    @SortOrder varchar(100) = null,
    @OffsetStart int = null,
    @RowsPerPage int = null,
	@SeriesId bigint = null
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
					 ThumbnailPath,
					 1000 as AllocatedPrice,
					 800 as OfferPrice,
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

CREATE TABLE [dbo].[SentEmail]
(	Id BIGINT PRIMARY KEY IDENTITY (1, 1) NOT NULL,
	PendingEmailId BIGINT NOT NULL,
	EmailTemplateId BIGINT NOT NULL,
	EmailSubject NVARCHAR(1000) NOT NULL,
	EmailBody VARCHAR(5000) NOT NULL,
	ToAddress VARCHAR(240) NOT NULL,
	FromAddress VARCHAR(128) NOT NULL,
	Attachment VARCHAR(640) NULL,
	Created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
GO

ALTER TABLE [dbo].[PendingEmail] ADD RetryCount INT NOT NULL DEFAULT 0;
GO

Alter Table PendingEmail 
Drop Column DatabaseName, DatabaseId
GO

--View for PendingEmail
ALTER VIEW [dbo].[vw_PendingEmail] 
AS
SELECT 
          pe.Id,
          pe.Parms,
          pe.EmailTo,
          et.EmailCC,
          et.EmailBCC,
          et.SenderEmail as EmailFrom,
          et.Id as TemplateId,
          et.EmailSubject,
          et.Template,
          et.AdditionalInformation,
          pe.Attachment,         
		  pe.RetryCount
    from [PendingEmail] pe
        LEFT OUTER JOIN [EmailTemplates] et ON et.EmailGroupId = pe.EmailTemplateGroupId
    WHERE et.Active = 1 and pe.IsProcessed = 0 and pe.Active = 1;

GO

CREATE TABLE [dbo].[OrderWishList](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[PersonId] [bigint] NOT NULL,
	[ModelVariantId] [bigint] NOT NULL,
	[ServiceTypeId] [bigint]  NULL,
	[RowOrder] [bigint] NULL,
	[Active] [bit] NULL,
	[Created] [datetime] NULL,
	[CreatedBy] [bigint] NULL,
	[Modified] [datetime] NULL,
	[ModifiedBy] [bigint] NULL,
 CONSTRAINT [PK_OrderWishList] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[OrderWishList]  WITH CHECK ADD  CONSTRAINT [FK_OrderWishList_ModelVariant] FOREIGN KEY([ModelVariantId])
REFERENCES [dbo].[ModelVariant] ([Id])
GO

ALTER TABLE [dbo].[OrderWishList] CHECK CONSTRAINT [FK_OrderWishList_ModelVariant]
GO

ALTER TABLE [dbo].[OrderWishList]  WITH CHECK ADD  CONSTRAINT [FK_OrderWishList_Person] FOREIGN KEY([PersonId])
REFERENCES [dbo].[Person] ([Id])
GO

ALTER TABLE [dbo].[OrderWishList] CHECK CONSTRAINT [FK_OrderWishList_Person]
GO

ALTER TABLE [dbo].[OrderWishList]  WITH CHECK ADD  CONSTRAINT [FK_OrderWishList_ServiceType] FOREIGN KEY([ServiceTypeId])
REFERENCES [dbo].[ServiceType] ([Id])
GO

ALTER TABLE [dbo].[OrderWishList] CHECK CONSTRAINT [FK_OrderWishList_ServiceType]
GO


ALTER PROCEDURE [dbo].[GetDofyGeoList]
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
                     Identifier,
                     Name,
                     EnumName,
                     Code,
                     Level,
                     LevelName,
                     Parent,
                     RowOrder,
                     DisplayInList,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_DofyGeoList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR Code LIKE @inWhereClause
                             OR LevelName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CODE' THEN Code
                        WHEN 'LEVELNAME' THEN LevelName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CODE' THEN Code
                        WHEN 'LEVELNAME' THEN LevelName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @OffsetStart ROWS 
                FETCH NEXT @RowsPerPage ROWS ONLY
End

GO
Create View [dbo].[vw_OrderWishList]
AS
       Select 
          Id,
		  PersonId,
		  ModelVariantId,
		  ServiceTypeId,
		  RowOrder,         
          Active,
          Created,
          CreatedBy,
          Modified,
          ModifiedBy		  
        From OrderWishList (NoLock) 
        Where Active = 1 

GO

ALTER PROCEDURE [dbo].[GetDofyGeoList]
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
                     Identifier,
                     Name,
                     EnumName,
                     Code,
                     Level,
                     LevelName,
                     Parent,
                     RowOrder,
                     DisplayInList,
                     Active,
                     Created,
                     CreatedBy,
                     Modified,
                     ModifiedBy,
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_DofyGeoList
                Where (@inWhereClause Is Null
                        Or (Name LIKE @inWhereClause
                             OR EnumName LIKE @inWhereClause
                             OR Code LIKE @inWhereClause
                             OR LevelName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CODE' THEN Code
                        WHEN 'LEVELNAME' THEN LevelName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn
                        WHEN 'NAME' THEN Name
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CODE' THEN Code
                        WHEN 'LEVELNAME' THEN LevelName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End DESC
                OFFSET @inOffsetStart ROWS 
                FETCH NEXT @inRowsPerPage ROWS ONLY
End
go

Create PROCEDURE [dbo].[GetOrderWishList]
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
					PersonId,
					ModelVariantId,
					ServiceTypeId,
					RowOrder,         
					Active,
					Created,
					CreatedBy,
					Modified,
					ModifiedBy,	
                     COUNT(*) OVER() as TotalRowsCount
                 From vw_OrderWishList 
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

ALTER View [dbo].[vw_OrdersList]

AS
       Select 
          Id,
          PersonId,
          ServiceTypeId,
          ModelVariantId,
          CancellationTypeId,
          StatusId,
          SuggestedCost,
          OrderCode,
          RequoteAmount,
          FinalPaid,
          OrderDate,
		  SeriesModelId,
          RowOrder,
          Active,
          Created,
          CreatedBy,
          Modified,
          ModifiedBy
        From ORDERS (NoLock) 
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

ALTER View [dbo].[vw_PartTypeList]

AS
       Select 
          Id,
          ProductTypeId,
          RepairTypeId,
		  SeriesModelColorId,
		  PartName,
		  PartId,
		  ServiceCharge,
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
          ModifiedBy
        From PARTTYPE (NoLock) 
        Where Active = 1 

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
					  SeriesModelColorId,
					  PartName,
					  PartId,
					  ServiceCharge,
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
                        Or (EnumName LIKE @inWhereClause
                        )
                     )
                ORDER BY
                CASE WHEN @Direction = 'ASC' Then
                    CASE @SortColumn                       
                        WHEN 'ENUMNAME' THEN EnumName
                        WHEN 'CREATED' THEN CONVERT(CHAR(19), Created, 120)
                        WHEN 'MODIFIED' THEN CONVERT(CHAR(19), Modified, 120)
                    ELSE NULL
                    End
                End ASC,
                CASE WHEN @Direction = 'DESC' Then
                    CASE @SortColumn                      
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
				, Remarks
				, TechnicianComments
				, apl.RowOrder
				, IsReschedule
				, apl.Active
				, ua.City as AppointmentCity -- Todo add appointment address id in appointments
				, ua.PinCode as AppointmentPincode  -- Todo add appointment address id in appointments 
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

ALTER View [dbo].[vw_AddressTypeList]

AS
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
          ModifiedBy
        From ADDRESSTYPE (NoLock) 
        Where Active = 1 

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

ALTER PROCEDURE [dbo].[GetPersonAddress]    
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
					 ua.City as CityName,
					 ua.StateName as StateName
                 From vw_UserAddressList ua
				 Inner Join vw_PersonList pl on pl.Id = ua.PersonId
				 Inner Join vw_AddressTypeList ad on ad.Id = ua.AddressTypeId
				 Where pl.Id = @PersonId
             
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
					ProductTypeId,
					Name,
					DisplayName,
					EnumName,
					RowOrder,
					Section,
					ParentSection,
					ChildSectionFailure,
					ChildSectionSuccess,
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

Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Login OTP','Login OTP',
  '<p>Dear {CustomerName},
<br /> < i>
Please use {OTP}  to complete the login process. kindly ignore this message, if not initiated by you.</i>
<br />
 Thanks,
<br />
<b>DOFYU Team</b> </p>','Login OTP','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)




Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Order Placed','Order Placed',
  '<p>Dear {CustomerName},
<br />  < i>
You have scheduled pickup of your {ModelVariant}.For any other queries contact us at {DOFYUUContactNo}</i>
<br />
 Thanks,
<br />
<b>DOFYU Team</b> </p>','Order Placed','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Order Rescheduled','Order Rescheduled',
  '<p>Dear {CustomerName},
<br /> < i>We have rescheduled pickup of your order {OrderNo} for {AppointmentDate}. For any other queries contact us at {DOFYUUContactNo}</i>
<br /> </p>','Order Rescheduled','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)




Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Order Cancelled','Order Cancelled',
  '<p>Dear {CustomerName},
<br />< i>Your order {OrderNo} has been cancelled. For any other queries contact us at {DOFYUContactNo}</i>
<br /> </p>','Order Cancelled','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Order Pending','Order Pending',
  '<p>Dear {CustomerName},
<br /> <i>Address Details for your Order {ModelVariant}, {OrderNo} are pending. For a smoother experience, update your preferred address details NOW. Visit: {ApplicationURL}</i>
<br />
 Thanks,
<br />
<b>DOFYU Team</b> </p>','Order Pending','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Report Delay','Report Delay',
  '<p>Dear {CustomerName},
<br /> <i>We are extremely sorry for the delay for your Order {ModelVariant} example Apple iPhone 5 (1 GB/32 GB), {OrderNo}. Our technician will rech you within {Selectedtimeinterval}. For any other queries contact us at {DOFYU Contact No}</i>
<br />
 Thanks,
<br />
<b>DOFYU Team</b> </p>','Report Delay','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Amount Requote','Amount Requote',
  '<p>Dear {CustomerName},
<br /><i>We are requoted the amount {OriginalAmount} to {RequotedAmount} for  your DOFYU order {ModelVariant}, {OrderNo}. </i>
<br />
 Thanks,
<br />
<b>DOFYU Team</b> </p>','Amount Requote','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Payment Process OTP','Payment Process OTP',
  '<p>Dear {CustomerName},
<br />  < i>
Please use {OTP}  to complete the payment process. kindly ignore this message, if not initiated by you.</i>
<br />
 Thanks,
<br />
<b>DOFYU Team</b> </p>','Payment Process OTP','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Payment Successful','Payment Successful',
  '<p>Dear {CustomerName},
<br /> < i>
Payment for  your DOFYU order {ModelVariant}, {OrderNo} is {Amount} has processed successful. 
</i>
<br />
 Thanks,
<br />
<b>DOFYU Team</b> </p>','Payment Successful','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Payment Failed','Payment Failed',
  '<p>Dear {CustomerName},
<br />< i>Payment for  your DOFYU order {ModelVariant}, {OrderNo} is {Amount} failed. For any other queries contact us at {DOFYUContactNo}
</i>
<br />
 Thanks,
<br />
<b>DOFYU Team</b> </p>','Payment Failed','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Order Failed','Order Failed',
  '<p>Dear {CustomerName},
<br /> < i>Your order {OrderNo}has been Failed. For any other queries contact us at {DOFYUContactNo}
</i>
<br /></p>','Order Failed','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Order Cancel Request','Order Cancel Request',
  '<p>Dear {CustomerName},
<br /> < i>Your request had been sent to our team. We will contact you soon. For any other queries contact us at {DOFYUContactNo}</i>
<br /> </p>','Order Cancel Request','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)



Insert into EmailTemplates(TemplateName,DisplayName,Template,EmailSubject,EmailCC,EmailBCC,SenderEmail,RowOrder,Active)
  values('Call was not Picked','Call was not Picked',
  '<p>Dear {CustomerName},
<br /> < i>Your order {OrderNo} has been Failed. For any other queries contact us at {DOFYUContactNo}</i>
<br /> </p>','Call was not Picked','indhumathiv@gmail.com','indhumathiv@gmail.com','jmaha0910@gmail.com',10,1)

GO