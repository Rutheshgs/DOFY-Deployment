namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class AddressTypeModel : BaseModel<DBO.AddressType>, IAddressTypeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal? iPrincipal;
    private readonly CountryContext context;

    public AddressTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal? iPrincipal = null, CountryContext requestContext = null)
       : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public ViewEntities.AddressType Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.AddressType, ViewEntities.AddressType>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.AddressType> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.AddressType>, IEnumerable<ViewEntities.AddressType>>(results);

        return mapperResults;
    }

    public override IEnumerable<DBO.AddressType> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.AddressType>(DOFYConstants.DataBase.SP_GetAddressTypeList, null);

        return results;
    }

    public long Post(ViewEntities.AddressType item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Put(ViewEntities.AddressType item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Post(ViewEntities.AddressType item)
    {
        throw new NotImplementedException();
    }

    public long Put(ViewEntities.AddressType item)
    {
        throw new NotImplementedException();
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public bool Remove(long id)
    {
        throw new NotImplementedException();
    }
}
