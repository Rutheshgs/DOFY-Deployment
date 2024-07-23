export interface IBrandSeriesModel {
    Id: number,
    Created: any,
    CreatedBy: number,
    Active: boolean,
    Modified: any,
    ModifiedBy: number,
    IsValid: boolean,
    ValidationErrors: {
        Items: [
            {
                PropertyName: string,
                Message: string
            }
        ]
    },
    BrandMasterId: number,
    Name: string,
    DisplayName: string,
    EnumName: string,
    RowOrder: number,
    DateOfIntroduction: any,
    DisplayInList: boolean,
    ThumbnailPath: string,
    TotalRowsCount: number
}