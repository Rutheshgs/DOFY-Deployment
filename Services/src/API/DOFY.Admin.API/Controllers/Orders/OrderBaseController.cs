using System.Runtime.InteropServices;

namespace DOFY.Admin.API.Controllers;

[Route("v1/orderBase")]
public class OrderBaseController<TEntity> : BaseController<IOrderBaseModel<TEntity>, TEntity>
                            where TEntity : ViewEntities.Orders, new()
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IOrderBaseModel<TEntity> ordersModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public OrderBaseController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IOrderBaseModel<TEntity> iOrdersModel, CountryContext requestContext)
        : base(iOrdersModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.ordersModel = iOrdersModel;
        this.requestContext = requestContext;
        this.mapper = iMapper;
    }

    [HttpPost]
    [Route("Create")]
    public async Task<long> Create([FromBody] TEntity item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Post(item);
        });

        return result;
    }

    [HttpPost]
    [Route("Edit")]
    public async Task<long> Edit([FromBody] TEntity item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Put(item);
        });

        return result;
    }

    [HttpGet]
    [Route("GetOrderSummary/{id}")]
    public async Task<Orders> GetOrderSummary(int id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetOrderSummary(id);
        });

        return result;
    }

    [HttpGet]
    [Route("GetOrderSummaryWithTemplate/{id}")]
    public async Task<Orders> GetOrderSummaryWithTemplate(int id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetOrderSummaryWithTemplate(id);
        });

        return result;
    }

    [HttpPost("Remove/{id}")]
    public async Task<bool> Remove(long id)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.Remove(id);
        });

        return result;
    }

    [HttpPost]
    [Route("AssignProcess/{orderId}/{AssigneeId}")]
    public async Task<long> AssignProcess(long orderId, long AssigneeId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.AssignToUser(orderId, AssigneeId);
        });

        return result;
    }

    [HttpGet]
    [Route("GetAllOrders")]
    public async Task<IEnumerable<Orders>> GetAllOrders()
    {
        var pagedResult = await Task.Run(() =>
        {
            var result = this.Contract.GetList();

            return result;
        });

        return pagedResult;
    }

    [HttpPost]
    [Route("CreateAppointment")]
    public async Task<long> CreateAppointment([FromBody] Appointment item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.SaveAppointment(item);
        });

        return result;
    }

    [HttpPost]
    [Route("AdminReschedule")]
    public async Task<long> AdminReschedule([FromBody] Appointment item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.AdminReschedule(item);
        });

        return result;
    }


    [HttpPost]
    [Route("GetOrdersByRider")]
    public async Task<PagedList<OrdersViewModel>> PagedOrdersByRider(OrdersByRiderSearchCriteria criteria)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetOrdersByRider(criteria);
        });

        return result;
    }

    [HttpPost]
    [Route("CancelOrder")]
    public async Task<long> CancelOrder(RejectOrderViewModel item)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.CancelOrder(item);
        });

        return result;
    }

    [HttpPost]
    [Route("ReportDelayOrder")]
    public async Task<long> ReportDelayOrder(ReportDelayViewModel item)
    {
        return await this.Contract.ReportDelayAsync(item);
    }

    [HttpPost]
    [Route("RejectOrder")]
    public async Task<long> RejectOrder(RejectOrderViewModel item)
    {
        return await this.Contract.RejectOrderAsync(item);
    }

    [HttpPost]
    [Route("CallNoPicked")]
    public async Task<long> CallNoPicked(TEntity item)
    {
        return await this.Contract.CallWasNotPickedAsync(item);
    }

    [HttpPost]
    [Route("CancelOrReject")]
    public async Task<long> CancelOrReject(RejectOrderViewModel item)
    {
        return await this.Contract.CancelOrderProcAsync(item);
    }

    [HttpPost]
    [Route("OrderCompleted/{orderId}")]
    public async Task<long> OrderCompleted(long orderId)
    {
        return await this.Contract.OrderCompleted(orderId);
    }

    [HttpPost]
    [Route("RetrieveOrder/{orderId}")]
    public async Task<long> RetrieveOrder(long orderId)
    {
        return await this.Contract.RetrieveOrder(orderId);
    }

    [HttpGet]
    [Route("GetOrderOTP/{orderId}")]
    public async Task<OrderOtpViewModel> GetOrderOTP(long orderId)
    {
        return await this.Contract.GetOrderOTP(orderId);
    }

    [HttpPost]
    [Route("ValidateOrderOTP")]
    public async Task<bool> ValidateOrderOTP(OrderOtpViewModel orderOtp)
    {
        return await this.Contract.ValidateOrderOTP(orderOtp);
    }

    [HttpPost]
    [Route("SkipOTP")]
    public async Task<bool> SkipOTP(OrderOtpViewModel orderOtp)
    {
        return await this.Contract.SkipOTP(orderOtp);
    }

    [HttpPost("DownloadOrdersList")]
    public async Task<byte[]> DownloadOrdersList(OrderSearchCriteria criteria)
    {
        var result = await this.Contract.ExportOrderCsv(criteria);

        return result;
    }

    [HttpPost]
    [Route("AddAdjustment")]
    public async Task<long> AddAdjustment(long orderId, decimal amount)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.AddAdjustment(orderId, amount);
        });

        return result;
    }

    [HttpGet]
    [Route("GetOrderPayout")]
    public async Task<OrderPayout> GetOrderPayout(long orderId)
    {
        var result = await Task.Run(() =>
        {
            return this.Contract.GetOrderPayout(orderId);
        });

        return result;
    }

    private JsonResult WriteFileToTempLocation(
                                        string tempFileName,
                                        string fileNameToDownload,
                                        byte[] result)
    {
        string tempAttachmentLocation = Path.Combine(this.appConfiguration.Value.ApplicationConfiguration.AttachmentFilePath, "temp");
        tempAttachmentLocation.CreateDirectoryIfNotExist();

        var path = Path.Combine(tempAttachmentLocation, tempFileName);
        using (FileStream fileStream = new FileStream(path, FileMode.Create, FileAccess.Write))
        {
            fileStream.Write(result, 0, result.Length);
        }

        return new JsonResult(new { tempFileName = tempFileName, excelDownloadFileName = fileNameToDownload });
    }

    [HttpPost("DownloadProductListList")]
    public async Task<byte[]> DownloadProductListList(ProductListSearchCriteria criteria)
    {
        var result = await this.Contract.ExportProductListCsv(criteria);

        return result;
    }
}
