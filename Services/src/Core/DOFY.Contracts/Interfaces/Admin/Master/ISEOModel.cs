namespace DOFY.Contracts;

using DOFY.ViewEntities;

public interface ISEOModel : IEntityModel<SEO>
{
    /// <summary>
    /// Get SEO list.
    /// </summary>
    /// <returns>Return SEO list.</returns>
    IEnumerable<ViewEntities.SEO> GetSEOList();
}
