namespace DOFY.Contracts;

public interface IPublicDownloadAppModel : IBaseModel<ViewEntities.DownloadApp>
{
    /// <summary>
    /// Post AppDownload.
    /// </summary>
    /// <param name="downloadApp">request.</param>
    /// <returns> ContactUS creation.</returns>
    Task<long> AppDownload(ViewEntities.DownloadApp downloadApp);
}