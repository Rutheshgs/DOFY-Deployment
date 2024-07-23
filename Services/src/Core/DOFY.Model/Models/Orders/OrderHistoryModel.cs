namespace DOFY.Model;

using AutoMapper;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class OrderHistoryModel : BaseModel<DBO.OrderHistory>
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal principal;
    private readonly CountryContext context;

    public OrderHistoryModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.principal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.OrderHistory Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.OrderHistory, ViewEntities.OrderHistory>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.OrderHistory> GetList()
    {
        var result = this.FindItems(item => item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.OrderHistory>, IEnumerable<ViewEntities.OrderHistory>>(result);

            return mapperResult;
        }

        return default;
    }

    public long AddHistory(long orderId, long statusId, long? assignedTo, decimal? amount, string? comments=null, DateTime? appointmentDate=null)
    {
        var result = new DBO.OrderHistory();
        result.OrderId = orderId;
        result.StatusId = statusId;
        result.AssignedTo = assignedTo;
        result.Amount = amount;
        result.Comments = comments;
        result.AppointmentDate = appointmentDate;
        result.TransactionDate = Helper.Extensions.DateTimeExtensions.GetCurrentIST();
        var id = this.AddItem(result);

        return id;
    }
}