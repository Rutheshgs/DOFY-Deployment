
namespace DOFY.Public.API.Controllers;

[Route("v1/SEO")]
[ApiController]
public class SEOController : BaseController<IPublicSEOModel, SEO>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly CountryContext requestContext;
    private readonly IPublicSEOModel sEOModel;
    private IMapper mapper;
    public SEOController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicSEOModel iSEOModel, CountryContext requestContext)
        : base(iSEOModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.sEOModel = iSEOModel;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetSEOList/{pageName}")]
    public async Task<SEO> GetSEOList(string pageName)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetSEOList(pageName);
        });

        return result;
    }

}
