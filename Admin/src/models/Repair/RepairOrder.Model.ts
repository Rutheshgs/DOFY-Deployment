export interface IRepairOrderModel {
    Id: any,
    Created: any,
    CreatedBy: any,
    Active: any,
    Modified: any,
    ModifiedBy: any,
    ValidationErrors: {},
    PersonId: any,
    ServiceTypeId: any,
    ModelVariantId: any,
    UserName: any,
    StatusId: any,
    CancellationTypeId: any,
    OrderCode: any,
    SuggestedCost: any,
    RequoteAmount: any,
    FinalPaid: any,
    RowOrder: any,
    OrderDate: any,
    ServiceType: any,
    ModelVariantName: any,
    ThumbnailPath: any,
    ProductTypeName: any,
    BrandMasterName: any,
    SeriesModelName: any,
    UserMobile: any,
    SecondaryMobile: any,
    SeriesModelColor: any
    StatusName: any,
    SeriesModelId: any,
    Appointment: {
      Id: any,
      Created: any,
      CreatedBy: any,
      Active: any,
      Modified: any,
      ModifiedBy: any,
      ValidationErrors: {},
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
      AppointmentCity: any,
      AppointmentPincode: any
    },
    AssigneeDetails: {
      Id: any,
      Created: any,
      CreatedBy: any,
      Active: any,
      Modified: any,
      ModifiedBy: any,
      ValidationErrors: {},
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
      CityId: any
    },
    OrderDocuments: [
      {
        Id: any,
        Created: any,
        CreatedBy: any,
        Active: any,
        Modified: any,
        ModifiedBy: any,
        ValidationErrors: {},
        OrdersId: any,
        DocumentTypeId: any,
        DocumentPath: any,
        RowOrder: any,
        UploadFiles: [
          any
        ],
        Specifics: any
      }
    ],
    QuestionnaireResponse: [
      {
        Id: any,
        Created: any,
        CreatedBy: any,
        Active: any,
        Modified: any,
        ModifiedBy: any,
        ValidationErrors: {},
        OrderId: any,
        QuestionnaireTemplateId: any,
        Selected: any,
        Threshold: any,
        RowOrder: any,
        Version: any,
        Question: any,
        AnswerType: any,
        ThumbnailPath: any,
        QuestionType: any,
        QuestionnaireTypeId: any,
        QuestionnaireType: any,
        ParentId: any
      }
    ],
    Questionnaire: {
      Id: any,
      Created: any,
      CreatedBy: any,
      Active: any,
      Modified: any,
      ModifiedBy: any,
      ValidationErrors: {},
      OrderId: any,
      Version: any,
      Sections: [
        {
          Id: any,
          Created: any,
          CreatedBy: any,
          Active: any,
          Modified: any,
          ModifiedBy: any,
          ValidationErrors: {},
          ProductTypeId: any,
          QuestionnaireTypeId: any,
          OSTypeId: any,
          ModelVariantId: any,
          Identifier: any,
          ParentId: any,
          Name: any,
          DisplayName: any,
          EnumName: any,
          SubHeading: any,
          Type: any,
          AnswerType: any,
          Threshold: any,
          RowOrder: any,
          DisplayInList: any,
          ThresholdLevel: any,
          Enabled: any,
          ThumbnailPath: any,
          QuestionnaireTypeName: any,
          QuestionnaireTypeDisplayName: any,
          QuestionnaireTypeEnumName: any,
          Response: any,
          ResponseText: any,
          IsChild: any,
          Version: any,
          Questions: [
            any
          ]
        }
      ]
    },
    RepairParts: {
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
    SeriesModelColorId: any
  }
  
  export interface IRepairOrderPostModel {
    RepairTypeId: number,
    OrderId: any,
    PartTypeId: any,
    RepairType: string,
    PartType: any,
    ServiceCharge: any,
    RepairTypeName:string
  }

  export interface IRepairOrderQuestionnaire{
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