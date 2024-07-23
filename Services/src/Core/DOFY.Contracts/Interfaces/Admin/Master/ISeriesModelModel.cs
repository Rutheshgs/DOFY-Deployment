namespace DOFY.Contracts;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface ISeriesModelModel : IEntityModel<SeriesModel>
{
    PagedList<SeriesModel> GetSeriesModelList(SearchBaseCriteria criteria);
}
