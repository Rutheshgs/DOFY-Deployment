namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class SEOModel : BaseModel<DBO.SEO>, IPublicSEOModel, ISEOModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public SEOModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.SEO Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.SEO, ViewEntities.SEO>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.SEO> GetList()
    {
        var result = this.FindItems(item => item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.SEO>, IEnumerable<ViewEntities.SEO>>(result);

            return mapperResult;
        }

        return default;
    }

    public long Post(ViewEntities.SEO item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.SEO, DBO.SEO>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Post(ViewEntities.SEO item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.SEO, DBO.SEO>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.SEO item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.SEO, DBO.SEO>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.SEO item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.SEO, DBO.SEO>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public bool Remove(long id)
    {
        var seo = this.FindById(id);
        if (seo is not null)
        {
            seo.Active = false;
            this.UpdateItem(seo);
            return true;
        }

        return false;
    }

    public override IEnumerable<DBO.SEO> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.SEO>(DOFYConstants.DataBase.SP_GetSEOList, null);

        return results;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ViewEntities.SEO> GetSEOList()
    {
        var results = this.ExecStoredProcedure<ViewEntities.SEO>(DOFYConstants.DataBase.SP_GetSEOList, null);

        return results;
    }

    SEO IPublicSEOModel.GetSEOList(string pageName)
    {
        var result = this.FindItem(item => item.Active == true && item.PageName == pageName);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.SEO, ViewEntities.SEO>(result);

            return mapperResult;
        }

        return default;
    }
}