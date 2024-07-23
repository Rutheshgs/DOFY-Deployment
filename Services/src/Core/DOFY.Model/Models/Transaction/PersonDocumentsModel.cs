namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class PersonDocumentsModel : BaseModel<DBO.PersonDocuments>, IPublicPersonDocumentsModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public PersonDocumentsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper,iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.PersonDocuments Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.PersonDocuments, ViewEntities.PersonDocuments>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.PersonDocuments> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.PersonDocuments>, IEnumerable<ViewEntities.PersonDocuments>>(results);

        return mapperResults;
    }

}
