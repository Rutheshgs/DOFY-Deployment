using DOFY.ViewEntities;
using DOFY.Helper;

namespace DOFY.Contracts
{
    public interface IPublicReferralCodeModel : IBaseModel<ReferralCode>
    {
        /// <summary>
        /// Get referralCode list.
        /// </summary>
        /// <param name="referralCode">referralCode.</param>
        /// <returns>List in ReferralCode creation.</returns>
        ViewEntities.ReferralCode GetReferralCodeOrders(string referralCode, long personId, long orderId);

        /// <summary>
        /// Get referralCode list.
        /// </summary>
        /// <param name="referralCode">referralCode.</param>
        /// <returns>List in ReferralCode creation.</returns>
        ViewEntities.ReferralCode RemoveReferralCode(string referralCode, long personId, long orderId);

        /// <summary>
        /// Get referralCode list.
        /// </summary>
        /// <param name="referralCode">referralCode.</param>
        /// <returns>List in ReferralCode creation.</returns>
        long RemoveReferralCodeFromOrder(string referralCode, long personId, long orderId);
    }
}
