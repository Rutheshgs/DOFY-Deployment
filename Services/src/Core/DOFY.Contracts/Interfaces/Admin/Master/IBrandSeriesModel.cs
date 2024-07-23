namespace DOFY.Contracts;

using DOFY.ViewEntities;

public interface IBrandSeriesModel : IEntityModel<BrandSeries>
{
    /// <summary>
    /// Get BrandSeries list.
    /// </summary>
    /// <param name="BrandMasterId">request.</param>
    /// <returns>List in BrandSeries creation.</returns>
    IEnumerable<ViewEntities.BrandSeries> GetBrandSeriesById(int BrandMasterId);
}
