export interface IGetOrdersByRiderModel {
  OffsetStart: number,
  RowsPerPage: any,
  SortOrder: string,
  SortOrderColumn: string,
  SearchText: any,
  PersonId: any,
  StatusId: any,
  ProductTypeId: any,
  SeriesModelId: any,
  BrandMasterId: any
  CityId: any,
  ReferralCodeId?: any,
  FromDate?: any,
  ToDate?: any,
  CompletedStartDate?: any,
  CompletedEndDate?: any,
}