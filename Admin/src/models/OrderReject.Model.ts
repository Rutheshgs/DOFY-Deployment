export interface IOrderRejectModel{
 id: number,
 created:any,
 createdBy: number,
 active:boolean,
 modified:any,
 modifiedBy: number,
 validationErrors: any,
 orderId: number,
 customerExpectation: number,
 remarks: any,
 reason: any
}