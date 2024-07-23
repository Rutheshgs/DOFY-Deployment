namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Principal;

public class StatusModel : BaseModel<DBO.Status>
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public StatusModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public Status Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Status, ViewEntities.Status>(result);
            return mapperResult;
        }

        return default;
    }

    public IEnumerable<Status> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Status>, IEnumerable<ViewEntities.Status>>(results);

        return mapperResult;
    }

    public long Post(Status item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Post(Status item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.Status, DBO.Status>(item);
            mapperResult.Active = true;
            var result = this.AddItem(mapperResult);

            return result;
        }

        return default;
    }

    public long Put(Status item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Put(Status item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.Status, DBO.Status>(item);
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

    public PagedList<Status> GetStatusList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = base.GetPagedSProcResultWithCriteria<Status>(criteria, DOFYConstants.DataBase.SP_GetStatusList, param);

        return results;
    }

    public override IEnumerable<DBO.Status> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.Status>(DOFYConstants.DataBase.SP_GetStatusList, null);

        return results;
    }

    public IEnumerable<Status> GetStatusToDisplayList()
    {
        var results = this.FindItems(item => item.Active == true &&  item.DisplayInList == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Status>, IEnumerable<ViewEntities.Status>>(results);

        return mapperResult;
    }

}
