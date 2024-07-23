namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class UserRolesModel : BaseModel<DBO.UserRoles>, IUserRolesModel, IPublicUserRolesModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public UserRolesModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.UserRoles Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.UserRoles, ViewEntities.UserRoles>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.UserRoles> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.UserRoles>, IEnumerable<ViewEntities.UserRoles>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.UserRoles item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserRoles, DBO.UserRoles>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.UserRoles item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserRoles, DBO.UserRoles>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var UserRoles = this.FindById(id);
        if (UserRoles is not null)
        {
            UserRoles.Active = false;
            this.UpdateItem(UserRoles);

            return true;
        }

        return false;
    }

    public long Post(ViewEntities.UserRoles item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserRoles, DBO.UserRoles>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.UserRoles item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserRoles, DBO.UserRoles>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public long RegisterUserRoles(long loginId, long roleId)
    {
        var userRoles = new DBO.UserRoles();
        userRoles.LoginId = loginId;
        userRoles.RoleId = roleId;
        userRoles.Active = true;

        var result = this.AddItem(userRoles);

        return result;
    }

    public long UpdateUserRole(long loginId, long roleId)
    {
        var existingRole = this.FindItem(x => x.LoginId == loginId && x.Active == true);

        if (existingRole is not null)
        {
            existingRole.RoleId = roleId;

            this.UpdateItem(existingRole);
        }
        else
        {
            this.RegisterUserRoles(loginId, roleId);
        }

        return loginId;
    }

    public PagedList<UserRoles> GetUserRolesList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = base.GetPagedSProcResultWithCriteria<UserRoles>(criteria, DOFYConstants.DataBase.SP_GetUserRolesList, param);

        return results;
    }

    public override IEnumerable<DBO.UserRoles> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.UserRoles>(DOFYConstants.DataBase.SP_GetUserRolesList, null);

        return results;
    }

    public async Task<UserRoles> GetRolesByLoginId(long loginId)
    {
        DBO.UserRoles result = this.FindItem(roleItem => roleItem.LoginId == loginId && roleItem.Active == true);

        if (result is not null)
        {
            var mappedResult = this.mapper.Map<DBO.UserRoles, ViewEntities.UserRoles>(result);

            return await Task.FromResult(mappedResult);
        }

        return default;
    }
}
