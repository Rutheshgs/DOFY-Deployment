namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class DocumentTypeModel : BaseModel<DBO.DocumentType>
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public DocumentTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.DocumentType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.DocumentType, ViewEntities.DocumentType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.DocumentType> GetList()
    {
        var results = this.FindItems(item => item.Active == true && item.DisplayInList == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.DocumentType>, IEnumerable<ViewEntities.DocumentType>>(results);

        return mapperResults;
    }

    public override IEnumerable<DBO.DocumentType> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.DocumentType>(DOFYConstants.DataBase.SP_GetDocumentTypeList, null);

        return results;
    }
}
