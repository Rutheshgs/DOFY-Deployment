namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class PublicRequestOrderModel : BaseModel<DBO.OrderPublicRequest>, IPublicRequestOrderModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal principal;
    private readonly CountryContext context;

    public PublicRequestOrderModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.principal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.OrderPublicRequest Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.OrderPublicRequest, ViewEntities.OrderPublicRequest>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.OrderPublicRequest> GetList()
    {
        var result = this.FindItems(item => item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.OrderPublicRequest>, IEnumerable<ViewEntities.OrderPublicRequest>>(result);

            return mapperResult;
        }

        return default;
    }

    public long SaveDevice(OrderPublicRequest item)
    {
        var orders = new DBO.Orders();
        orders.ModelVariantId = item.ModelVariantId;
        orders.StatusId = (long)STATUS_ENUM.New_Device;
        orders.PersonId = this.UserId > 0 ? this.UserId : null;
        orders.ModelVariantId = null;

        var orderId = new OrdersModel(this.config, this.mapper, this.principal, this.context).AddItem(orders);

        item.OrderId = orderId;
        var request = this.mapper.Map<ViewEntities.OrderPublicRequest, DBO.OrderPublicRequest>(item);
        request.Active = true;
        request.CityId = null;

        return this.AddItem(request);
    }

    public long SaveLocation(OrderPublicRequest item)
    {
        var orders = new DBO.Orders();
        orders.StatusId = (long)STATUS_ENUM.New_Location;
        orders.PersonId = this.UserId > 0 ? this.UserId : null;

        var orderId = new OrdersModel(this.config, this.mapper, this.principal, this.context).AddItem(orders);

        item.OrderId = orderId;
        var request = this.mapper.Map<ViewEntities.OrderPublicRequest, DBO.OrderPublicRequest>(item);
        request.Active = true;

        return this.AddItem(request);
    }
}