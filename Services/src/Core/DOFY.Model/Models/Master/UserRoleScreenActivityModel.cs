namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class UserRoleScreenActivityModel : BaseModel<DBO.UserRoleScreenActivity>, IUserRoleScreenActivityModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public UserRoleScreenActivityModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.UserRoleScreenActivity Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.UserRoleScreenActivity, ViewEntities.UserRoleScreenActivity>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.UserRoleScreenActivity> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.UserRoleScreenActivity>, IEnumerable<ViewEntities.UserRoleScreenActivity>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.UserRoleScreenActivity item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserRoleScreenActivity, DBO.UserRoleScreenActivity>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.UserRoleScreenActivity item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserRoleScreenActivity, DBO.UserRoleScreenActivity>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var UserRoleScreenActivity = this.FindById(id);
        if (UserRoleScreenActivity is not null)
        {
            UserRoleScreenActivity.Active = false;
            this.UpdateItem(UserRoleScreenActivity);

            return true;
        }

        return false;
    }

    public long Post(ViewEntities.UserRoleScreenActivity item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserRoleScreenActivity, DBO.UserRoleScreenActivity>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.UserRoleScreenActivity item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserRoleScreenActivity, DBO.UserRoleScreenActivity>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }
}
