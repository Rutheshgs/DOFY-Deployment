namespace DOFY.Admin.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseController<TIContract, TItem> : Controller
        where TIContract : IBaseModel<TItem>
        where TItem : DOFY.ViewEntities.EntityBase
{
    private readonly TIContract contract;
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private CountryContext _requestContext;

    private readonly IBaseContext baseContext;

    public BaseController(TIContract iContract, IOptionsSnapshot<AppConfiguration> iAppConfiguration, IBaseContext context = null, CountryContext requestContext = null)
    {
        this.contract = iContract;
        this.baseContext = context;
        this.appConfiguration = iAppConfiguration;
        this._requestContext = requestContext;
    }

    public AppCurrentUser CurrentUser
    {
        get
        {
            return new AppCurrentUser(this.User as ClaimsPrincipal);
        }
    }

    public TIContract Contract
    {
        get { return this.contract; }
    }

    public HttpClient Client
    {
        get { return this.baseContext.Client; }
    }

    public long LoggedInUserId
    {
        get { return Convert.ToInt64(this.User.Claims.Where(item => item.Type == ClaimTypes.PrimarySid)?.FirstOrDefault()?.Value); }
    }

    public long TrialUserAssetCount
    {
        get { return Convert.ToInt64(this.User.Claims.Where(item => item.Type == "SubscribedAssets")?.FirstOrDefault()?.Value); }
    }

    public DateTime PlanExpiredDate
    {
        get
        {
            if (!string.IsNullOrEmpty(this.User.Claims.Where(item => item.Type == "ToDate")?.FirstOrDefault()?.Value))
            {
                return Convert.ToDateTime(this.User.Claims.Where(item => item.Type == "ToDate")?.FirstOrDefault()?.Value);
            }
            else
            {
                return default(DateTime);
            }
        }
    }

    public int CompanyId
    {
        // Currently hard coded. We have to modify
        get { return 1; }
    }

    // GET: /<controller>/
    [NonAction]
    public virtual IActionResult Index()
    {
        var result = this.contract.GetList();

        return this.View(result);
    }

    [NonAction]
    [HttpGet]
    public virtual IActionResult Edit(int id)
    {
        var result = this.contract.Get(id);

        return this.View(result);
    }

    [NonAction]
    [HttpGet]
    public virtual IActionResult Create()
    {
        var result = Activator.CreateInstance<TItem>();

        return this.View(result);
    }

    protected virtual void SetTempData<T>(string key, T value)
    {
        this.TempData[key] = value.Serialize<T>();
    }

    protected virtual T GetTempData<T>(string key)
    {
        object o;
        this.TempData.TryGetValue(key, out o);
        return o == null ? default(T) : ((string)o).Deserialize<T>();
    }

    protected TEntity PostAsync<TEntity, TMEntity>(string apiURL, TMEntity requestModel, IFormFileCollection files = null, bool postFormObject = false)
    {
        HttpResponseMessage responseMessage = new HttpResponseMessage();
        var userTokenId = this.CurrentUser.UserToken;
        this.Client.DefaultRequestHeaders.Clear();
        this.Client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", userTokenId);

        try
        {
            var request = requestModel.Serialize();

            HttpContent content = null;
            if (postFormObject)
            {
                content = new FormUrlEncodedContent(new[]
                    {
                            new KeyValuePair<string, string>(string.Empty, request),
                        });
            }
            else if (files != null)
            {
                var requestContent = new MultipartFormDataContent();
                requestContent.Add(new StringContent(request, Encoding.UTF8, "application/json"));

                foreach (var file in files)
                {
                    requestContent.Add(new StreamContent(file.OpenReadStream()), file.Name, file.FileName);
                }

                content = requestContent;
            }
            else
            {
                content = new StringContent(request, Encoding.UTF8, "application/json");
            }

            var restRequest = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(apiURL, UriKind.Relative),
                Content = content,
            };

            responseMessage = this.Client.PostAsync(apiURL, restRequest.Content).Result;

            if (typeof(TEntity).Equals(typeof(HttpResponseMessage)))
            {
                return (TEntity)(object)responseMessage;
            }

            if (responseMessage.IsSuccessStatusCode)
            {
                var resultString = responseMessage.Content.ReadAsStringAsync().Result;
                var result = resultString.Deserialize<TEntity>();

                if (typeof(TEntity).Equals(typeof(bool)))
                {
                    return (TEntity)(object)true;
                }

                return result;
            }

            throw new Exception(responseMessage.ReasonPhrase);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [NonAction]
    public IConfiguration RebuildConfiguration(IConfiguration configuration)
    {
        var dbCollection = new Dictionary<string, string>
            {
                { "HostingEnvironment:ContentRootPath", Convert.ToString(configuration["HostingEnvironment:ContentRootPath"]) },
                { "HostingEnvironment:EnvironmentName", Convert.ToString(configuration["HostingEnvironment:EnvironmentName"]) },
            };

        var builder = new ConfigurationBuilder()
                        .SetBasePath(Convert.ToString(configuration["HostingEnvironment:ContentRootPath"]))
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile($"appsettings.{Convert.ToString(configuration["HostingEnvironment:EnvironmentName"])}.json", optional: true)
                        .AddEnvironmentVariables()
                        .AddEnvironmentVariables().AddInMemoryCollection(dbCollection);

        return builder.Build();
    }

    public override void OnActionExecuting(ActionExecutingContext ctx)
    {
        try
        {
            var dict = new Dictionary<string, string>();
            this.HttpContext.User.Claims.ToList().ForEach(item => dict.Add(item.Type, item.Value));
        }
        catch
        {
        }
    }

    protected TEntity PutAsync<TEntity, TMEntity>(string apiURL, TMEntity requestModel)
    {
        HttpResponseMessage responseMessage = new HttpResponseMessage();
        try
        {
            var restRequest = new HttpRequestMessage
            {
                Method = HttpMethod.Put,
                RequestUri = new Uri(apiURL, UriKind.Relative),
                Content = new StringContent(requestModel.Serialize(), null, "application/json"),
            };

            responseMessage = this.Client.PutAsync(apiURL, restRequest.Content).Result;

            if (typeof(TEntity).Equals(typeof(HttpResponseMessage)))
            {
                return (TEntity)(object)responseMessage;
            }

            if (typeof(TEntity).Equals(typeof(HttpResponseMessage)))
            {
                return (TEntity)(object)responseMessage;
            }

            if (responseMessage.IsSuccessStatusCode)
            {
                var resultString = responseMessage.Content.ReadAsStringAsync().Result;
                var result = JsonConvert.DeserializeObject<TEntity>(resultString);
                if (typeof(TEntity).Equals(typeof(bool)))
                {
                    return (TEntity)(object)true;
                }

                return result;
            }

            throw new Exception(responseMessage.ReasonPhrase);
        }
        catch (Exception)
        {
            throw;
        }
    }
}