namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class ActivityMasterModel : BaseModel<DBO.ActivityMaster>, IActivityMasterModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private new readonly IMapper mapper;
    private readonly IPrincipal? iPrincipal;
    private readonly CountryContext context;

    public ActivityMasterModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal? iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.ActivityMaster Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.ActivityMaster, ViewEntities.ActivityMaster>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.ActivityMaster> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.ActivityMaster>, IEnumerable<ViewEntities.ActivityMaster>>(results);

        return mapperResults;
    }

    public long Post(ViewEntities.ActivityMaster item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ActivityMaster, DBO.ActivityMaster>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Post(ViewEntities.ActivityMaster item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ActivityMaster, DBO.ActivityMaster>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.ActivityMaster item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ActivityMaster, DBO.ActivityMaster>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.ActivityMaster item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ActivityMaster, DBO.ActivityMaster>(item);
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
