namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Cache;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class ProductTypeModel : BaseModel<DBO.ProductType>, IProductTypeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public ProductTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.ProductType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.ProductType, ViewEntities.ProductType>(result);
            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.ProductType> GetList()
    {
        var results = this.FindItems(item => item.Active == true)?.OrderBy(x => x.RowOrder);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.ProductType>, IEnumerable<ViewEntities.ProductType>>(results);

        return mapperResults;
    }

    public long Post(ViewEntities.ProductType item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ProductType, DBO.ProductType>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Post(ViewEntities.ProductType item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ProductType, DBO.ProductType>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.ProductType item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ProductType, DBO.ProductType>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.ProductType item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ProductType, DBO.ProductType>(item);
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

    public PagedList<ViewEntities.ProductType> GetProductTypeList(ViewEntities.SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = base.GetPagedSProcResultWithCriteria<ViewEntities.ProductType>(criteria, DOFYConstants.DataBase.SP_GetProductTypeList, param);

        return results;
    }

    public override IEnumerable<DBO.ProductType> GetAllItems()
    {
        var result = new ModelVariantModel(this.config, this.mapper, this.iPrincipal, this.context).GetAllItems();

        return this.LoadFromCache ? DOFYCache<DBO.ProductType>.GetAllEntities() : this.GetAll();
    }
}
