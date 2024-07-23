namespace DOFY.Public.API.Controllers.Master;

[AllowAnonymous]
[Route("v1/CarousalBanner")]
[ApiController]
public class CarousalBannerController : BaseController<IPublicCarousalBannerModel, CarousalBanner>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicCarousalBannerModel carousalBannerModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;
    public CarousalBannerController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicCarousalBannerModel iCarousalBannerModel, CountryContext requestContext)
        : base(iCarousalBannerModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.carousalBannerModel = iCarousalBannerModel;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetCarousalBanner")]
    public async Task<IEnumerable<CarousalBanner>> GetCarousalBanner()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetCarousalBanner();
        });

        return result;
    }
}
