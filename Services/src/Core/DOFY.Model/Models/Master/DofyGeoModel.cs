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

public class DofyGeoModel : BaseModel<DBO.DofyGeo>, IDofyGeoModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public DofyGeoModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
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

    public DofyGeo Get(long id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<DofyGeo> GetDofyGeoList()
    {
        var result = this.FindItems(item => item.Active == true && item.Level == (long)LOCATION_ENUM.VILLAGE);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.DofyGeo>, IEnumerable<ViewEntities.DofyGeo>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<DofyGeo> GetDofyGeoListBysearch(long stateId, string searchText)
    {
        var parentIdentifier = this.FindItems(item => item.Level == (long)LOCATION_ENUM.STATE && item.Active == true)?.Where(item => item.Id == stateId)?.FirstOrDefault();
        searchText = !string.IsNullOrEmpty(searchText) ? searchText.ToLower() : string.Empty;
        var result = this.FindItems(item => item.Active == true);

        if (result is not null)
        {
            var villege = result?.Where(item => item.Level == (long)LOCATION_ENUM.VILLAGE && item.Parent1 == parentIdentifier.Identifier && item.Code.ToLower().Contains(searchText))?.DistinctBy(x => x.Name);
            var district = result?.Where(item => item.Level == (long)LOCATION_ENUM.DISTRICT && item.Parent == parentIdentifier.Identifier && item.Name.ToLower().Contains(searchText));

            IEnumerable<DBO.DofyGeo> searchResult = villege?.Count() > 0 ? villege.ToList() : new List<DBO.DofyGeo>();
            if (district?.Count() > 0)
            {
                searchResult = searchResult.Concat(district);
            }

            var filteredResult = searchResult;
            filteredResult = filteredResult?.Count() > 10 ? filteredResult.Take(10) : filteredResult;

            var mapperResult = this.mapper.Map<IEnumerable<DBO.DofyGeo>, IEnumerable<ViewEntities.DofyGeo>>(filteredResult);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<DofyGeo> GetAreaList(long serviceTypeId, long cityId)
    {
        var result = this.FindItems(item => item.Active == true && item.Level == (long)LOCATION_ENUM.VILLAGE && item.Parent == cityId);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.DofyGeo>, IEnumerable<ViewEntities.DofyGeo>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<DofyGeo> GetStateList()
    {
        var result = this.FindItems(item => item.Active == true && item.Level == (long)LOCATION_ENUM.STATE)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.DofyGeo>, IEnumerable<ViewEntities.DofyGeo>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<DofyGeo> GetDistrictList()
    {
        var result = this.FindItems(item => item.Active == true && item.Level == (long)LOCATION_ENUM.DISTRICT)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.DofyGeo>, IEnumerable<ViewEntities.DofyGeo>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<DofyGeo> GetCityList()
    {
        var result = this.FindItems(item => item.Active == true && item.Level == (long)LOCATION_ENUM.DISTRICT)?.OrderBy(x => x.RowOrder);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.DofyGeo>, IEnumerable<ViewEntities.DofyGeo>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<DofyGeo> GetCountryList()
    {
        var result = this.FindItems(item => item.Active == true && item.Level == (long)LOCATION_ENUM.COUNTRY);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.DofyGeo>, IEnumerable<ViewEntities.DofyGeo>>(result);

            return mapperResult;
        }

        return default;
    }

    public override IEnumerable<DBO.DofyGeo> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.DofyGeo>(DOFYConstants.DataBase.SP_GetDofygeoList, null);

        return results;
    }

    public IEnumerable<DofyGeo> GetList()
    {
        throw new NotImplementedException();
    }

    public PagedList<DofyGeo> GetPagedList(IDataTablesRequest request)
    {
        throw new NotImplementedException();
    }

    public long Post(DofyGeo item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Post(DofyGeo item)
    {
        throw new NotImplementedException();
    }

    public long Put(DofyGeo item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Put(DofyGeo item)
    {
        throw new NotImplementedException();
    }

    public bool Remove(long id)
    {
        throw new NotImplementedException();
    }
}
