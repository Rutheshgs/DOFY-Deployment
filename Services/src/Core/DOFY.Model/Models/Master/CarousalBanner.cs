namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Helper;
using DOFY.ViewEntities;
using global::DOFY.Contracts;
using global::DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;

public class CarousalBanner : BaseModel<DBO.CarousalBanner>, IPublicCarousalBannerModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public CarousalBanner(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.CarousalBanner Get(long id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ViewEntities.CarousalBanner> GetCarousalBanner()
    {
        var secondLanguage = "en";

        if (this.context.LanguageCode == "ar")
        {
            secondLanguage = "ar";
        }

        var result = this.FindItems(x => x.Active == true && x.SecondLanguage == secondLanguage);

        if (result.Count() > 0)
        {
            var mapperResults = this.mapper.Map<IEnumerable<DBO.CarousalBanner>, IEnumerable<ViewEntities.CarousalBanner>>(result);
            return mapperResults;
        }

        return default;
    }

    public IEnumerable<ViewEntities.CarousalBanner> GetList()
    {
        throw new NotImplementedException();
    }
}
