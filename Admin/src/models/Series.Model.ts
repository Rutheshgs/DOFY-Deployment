export interface ISeriesModel {
  id?: number;
  created: any;
  createdBy?: number;
  Active?: boolean;
  modified: any;
  modifiedBy?: number;
  validationErrors?: {};
  BrandMasterId: number;
  OsTypeId: number;
  BrandSeriesId: any;
  Name: string;
  DisplayName: string;
  EnumName: string;
  DateOfIntroduction?: any;
  DisplayInList: true;
  RowOrder: number;
  ThumbnailPath: string;
  Specification: string;
  ComingSoon: true;
  BrandSeriesName: string;
  BrandSeriesThumbnailPath: string;
  BrandMasterName: string;
  BrandMasterThumbnailPath: string;
  ProductTypeId: number;
  ProductTypeName: string;
  ProductTypeThumbnailPath: string;
}
