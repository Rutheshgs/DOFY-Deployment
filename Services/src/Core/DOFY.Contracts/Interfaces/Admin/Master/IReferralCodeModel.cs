using DataTables.AspNet.Core;
using DOFY.Helper;
using DOFY.ViewEntities;

namespace DOFY.Contracts
{
    public interface IReferralCodeModel : IEntityModel<ReferralCode>
    {
        /// <summary>
        /// Get All ReferralCode list.
        /// </summary>
        /// <param name="request">request</param>
        /// <returns>List in ReferralCode creation</returns>
        PagedList<ReferralCode> GetPagedList(IDataTablesRequest request);
    }
}
