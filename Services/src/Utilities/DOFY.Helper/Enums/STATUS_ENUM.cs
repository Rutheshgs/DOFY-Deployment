using System.Runtime.InteropServices;

namespace DOFY.Helper;

public enum STATUS_ENUM
{
    PENDING = 1,
    SCHEDULED = 2,
    INPROGRESS = 3,
    ASSINGED = 4,
    CANCELLED = 5,
    RESCHEDULED = 6,
    FAILED = 7,
    REQUOTE = 8,
    COMPLETED = 9,
    DELAYED = 10,
    PAYMENTPENDING = 11,
    PAYMENTFAILED = 12,
    PAYMENTCOMPLETED = 13,
    CANCELREQUEST = 14,
    Skip_OTP = 15,
    Referral_Code_Applied = 16,
    Adjustment = 17,
    Referral_Code_Removed = 18,
    Modified_Price = 19,
    New_Location = 20,
    New_Device =21
}
