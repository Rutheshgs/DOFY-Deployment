namespace DOFY.Admin.API.Controllers;

[Route("v1/paymentDetails")]
public class PaymentDetailsController : BaseController<IPaymentDetailsModel, PaymentDetails>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPaymentDetailsModel paymentDetailsModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public PaymentDetailsController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPaymentDetailsModel paymentDetailsModel, CountryContext requestContext)
        : base(paymentDetailsModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.paymentDetailsModel = paymentDetailsModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("AddPaymentDetails")]
    public async Task<long> AddPaymentDetails(PaymentDetails payment)
    {
        return await this.Contract.AddPaymentDetailsAsync(payment);
    }

    [HttpPost]
    [Route("UpdatePaymentDetails")]
    public async Task<long> UpdatePaymentDetails(PaymentDetails payment)
    {
        return await this.Contract.UpdatePaymentDetailsAsync(payment);
    }
}