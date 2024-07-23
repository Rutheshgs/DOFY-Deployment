namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Helper;
using DOFY.Helper.Extensions;
using DOFY.ViewEntities;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class DownloadAppModel : BaseModel<DBO.DownloadApp>, IPublicDownloadAppModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public DownloadAppModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public async Task<long> AppDownload(DownloadApp downloadApp)
    {
        if (downloadApp is not null)
        {
            long appDownloadId = default;
            var template = new EmailTemplatesModel(this.config, this.mapper, this.iPrincipal, this.context);
            if (!string.IsNullOrEmpty(downloadApp.PhoneNumber))
            {
                if (downloadApp.PhoneNumber.IsNumber())
                {
                    appDownloadId = template.DownloadAppEmail(downloadApp.PhoneNumber, downloadApp.Email = string.Empty);
                }
                else
                {
                    appDownloadId = template.DownloadAppEmail(downloadApp.PhoneNumber = string.Empty, downloadApp.PhoneNumber);
                }
            }

            return await Task.FromResult(appDownloadId);
        }

        return default;
    }

    public DownloadApp Get(long id)
    {
        return default;
    }

    public IEnumerable<DownloadApp> GetList()
    {
        return default;
    }
}
