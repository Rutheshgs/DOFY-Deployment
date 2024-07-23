export interface ISeriesModel {
    BrandMasterId: number,
    OsTypeId: number,
    BrandSeriesId: number,
    Name: string,
    DisplayName: string,
    EnumName: string,
    DateOfIntroduction: any,
    DisplayInList: boolean,
    RowOrder: number,
    ThumbnailPath: string,
    Specification: any,
    ComingSoon: boolean,
    BrandSeriesName: string,
    BrandSeriesThumbnailPath: any,
    BrandMasterName: string,
    BrandMasterThumbnailPath: string,
    ProductTypeId: number,
    ProductTypeName: string,
    ProductTypeThumbnailPath: string,
    Id: number,
    Created: any,
    CreatedBy: any,
    Active: boolean,
    Modified: any,
    ModifiedBy: any,
    IsValid: boolean,
    ValidationErrors: { Items: [] }
}
