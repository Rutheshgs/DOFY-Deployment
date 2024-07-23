namespace DOFY.Public.API.Controllers
{
    [Route("v1/PublicRequest")]

    public class PublicRequestController : BaseController<IPublicRequestOrderModel, OrderPublicRequest>
    {

        private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
        private readonly IPublicRequestOrderModel publicRequestModel;
        private readonly CountryContext requestContext;
        private IMapper mapper;

        public PublicRequestController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicRequestOrderModel iPublicRequestModel, CountryContext requestContext
    )
            : base(iPublicRequestModel, iAppConfiguration, requestContext: requestContext)
        {
            this.appConfiguration = iAppConfiguration;
            this.mapper = iMapper;
            this.publicRequestModel = iPublicRequestModel;
            this.requestContext = requestContext;

        }
        [HttpPost]
        [Route("LocationRequest")]
        public async Task<long> LocationRequest([FromBody] OrderPublicRequest item)
        {
            var result = await Task.Run(() =>
            {
                return this.Contract.SaveLocation(item);
            });

            return result;
        }

        [HttpPost]
        [Route("DeviceRequest")]
        public async Task<long> DeviceRequest([FromBody] OrderPublicRequest item)
        {
            var result = await Task.Run(() =>
            {
                return this.Contract.SaveDevice(item);
            });

            return result;
        }
    }
}
