namespace DOFY.Contracts.Interfaces;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IPublicUserAddressModel : IEntityModel<UserAddress>
{
    /// <summary>
    /// Get UserAddress list.
    /// </summary>
    /// <param name="personId">personId.</param>
    /// <returns>List in UserAddress creation.</returns>
    PagedList<UserAddressViewModel> GetPersonAddress(long personId);
}
