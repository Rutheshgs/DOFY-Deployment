import { IOrderHistory } from "./IOrderHistory.Model"
import { IQuestionTypeModel } from "./QuestionType.Model"
import { IRequoteModel } from "./Requote.Model"

export interface IGetOrderSummaryModel {
  PersonId: any,
  ServiceTypeId: any,
  ModelVariantId: any,
  StatusId: any,
  CancellationTypeId: any,
  CancellationType?: any,
  OrderCode: any,
  ReferralCode: any,
  RowOrder: any,
  OrderDate: any,
  ServiceType: any,
  ModelVariantName: any,
  ThumbnailPath: any,
  ProductTypeName: any,
  BrandMasterName: any,
  SeriesModelName: any,
  SeriesModelColor: any,
  SeriesModelColorId: any,
  UserName: any,
  UserMobile: any,
  SecondaryMobile: any,
  StatusName: any,
  SeriesModelId: any,
  ReferralCodeId: any, 
  Payout: {
    OrderId?: number,
    SuggestedCost?: any,
    RequoteAmount?: any,
    Adjustment?: any,
    FinalPaid?: any,
    ReferralAmount: any,
    TotalAmount: any,
    CustomerExpectation: any,
},
  Appointment: {
    OrderId: any,
    AssigneeId: any,
    UserAddresId: any,
    AppointmentDate: any,
    StartTime: any,
    EndTime: any,
    Remarks: any,
    TechnicianComments: any,
    RowOrder: any,
    IsReschedule: any,
    Address: any,
    Address1: string,
    LandMark: any,
    AppointmentCity: any,
    AppointmentPincode: any,
    Id: any,
    Created: any,
    CreatedBy: any,
    Active: any,
    Modified: any,
    ModifiedBy: any,
    IsValid: any,
    ValidationErrors: {
      Items: []
    }
  },
  AssigneeDetails: {
    LoginId: any,
    UserRoleId: any,
    AssigneeName: any,
    Email: any,
    Mobile: any,
    SecondaryMobile: any,
    UploadImagePath: any,
    UploadImageName: any,
    UserRating: any,
    Address: any,
    Pincode: any,
    CityId: any,
    Id: any,
    Created: any,
    CreatedBy: any,
    Active: any,
    Modified: any,
    ModifiedBy: any,
    IsValid: any,
    ValidationErrors: {
      Items: []
    }
  },
  OrderDocuments: [],
  QuestionnaireResponse: Array<IRequoteModel>,
  Questionnaire: Array<IQuestionTypeModel>,
  OrderHistoryList: Array<IOrderHistory>,
  Id: any,
  Created: any,
  CreatedBy: any,
  Active: any,
  Modified: any,
  ModifiedBy: any,
  IsValid: any,
  OrderId: any,
  QuestionnaireTemplateId: any,
  Threshold: any,
  Question: any
  AnswerType: any,
  QuestionType: any,
  QuestionnaireTypeId: any,
  QuestionnaireType: any,
  ResponseText: any,
  ExternalStatus?: any
  Selected: boolean,
  ValidationErrors: {
    Items: []
  }
  RepairParts: [
    {
      Active: boolean
      Created: any
      CreatedBy: number
      Enabled: boolean
      Id: number
      IsValid: boolean
      Modified: any
      ModifiedBy: number
      OrderId: number
      PartType: string
      PartTypeId: number
      RepairType: string
      RepairTypeId: number
      RepairTypeName: string
      RowOrder: number
      ServiceCharge: any
      ValidationErrors: any
    }
  ]
}