export interface IStatusModel{
    EntityTypeId: number,
    Name: string,
    Description: any,
    EnumName: string,
    DisplayName: string,
    TemplateText: string,
    DisplayInList: boolean,
    RowOrder: number,
    ExternalStatus: string,
    ColorCode:any,
    Id: number,
    Created: any,
    CreatedBy: number,
    Active: boolean,
    Modified: any,
    ModifiedBy: number,
    IsValid: boolean,
    ValidationErrors?: {}
}