namespace DOFY.Model;

using AutoMapper;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class OrdersRepairModel :OrdersBaseModel<ViewEntities.RepairOrder>
{
    public OrdersRepairModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
                                                                                    : base(iConfig, iMapper, iPrincipal, requestContext)
    {
    }
}
