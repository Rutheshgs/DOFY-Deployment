namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class ScreenActivityMasterModel : BaseModel<DBO.ScreenActivityMaster>, IScreenActivityMasterModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public ScreenActivityMasterModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.ScreenActivityMaster Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result != null)
        {
            var mapperResult = this.mapper.Map<DBO.ScreenActivityMaster, ViewEntities.ScreenActivityMaster>(result);

            return mapperResult;
        }

        return default(ViewEntities.ScreenActivityMaster);
    }

    public IEnumerable<ViewEntities.ScreenActivityMaster> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.ScreenActivityMaster>, IEnumerable<ViewEntities.ScreenActivityMaster>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.ScreenActivityMaster item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ScreenActivityMaster, DBO.ScreenActivityMaster>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Post(ViewEntities.ScreenActivityMaster item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ScreenActivityMaster, DBO.ScreenActivityMaster>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.ScreenActivityMaster item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ScreenActivityMaster, DBO.ScreenActivityMaster>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.ScreenActivityMaster item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ScreenActivityMaster, DBO.ScreenActivityMaster>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public bool Remove(long id)
    {
        var series = this.FindById(id);
        if (series is not null)
        {
            series.Active = false;
            this.UpdateItem(series);
            return true;
        }

        return false;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }
}
