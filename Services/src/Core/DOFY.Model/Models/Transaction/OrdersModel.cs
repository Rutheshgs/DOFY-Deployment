namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Principal;

public class OrdersModel : BaseModel<DBO.Orders>
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public OrdersModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
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

    public ViewEntities.Orders Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Orders, ViewEntities.Orders>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<Orders> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Orders>, IEnumerable<ViewEntities.Orders>>(results);

        return mapperResult;
    }

    public long Post(Orders item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Post(ViewEntities.Orders item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Orders, DBO.Orders>(item);
        mapperResult.Active = true;
        var result = this.AddItem(mapperResult);

        return result;
    }

    public long Put(Orders item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Put(ViewEntities.Orders item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.Orders, DBO.Orders>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
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
}
