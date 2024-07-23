namespace DOFY.Public.API.Controllers;

[AllowAnonymous]
[Route("v1/Report")]
public class ReportController : BaseController<IPublicContactUSModel, ContactUS>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicContactUSModel contactUSModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public ReportController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicContactUSModel iContactUSModel, CountryContext requestContext)
        : base(iContactUSModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.contactUSModel = iContactUSModel;
        this.requestContext = requestContext;
    }

    [HttpGet]
    [Route("GetInvoicereport/{id}")]
    public async Task<FileContentResult> Invoicereport(long id)
    {
		string reportURL = "Reports/Invoicereport/{0}";
		reportURL = string.Format(reportURL, id);

		var result = await this.GetReport(reportURL);		

		return result;
    }

    [HttpGet]
    [Route("GetInvoicereportByte/{id}")]
    public async Task<byte[]> GetInvoicereportByte(long id)
    {
        string reportURL = "Reports/Invoicereport/{0}";
        reportURL = string.Format(reportURL, id);

        var result = await this.GetReportByte(reportURL);

        return result;
    }

    protected async Task<byte[]> GetReportByte(string apiURL)
    {
        HttpResponseMessage responseMessage = new HttpResponseMessage();
        try
        {
            string baseAPIURL = this.appConfiguration.Value.ApplicationConfiguration.ReportBaseURL;

            HttpClient client = new HttpClient();
            client.Timeout = TimeSpan.FromMinutes(2);
            client.DefaultRequestHeaders.Add("LanguageCode", this.requestContext.LanguageCode);
            client.DefaultRequestHeaders.Add("CountryCode", this.requestContext.CountryCode);
            responseMessage = client.GetAsync(string.Concat(baseAPIURL, apiURL)).Result;

            byte[] result = responseMessage.Content.ReadAsByteArrayAsync().Result;           

            return result;

            throw new Exception(responseMessage.ReasonPhrase);
        }
        catch (Exception)
        {
            throw;
        }
    }

    protected async Task<FileContentResult> GetReport(string apiURL)
    {
        HttpResponseMessage responseMessage = new HttpResponseMessage();
        try
        {
            string baseAPIURL = this.appConfiguration.Value.ApplicationConfiguration.ReportBaseURL;

            HttpClient client = new HttpClient();
            client.Timeout = TimeSpan.FromMinutes(2);
            //client.DefaultRequestHeaders.Add("DBName", GetDBName());
            responseMessage = client.GetAsync(string.Concat(baseAPIURL, apiURL)).Result;

            byte[] result = responseMessage.Content.ReadAsByteArrayAsync().Result;

            this.Response.Headers.Add("Content-Disposition", "inline;filename=Invoice.pdf");

            return new FileContentResult(result, "application/pdf");        

            throw new Exception(responseMessage.ReasonPhrase);
        }
        catch (Exception)
        {
            throw;
        }
    }
}