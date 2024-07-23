namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class UserSettingModel : BaseModel<DBO.UserSetting>, IUserSettingModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public UserSettingModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.UserSetting Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.UserSetting, ViewEntities.UserSetting>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.UserSetting> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.UserSetting>, IEnumerable<ViewEntities.UserSetting>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.UserSetting item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserSetting, DBO.UserSetting>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.UserSetting item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserSetting, DBO.UserSetting>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var UserSetting = this.FindById(id);
        if (UserSetting is not null)
        {
            UserSetting.Active = false;
            this.UpdateItem(UserSetting);

            return true;
        }

        return false;
    }

    public long Post(ViewEntities.UserSetting item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserSetting, DBO.UserSetting>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.UserSetting item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.UserSetting, DBO.UserSetting>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }
}
