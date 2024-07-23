namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class RolesModel : BaseModel<DBO.Roles>, IRolesModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public RolesModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }


    public ViewEntities.Roles Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result != null)
        {
            var mapperResult = this.mapper.Map<DBO.Roles, ViewEntities.Roles>(result);

            return mapperResult;
        }

        return default(ViewEntities.Roles);
    }

    public IEnumerable<ViewEntities.Roles> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Roles>, IEnumerable<ViewEntities.Roles>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.Roles item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.Roles, DBO.Roles>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Post(ViewEntities.Roles item)
    {

        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.Roles, DBO.Roles>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.Roles item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.Roles, DBO.Roles>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.Roles item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.Roles, DBO.Roles>(item);
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

    public PagedList<Roles> GetRolesList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = base.GetPagedSProcResultWithCriteria<Roles>(criteria, DOFYConstants.DataBase.SP_GetRolesList, param);

        return results;
    }
}
