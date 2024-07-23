namespace DOFY.Model;

using AutoMapper;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class OrdersSellModel : OrdersBaseModel<ViewEntities.SellOrder>
{
    public OrdersSellModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
                                                                                    : base(iConfig, iMapper, iPrincipal, requestContext)
    {
    }
}
