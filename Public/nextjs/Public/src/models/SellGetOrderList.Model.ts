export interface ISellGetOrderListModel {
    OffsetStart: number,
    RowsPerPage: number,
    SortOrder: string,
    SortOrderColumn: string,
    SearchText: any,
    ProductTypeId: number,
    StatusId: number
}