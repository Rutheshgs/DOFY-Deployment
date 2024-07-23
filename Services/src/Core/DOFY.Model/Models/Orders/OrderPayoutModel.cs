using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

namespace DOFY.Model;

public class OrderPayoutModel : BaseModel<DBO.OrderPayout>, IOrderPayoutModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public OrderPayoutModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public ViewEntities.OrderPayout Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.OrderPayout, ViewEntities.OrderPayout>(result);

            return mapperResult;
        }

        return default;
    }

    public ViewEntities.OrderPayout GetByOrderId(long orderId)
    {
        var result = this.FindItem(item => item.OrderId == orderId);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.OrderPayout, ViewEntities.OrderPayout>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.OrderPayout> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.OrderPayout>, IEnumerable<ViewEntities.OrderPayout>>(results);

        return mapperResults;
    }

    public long Post(ViewEntities.OrderPayout item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Post(ViewEntities.OrderPayout item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.OrderPayout, DBO.OrderPayout>(item);
            mapperResult.Active = true;
            var result = this.AddItem(mapperResult);
            return result;
        }

        return default;
    }

    public long Put(ViewEntities.OrderPayout item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Put(ViewEntities.OrderPayout item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.OrderPayout, DBO.OrderPayout>(item);
            mapperResult.Active = item.Active ? false : true;
            this.UpdateItem(mapperResult);
            return mapperResult.Id;
        }

        return default;
    }

    public long UpdateRequoteAmount(long orderId, decimal requoteAmount)
    {
        var result = this.FindItem(item => item.OrderId == orderId);

        if (result is not null)
        {
            result.RequoteAmount = requoteAmount;
            result.TotalAmount = requoteAmount + (result.ReferralAmount > 0 ? result.RequoteAmount : 0);

            this.UpdateItem(result);
        }

        return result?.Id ?? 0;
    }

    public long UpdateCustomerExpectation(long orderId, decimal customerExpectation)
    {
        var result = this.FindItem(item => item.OrderId == orderId);

        if (result is not null)
        {
            result.CustomerExpectation = customerExpectation;

            this.UpdateItem(result);
        }

        return result?.Id ?? 0;
    }

    public long UpdateFinalAmount(long orderId)
    {
        var result = this.FindItem(item => item.OrderId == orderId);

        if (result is not null)
        {
            result.FinalPaid = result?.TotalAmount;

            this.UpdateItem(result);
        }

        return result?.Id ?? 0;
    }

    public long UpdateReferralAmount(long orderId, decimal referralAmount, string referralCode)
    {
        var result = this.FindItem(item => item.OrderId == orderId);

        if (result is not null)
        {
            var amount = (result?.TotalAmount > 0 ? result.TotalAmount : 0) + referralAmount;
            result.ReferralAmount = referralAmount;
            result.TotalAmount = amount;

            this.UpdateItem(result);

            var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.iPrincipal, this.context).AddHistory(orderId, (long)STATUS_ENUM.Referral_Code_Applied, null, amount, "(" + referralCode + " - " + referralAmount + ")");
        }

        return result?.Id ?? 0;
    }

    public long AddAdjustment(long orderId, decimal adjustmentAmount)
    {
        var result = this.FindItem(item => item.OrderId == orderId);

        if (result is not null)
        {
            var baseAmount = result.RequoteAmount > 0 ? result.RequoteAmount : result.SuggestedCost;
            var totalAmount = baseAmount + (result.ReferralAmount > 0 ? result.ReferralAmount : 0);
            var amount = totalAmount + adjustmentAmount;
            result.Adjustment = adjustmentAmount;
            result.TotalAmount = amount;

            this.UpdateItem(result);

            var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.iPrincipal, this.context).AddHistory(orderId, (long)STATUS_ENUM.Adjustment, null, amount, "(" + adjustmentAmount + ")");
        }

        return result?.Id ?? 0;
    }

    public bool Remove(long id)
    {
        throw new NotImplementedException();
    }
}
