namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class ScreenTypeModel : BaseModel<DBO.ScreenType>, IScreenTypeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public ScreenTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.ScreenType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.ScreenType, ViewEntities.ScreenType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.ScreenType> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.ScreenType>, IEnumerable<ViewEntities.ScreenType>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.ScreenType item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.ScreenType, DBO.ScreenType>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.ScreenType item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.ScreenType, DBO.ScreenType>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var ScreenType = this.FindById(id);
        if (ScreenType is not null)
        {
            ScreenType.Active = false;
            this.UpdateItem(ScreenType);

            return true;
        }

        return false;
    }

    public long Post(ViewEntities.ScreenType item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.ScreenType, DBO.ScreenType>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.ScreenType item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.ScreenType, DBO.ScreenType>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }
}
