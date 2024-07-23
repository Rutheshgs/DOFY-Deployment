namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Principal;

public class DashboardElementsModel : BaseModel<DBO.DashboardElements>, IPublicDashboardElementsModel, IDashboardElementsModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public DashboardElementsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public ViewEntities.DashboardElements Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.DashboardElements, ViewEntities.DashboardElements>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<DashboardElements> GetList()
    {
        var results = this.FindItems(item => item.Active == true)?.Where(x => x.EntityTypeId != (long)ENTITY_TYPE_ENUM.HOTSELLING);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.DashboardElements>, IEnumerable<ViewEntities.DashboardElements>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.DashboardElements item, IFormFileCollection files)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.DashboardElements, DBO.DashboardElements>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.DashboardElements item, IFormFileCollection files)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.DashboardElements, DBO.DashboardElements>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Post(ViewEntities.DashboardElements item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.DashboardElements, DBO.DashboardElements>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.DashboardElements item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.DashboardElements, DBO.DashboardElements>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public bool Remove(long id)
    {
        var mapperResult = this.FindById(id);
        if (mapperResult is not null)
        {
            mapperResult.Active = false;
            this.UpdateItem(mapperResult);
            return true;
        }

        return false;
    }

    public IEnumerable<HotSaleViewModel> GetHotSaleVariants()
    {
        var result = this.ExecStoredProcedure<HotSaleViewModel>(DOFYConstants.DataBase.SP_GetHotSaleVariants, null);

        return result;
    }
}
