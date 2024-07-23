export interface IOrderWishListModel{
    Id: number,
    Created?: string,
    CreatedBy?: number,
    Active: boolean,
    Modified?: string,
    ModifiedBy?: number,
    ValidationErrors: {},
    PersonId: number,
    ModelVariantId: number,
    ServiceTypeId: number,
    RowOrder: number,
    MaximumValue: number,    
  }