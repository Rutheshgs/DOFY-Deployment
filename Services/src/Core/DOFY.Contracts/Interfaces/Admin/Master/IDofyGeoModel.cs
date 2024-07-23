namespace DOFY.Contracts;

using DataTables.AspNet.Core;
using DOFY.Helper;
using DOFY.ViewEntities;

public interface IDofyGeoModel : IEntityModel<DofyGeo>
{
    /// <summary>
    /// Get All BrandMaster list.
    /// </summary>
    /// <param name="request">request</param>
    /// <returns>List in BrandMaster creation</returns>
    PagedList<DofyGeo> GetPagedList(IDataTablesRequest request);
}
