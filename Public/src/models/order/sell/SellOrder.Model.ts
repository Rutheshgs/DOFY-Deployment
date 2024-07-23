import { IQuestionModel } from "../../Question.Model";

export interface ISellOrderModel {
    Id: number,
    Created: any,
    CreatedBy: number,
    UserName: any,
    Active: true,
    Modified: any,
    ModifiedBy: number,
    ValidationErrors: {},
    PersonId: any,
    ServiceTypeId: number,
    ModelVariantId: number,
    SeriesModelColor: any,
    SeriesModelColorId: any,
    StatusId: any,
    CancellationTypeId: any,
    OrderCode: string,
    OrderLanguage: string,
    Remarks?: string,
    RowOrder: number,
    OrderDate: any,
    ServiceType: string,
    ModelVariantName: string,
    BrandThumbnailPath: string,
    ThumbnailPath: string,
    ProductTypeName: string,
    ProductTypeId: number,
    BrandMasterName: string,
    SeriesModelName: string,
    UserMobile: string,
    SecondaryMobile: string,
    StatusName: string,
    ExternalStatus: string,
    Appointment: IAppointmentSellModel,
    ReferralCode: any,
    ReferralCodeId: any,
    UTMReference?: any
    Payout: {
        OrderId?: number,
        SuggestedCost?: any,
        RequoteAmount?: any,
        Adjustment?: any,
        FinalPaid?: any,
        ReferralAmount: any,
        TotalAmount: any,
        CustomerExpectation?: any,
    },
    AssigneeDetails: {
        Id: number,
        Created: any,
        CreatedBy: number,
        Active: true,
        Modified: any,
        ModifiedBy: number,
        ValidationErrors: {},
        LoginId: number,
        UserRoleId: number,
        AssigneeName: string,
        Email: string,
        Mobile: string,
        SecondaryMobile: string,
        UploadImagePath: string,
        UploadImageName: string,
        UserRating: string,
        Address: string,
        Address1: string,
        Pincode: number,
        CityId: number
        City: string
    },
    OrderDocuments: [
        {
            Id: number,
            Created: any,
            CreatedBy: number,
            Active: true,
            Modified: any,
            ModifiedBy: number,
            ValidationErrors: {},
            OrdersId: number,
            DocumentTypeId: number,
            DocumentPath: string,
            RowOrder: number
        }
    ],
    OrderHistoryList?: Array<{
        Active: boolean
        Amount: number
        AppointmentDate: any
        AssignedTo: any
        AssigneeName: any
        ColorCode: string
        Comments: any
        Created: any
        CreatedBy: number
        Id: number
        IsValid: boolean
        Modified: any
        ModifiedBy: number
        OrderId: number
        StatusId: number
        StatusName: string
        TransactionDate: any
    }>
    QuestionnaireResponse: Array<IQuestionModel>
    RepairParts: [
        {
            Id: number,
            Created: any,
            CreatedBy: number,
            Active: true,
            Modified: any,
            ModifiedBy: number,
            ValidationErrors: {},
            OrderId: number,
            RepairTypeId: number,
            PartTypeId: number,
            RowOrder: number,
            RepairType: any,
            PartType: string,
            ServiceCharge: number,
            Enabled: boolean,
            RepairTypeName?: any
        }
    ],
    orderSpecificationsList: [
        {
            id: 0,
            created: any,
            createdBy: 0,
            active: true,
            modified: any,
            modifiedBy: 0,
            isValid: true,
            validationErrors: {
                items: [
                    {
                        propertyName: string,
                        message: string
                    }
                ]
            },
            orderId: 0,
            imeiNumber: string,
            iemiVerified: 0,
            rowOrder: 0
        }
    ]
}

export interface IAppointmentSellModel {
    Id: number,
    Created: any,
    CreatedBy: number,
    Active: true,
    Modified: any,
    ModifiedBy: number,
    ValidationErrors: {},
    OrderId: number,
    Name: string,
    Address: string,
    Address1: string,
    LandMark: string,
    AssigneeId: number,
    UserAddresId: number,
    AppointmentDate: any,
    StartTime: any,
    EndTime: any,
    Remarks: string,
    TechnicianComments: string,
    RowOrder: number,
    IsReschedule: true,
    AppointmentCity: string,
    AppointmentPincode: number
}

export interface IAssigneeDetailsModel {
    Id: number,
    Created: any,
    CreatedBy: number,
    Active: true,
    Modified: any,
    ModifiedBy: number,
    ValidationErrors: {},
    LoginId: number,
    UserRoleId: number,
    AssigneeName: string,
    Email: string,
    Mobile: string,
    SecondaryMobile: string,
    UploadImagePath: string,
    UploadImageName: string,
    UserRating: string,
    Address: string,
    Address1: string,
    Pincode: number,
    City: string
    CityId: number
}