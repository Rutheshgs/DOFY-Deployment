namespace DOFY.Contracts;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IModelVariantModel : IEntityModel<ModelVariant>
{
    /// <summary>
    /// Get ModelVariant list.
    /// </summary>
    /// <param name="item">criteria.</param>
    /// <returns>List in ModelVariant creation.</returns>
    long AddOrUpdateItems(SeriesModelViewModel item);

    /// <summary>
    /// Get ModelVariant list.
    /// </summary>
    /// <param name="brandMasterId">brandMasterId.</param>
    /// <param name="seriesModelId">seriesModelId.</param>
    /// <param name="serviceTypeId">serviceTypeId.</param>
    ///  <param name="categoryId">serviceTypeId.</param>
    /// <returns>List in ModelVariants.</returns>
    IEnumerable<SeriesModelViewModel> GetVariantsBySeriesModel(long? brandMasterId, long? seriesModelId, long? serviceTypeId, long? categoryId);

    PagedList<ModelVariant> GetModelVariantList(SearchBaseCriteria criteria);

    ViewEntities.ModelVariant GetModel(long id);
}
