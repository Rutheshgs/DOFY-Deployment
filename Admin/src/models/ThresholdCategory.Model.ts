export interface IThresholdCategoryModel {
    EntityTypeId: number,
    Name: string,
    DisplayName: string,
    EnumName: string,
    Description: null,
    DisplayInList: boolean,
    RowOrder: number,
    Id: number,
    Created: any,
    CreatedBy: number,
    Active: boolean,
    Modified: any,
    ModifiedBy: number,
    IsValid: boolean,
    ValidationErrors: {
        Items: []
    }
}