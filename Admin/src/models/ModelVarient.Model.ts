export interface IModelVariantModel {
  id?: number;
  created: any;
  createdBy?: number;
  active?: boolean;
  modified: any;
  modifiedBy?: number;
  validationErrors?: {};
  SeriesModelId: number;
  Name: string;
  DisplayName: string;
  EnumName: string;
  DateOfIntroduction?: any;
  DisplayInList: true;
  RowOrder: number;
  TotalRowsCount: number;
  ThumbnailPath: string;
  MinimumValue: number;
  MaximumValue: number;
  DisplayForSale?: boolean;
  DisplayForRepair?: boolean;
  Specification: string;
  ProductCategoryId: number;
  ThresholdCategoryId: number;
  ComingSoon: true;
  SeriesModelName: string;
  SeriesModelThumbnailPath: string;
  BrandSeriesId: number;
  OsTypeId: number;
  BrandSeriesName: string;
  BrandSeriesThumbnailPath: string;
  BrandMasterId: number;
  BrandMasterName: string;
  BrandMasterThumbnailPath: string;
  ProductTypeId: number;
  ProductTypeName: string;
  ProductTypeThumbnailPath: string;
}
