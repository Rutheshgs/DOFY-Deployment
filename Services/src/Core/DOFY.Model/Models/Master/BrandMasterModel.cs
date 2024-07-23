namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Cache;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class BrandMasterModel : BaseModel<DBO.BrandMaster>, IBrandMasterModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private new readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public BrandMasterModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.BrandMaster Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.BrandMaster, ViewEntities.BrandMaster>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.BrandMaster> GetList()
    {
        var result = this.FindItems(item => item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandMaster>, IEnumerable<ViewEntities.BrandMaster>>(result);

            return mapperResult;
        }

        return default;
    }

    public long Post(ViewEntities.BrandMaster item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandMaster, DBO.BrandMaster>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.BrandMaster item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandMaster, DBO.BrandMaster>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var BrandMaster = this.FindById(id);

        if (BrandMaster is not null)
        {
            BrandMaster.Active = false;
            this.UpdateItem(BrandMaster);

            return true;
        }

        return false;
    }

    public long Post(ViewEntities.BrandMaster item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandMaster, DBO.BrandMaster>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.BrandMaster item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.BrandMaster, DBO.BrandMaster>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public PagedList<ViewEntities.BrandMaster> GetPagedList(IDataTablesRequest request)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ViewEntities.BrandMaster> GetBrandsByProductTypeId(long productTypeId)
    {
        var result = this.FindItems(item => item.ProductTypeId == productTypeId && item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandMaster>, IEnumerable<ViewEntities.BrandMaster>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.BrandMaster> GetBrandsByProductTypeName(string productTypeName)
    {
        var productType = new ProductTypeModel(this.config, this.mapper, this.iPrincipal, this.context).FindItem(x => x.EnumName.ToLower() == productTypeName.ToLower() && x.Active == true);

        var result = this.FindItems(item => item.ProductTypeId == productType.Id && item.Active == true)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.BrandMaster>, IEnumerable<ViewEntities.BrandMaster>>(result);

            return mapperResult;
        }

        return default;
    }

    public PagedList<BrandMaster> GetBrandMasterList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = this.GetPagedSProcResultWithCriteria<BrandMaster>(criteria, DOFYConstants.DataBase.SP_GetBrandMasterList, param);

        return results;
    }

    public override IEnumerable<DBO.BrandMaster> GetAllItems()
    {
        var result = new ModelVariantModel(this.config, this.mapper, this.iPrincipal, this.context).GetAllItems();

        return this.LoadFromCache ? DOFYCache<DBO.BrandMaster>.GetAllEntities() : this.GetAll();
    }
}
