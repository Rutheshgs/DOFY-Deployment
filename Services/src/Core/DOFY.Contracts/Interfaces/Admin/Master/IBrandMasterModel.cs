namespace DOFY.Contracts;

using DataTables.AspNet.Core;
using DOFY.Helper;
using DOFY.ViewEntities;

public interface IBrandMasterModel : IEntityModel<BrandMaster>
{
    /// <summary>
    /// Get All BrandMaster list.
    /// </summary>
    /// <param name="request">request</param>
    /// <returns>List in BrandMaster creation</returns>
    PagedList<BrandMaster> GetPagedList(IDataTablesRequest request);
}
