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

public class OrderWishListModel : BaseModel<DBO.OrderWishList>, IPublicOrderWishListModel, IOrderWishListModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public OrderWishListModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
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

    public ViewEntities.OrderWishList Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.OrderWishList, ViewEntities.OrderWishList>(result);
            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.OrderWishList> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.OrderWishList>, IEnumerable<ViewEntities.OrderWishList>>(results);
        return mapperResults;
    }

    public long Post(ViewEntities.OrderWishList item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Post(ViewEntities.OrderWishList item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.OrderWishList, DBO.OrderWishList>(item);
            mapperResult.Active = true;
            var result = this.AddItem(mapperResult);
            return result;
        }

        return default;
    }

    public long Put(ViewEntities.OrderWishList item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Put(ViewEntities.OrderWishList item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.OrderWishList, DBO.OrderWishList>(item);
            mapperResult.Active = item.Active ? false : true;
            this.UpdateItem(mapperResult);
            return mapperResult.Id;
        }
        return default;
    }

    public long AddOrUpdate(ViewEntities.OrderWishList item)
    {
        if (item is not null)
        {
            DBO.OrderWishList activeTrue = this.FindItem(it => it.Id == item.Id && it.PersonId == item.PersonId && it.ModelVariantId == item.ModelVariantId && it.ServiceTypeId == item.ServiceTypeId);

            if (activeTrue is not null)
            {
                activeTrue.Active = item.Active ? false : true;
                this.UpdateItem(activeTrue);

                return activeTrue.Id;
            }

            return this.Post(item);
        }

        return default;
    }

    public bool Remove(long id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<OrderWishListViewModel> GetOrderWishList(long PersonId)
    {
        var param = new
        {
            PersonId = PersonId,
        };
        var results = base.ExecStoredProcedure<OrderWishListViewModel>(DOFYConstants.DataBase.SP_GetOrderWishList, param);
        return results;
    }
}
