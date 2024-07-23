namespace DOFY.Contracts.Interfaces;

using DOFY.ViewEntities;

public interface IPublicSEOModel : IEntityModel<SEO>
{

    /// <summary>
    /// Get list of Item's available based on the logged in user role.
    /// </summary>
    /// <returns>List of Item's</returns>
    SEO GetSEOList(string pageName);

}
