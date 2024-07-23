export interface ICancellationModel {
    Name: string,
    DisplayName: string,
    EnumName: string,
    DisplayInList: boolean,
    RowOrder: number,
    Id: number,
    Created: any,
    CreatedBy: number,
    Active: boolean,
    Modified: any,
    ModifiedBy: number,
    SecondLanguage: string,
    IsValid: boolean,
    ValidationErrors: {
        Items: []
    }
}