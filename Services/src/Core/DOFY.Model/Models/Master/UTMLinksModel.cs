
using AutoMapper;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Security.Principal;

namespace DOFY.Model.Models
{
    public class UTMLinksModel : BaseModel<DBO.UTMLinks>
    {
        private readonly IOptionsSnapshot<AppConfiguration> config;
        private readonly IMapper mapper;
        private readonly IPrincipal? principal;
        private readonly CountryContext context;

        public UTMLinksModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal? iPrincipal = null, CountryContext requestContext = null)
            : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
        {
            this.config = iConfig;
            this.mapper = iMapper;
            this.principal = iPrincipal;
            this.context = requestContext;
        }
    }
}