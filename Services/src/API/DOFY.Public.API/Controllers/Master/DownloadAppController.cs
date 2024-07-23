namespace DOFY.Public.API.Controllers;

[AllowAnonymous]
[Route("v1/DownloadApp")]
public class DownloadAppController : BaseController<IPublicDownloadAppModel, DownloadApp>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicDownloadAppModel contactUSModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public DownloadAppController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicDownloadAppModel iDownloadAppModel, CountryContext requestContext)
        : base(iDownloadAppModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.contactUSModel = iDownloadAppModel;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("AppDownload")]
    public async Task<long> Submit([FromBody] ViewEntities.DownloadApp downloadApp)
    {
        return await this.Contract.AppDownload(downloadApp);
    }
}
