export interface IproductValue {
  Name: any,
  ThumbnailPath: any,
  RowOrder: any,
  Variants: Array<IProductVariantModel>,
  Id: any,
  Created: any,
  CreatedBy: any,
  Active: any,
  Modified: any,
  ModifiedBy: any,
  IsValid?: any,
  ValidationErrors: any
}

export interface IProductVariantModel {
  OrderWishlistId: any,
  SeriesModelId: any,
  SeriesModelName: any,
  Name: any,
  MinimumValue: any,
  MaximumValue: any,
  ThumbnailPath: any,
  RowOrder: any,
  BrandMasterId: any,
  BrandMasterName: any,
  ProductTypeId: any,
  Id: any,
  Created: any,
  CreatedBy: any,
  Active: true,
  Modified: null,
  ProductCategoryName: String,
  ThresholdCategoryName: String,
  ProductCategoryId: number,
  ThresholdCategoryId: number,
  ModifiedBy: any,
  IsValid: any,
  DisplayInList: boolean,
  DisplayForSale:boolean,
  ValidationErrors: {
    Items: []
  }
}