export interface IAppointmentSlotModel {
    StartTime: string,
    EndTime: string,
    EventDate: string,
    RowOrder: number,
    Id: number,
    Created: any,
    CreatedBy: number,
    Active: boolean,
    Modified: any,
    ModifiedBy: number,
    IsValid: boolean,
    ValidationErrors: {}
}