namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class ScreenMasterModel : BaseModel<DBO.ScreenMaster>, IScreenMasterModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public ScreenMasterModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.ScreenMaster Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.ScreenMaster, ViewEntities.ScreenMaster>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.ScreenMaster> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.ScreenMaster>, IEnumerable<ViewEntities.ScreenMaster>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.ScreenMaster item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.ScreenMaster, DBO.ScreenMaster>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.ScreenMaster item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.ScreenMaster, DBO.ScreenMaster>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var ScreenMaster = this.FindById(id);
        if (ScreenMaster is not null)
        {
            ScreenMaster.Active = false;
            this.UpdateItem(ScreenMaster);

            return true;
        }

        return false;
    }

    public long Post(ViewEntities.ScreenMaster item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.ScreenMaster, DBO.ScreenMaster>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.ScreenMaster item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.ScreenMaster, DBO.ScreenMaster>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }
}
