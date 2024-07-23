namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;

public class OrderSpecificationsModel : BaseModel<DBO.OrderSpecifications>, IOrderSpecificationsModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private new readonly IMapper mapper;
    private readonly IPrincipal? iPrincipal;
    private readonly CountryContext context;

    public OrderSpecificationsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal? iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public async Task<long> AddOrderSpecifications(IEnumerable<ViewEntities.OrderSpecifications> specifications)
    {
        if (specifications?.Count() > 0)
        {
            var orderSpecifications = this.mapper.Map<IEnumerable<ViewEntities.OrderSpecifications>, IEnumerable<DBO.OrderSpecifications>>(specifications);
            foreach (var item in orderSpecifications)
            {
                item.Active = true;
                long specificationId = this.AddItem(item);
            }

            return await Task.FromResult(orderSpecifications?.FirstOrDefault()?.OrderId ?? 0);
        }

        return default;
    }

    public ViewEntities.OrderSpecifications Get(long id)
    {
        DBO.OrderSpecifications orderSpecifications = this.FindItem(specificationItem => specificationItem.Id == id && specificationItem.Active == true);

        if (orderSpecifications is not null)
        {
            return this.mapper.Map<DBO.OrderSpecifications, ViewEntities.OrderSpecifications>(orderSpecifications);
        }

        return default;
    }

    public IEnumerable<ViewEntities.OrderSpecifications> GetList()
    {
        IEnumerable<DBO.OrderSpecifications> orderSpecifications = this.FindItems(specificItem => specificItem.Active == true);

        if (orderSpecifications?.Any() ?? false)
        {
            return this.mapper.Map<IEnumerable<DBO.OrderSpecifications>, IEnumerable<ViewEntities.OrderSpecifications>>(orderSpecifications);
        }

        return default;
    }

    public IEnumerable<ViewEntities.OrderSpecifications> GetSpecificationsByOrderId(long orderId)
    {
        IEnumerable<DBO.OrderSpecifications> orderSpecifications = this.FindItems(specificationItem => specificationItem.OrderId == orderId && specificationItem.Active == true);

        if (orderSpecifications?.Count() > 0)
        {
            return this.mapper.Map<IEnumerable<DBO.OrderSpecifications>, IEnumerable<ViewEntities.OrderSpecifications>>(orderSpecifications);
        }

        return default;
    }

    public async Task<long> UpdateOrderSpecifications(IEnumerable<ViewEntities.OrderSpecifications> specifications)
    {
        if (specifications?.Count() > 0)
        {
            var orderSpecifications = this.mapper.Map<IEnumerable<ViewEntities.OrderSpecifications>, IEnumerable<DBO.OrderSpecifications>>(specifications);
            foreach (var item in orderSpecifications)
            {
                if (item?.Id > 0) {
                    this.UpdateItem(item);
                }
                else if (item.Id == 0 && item.Active == true)
                {
                    this.AddItem(item);
                }
            }

            return await Task.FromResult(orderSpecifications?.FirstOrDefault()?.OrderId ?? 0);
        }

        return default;
    }
}
