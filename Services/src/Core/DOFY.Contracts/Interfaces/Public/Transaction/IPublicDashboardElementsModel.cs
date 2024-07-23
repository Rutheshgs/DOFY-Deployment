namespace DOFY.Contracts.Interfaces.Public;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IPublicDashboardElementsModel : IBaseModel<DashboardElements>
{
    /// <summary>
    /// Get All GetHotSaleVariants list.
    /// </summary>
    /// <returns>List in GetHotSaleVariants.</returns>
    IEnumerable<HotSaleViewModel> GetHotSaleVariants();
}
