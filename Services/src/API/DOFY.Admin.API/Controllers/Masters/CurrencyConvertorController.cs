namespace DOFY.Admin.API.Controllers;


[Route("v1/currencyconverter")]
public class CurrencyConvertorController :  BaseController<ICurrencyConvertorModel, CurrencyConvertor>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly ICurrencyConvertorModel currencyconverterModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public CurrencyConvertorController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, ICurrencyConvertorModel iCurrencyConverterModel, CountryContext requestContext)
   : base(iCurrencyConverterModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.currencyconverterModel = iCurrencyConverterModel;
        this.mapper = iMapper;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetCurrencyConvertor")]
    public async Task<CurrencyConvertor> GetBrandMaster()
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetCurrency();
        });

        return result;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create(CurrencyConvertor item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return result;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit(CurrencyConvertor item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }

    [HttpGet]
    [Route("Remove/{id}")]
    public async Task<bool> Remove(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Remove(id);
        });

        return result;
    }

    //[HttpPost]
    //[Route("UpdateCurrencyConverter")]
    //public async Task<long> UpdateCurrencyConverter(CurrencyConvertor item)
    //{
    //    var result = await Task.Run(() =>
    //    {
    //        return this.Contract.AddOrUpdateItems(item);
    //    });

    //    return result;
    //}
}

