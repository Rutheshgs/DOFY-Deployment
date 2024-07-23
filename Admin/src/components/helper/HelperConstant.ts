const schema = window.location.protocol ?? "http:";
export const HelperConstant = {
  imageAPI: "http://dofycdn.inventsoftlabs.in/",
  // imageAPI: schema + "//cdn.dofy.in",
  osTypeId: { ANDROID: 2, IOS: 3 },
  serviceTypeId: { REPAIR: 3, SELL: 2 },
  defaultAPIKey: "BaseSecurityAPIkey 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa6525e83042262948b9824",
  Roles: { Admin: 1, Super_Admin: 2, Rider: 3, Public: 4, Configurator: 5, SEO: 6 },
  emailPattern: { pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/, },
  productTypeId: { phone: 0 },
  documentTypeId: {
    PanCard: 1,
    Aadhar_Card: 2,
    Driving_License: 3,
    Selfie: 4,
    Id_Front: 5,
    Id_Back: 6,
    Bill: 7,
    Warranty: 8,
    Signature: 9,
    Front: 10,
    Back: 11,
    Top: 12,
    Bottom: 13,
    Left: 14,
    Right: 15,
  },
  dashboardNameIndex: {
    AllOrders: 1,
    OpenOrders: 2,
    InProgressOrders: 3,
    CompletedOrders: 4,
    FailedOrders: 5,
    CancelRequestOrders: 6,
    CancelledOrders: 7,
    PendingOrders: 8,
    searchData: null,
  },
  QuestionnaireTypeId: {
    Screen: 4,
    Body: 5,
    Functional: 2,
    Warranty: 6,
    Accessories: 3,
  },
  otpVerificationTime: { timer: 120 },
  StatusId: {
    All: null,
    PENDING: 1,
    SCHEDULED: 2,
    INPROGRESS: 3,
    ASSIGNED: 4,
    CANCELLED: 5,
    RESCHEDULED: 6,
    FAILED: 7,
    REQUOTE: 8,
    COMPLETED: 9,
    DELAYED: 10,
    CANCEL_REQUEST: 14,
  },
  questionnaireType: {
    DeviceDetails: 1,
    FunctionalDetails: 2,
    PossessionDetails: 3,
    DeviceScreenDetails: 4,
    DeviceBodyDetails: 5,
    DeviceAge: 6,
    BillingSection: 7,
    GameCDs: 8,
    PhysicalCondition: 9,
    ScreenCondition: 10,
    SystemConfiguration: 11,
    AdditionalFeatures: 12,
    AdditionalLens: 13,
  },
  RatingTooltip: ["Terrible", "Bad", "Average", "Great", "Excellent"],
  UserRoleName: { Public: "Public" },

};
