namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.DAL;
using DOFY.Helper;
using DOFY.Helper.Extensions;
using DOFY.Model.Models;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text;

public class OrdersBaseModel<TEntity> : BaseModel<DBO.Orders>, IPublicOrderBaseModel<TEntity>, IOrderBaseModel<TEntity>
                                                                where TEntity : ViewEntities.Orders
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal principal;
    private readonly CountryContext context;

    public OrdersBaseModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.principal = iPrincipal;
        this.context = requestContext;
    }

    public TEntity Get(long id)
    {
        var param = new
        {
            OrderId = id,
        };

        var result = this.ExecStoredProcedureQueryMultiple<Orders, OrderSummaryMapper>(DOFYConstants.DataBase.SP_GetOrderSummary, param);

        return (TEntity)result;
    }

    public Orders GetOrderSummary(long id)
    {
        var param = new
        {
            OrderId = id,
        };

        var result = this.ExecStoredProcedureQueryMultiple<Orders, OrderSummaryMapper>(DOFYConstants.DataBase.SP_GetOrderSummary, param);

        return result;
    }

    public Orders GetOrderSummaryWithTemplate(long id)
    {
        var param = new
        {
            OrderId = id,
        };

        var result = this.ExecStoredProcedureQueryMultiple<Orders, OrderSummaryMapper>(DOFYConstants.DataBase.SP_GetOrderSummary, param);

        if (result?.ModelVariantId > 0)
        {
            var questionResults = this.ExecStoredProcedure<DBO.Questionnaire>(DOFYConstants.DataBase.SP_GetQuestionnaireBasedModelVariantId, new
            {
                ModelVariantId = result?.ModelVariantId,
            });

            if (questionResults?.Count() > 0)
            {
                var questions = new DBO.OrderQuestionnaire()
                {
                    OrderId = questionResults?.FirstOrDefault()?.OrderId,
                    Sections = questionResults,
                };

                var mapperResults = this.mapper.Map<DBO.OrderQuestionnaire, OrderQuestionnaire>(questions);

                result.Questionnaire =  mapperResults;
            }
        }

        return result;
    }

    public IEnumerable<TEntity> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Orders>, IEnumerable<TEntity>>(results);

        return mapperResult;
    }

    public long Post(TEntity item, IFormFileCollection postedFileCollection)
    {
        return this.Post(item);
    }

    public long Post(TEntity item)
    {
        var mapperResult = this.mapper.Map<TEntity, DBO.Orders>(item);
        var utmResult = new UTMLinksModel(this.config, this.mapper, this.principal, this.context).FindItems(x => x.Active == true);

        if (utmResult.Count() > 0)
        {
            foreach (var utm in utmResult)
            {
                if (utm.UTMId == mapperResult.UTMReference)
                {
                    mapperResult.UTMReference = utm.Name;
                }
            }
        }

        mapperResult.Active = true;
        mapperResult.OrderDate = Helper.Extensions.DateTimeExtensions.GetCurrentIST();
        mapperResult.StatusId = (long)STATUS_ENUM.PENDING;
        var orderId = this.AddItem(mapperResult);
        var seed = new ApplicationSeedModel(this.config, this.mapper, this.principal, this.context).UpdateOrderSeed(orderId);

        if (item?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
        {
            var result = new QuestionnaireResponsesModel(this.config, this.mapper, this.principal, this.context).AddQuestionnaire(item?.QuestionnaireResponse, orderId);
            var quoteAmount = this.GetQuotedAmountForOrder(orderId);

            var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(orderId, mapperResult?.StatusId ?? 0, null, quoteAmount);

            var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
            long pendingemailId = emailTemplateModel.OrderPending(item.PersonId ?? 0, item?.ModelVariantId ?? 0, seed, (long)SERVICE_TYPE_ENUM.SELL);
        }
        else if (item?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
        {
            new OrderPartsModel(this.config, this.mapper, this.principal, this.context).AddOrUpdateOrderParts(item?.RepairParts, orderId, mapperResult?.SeriesModelColorId);

            var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(orderId, mapperResult?.StatusId ?? 0, null, item?.Payout?.SuggestedCost);

            var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
            long pendingemailId = emailTemplateModel.OrderPending(item.PersonId ?? 0, item?.SeriesModelId ?? 0, seed, (long)SERVICE_TYPE_ENUM.REPAIR);
        }

        return orderId;
    }

    public Orders ReEvaluteOrder(long id)
    {
        var mapperResult = this.FindItem(x => x.Active == true && x.Id == id);
        if (mapperResult?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
        {
            var exisitingAmount = new OrderPayoutModel(this.config, this.mapper, this.principal, this.context).FindItem(x => x.Active == true && x.OrderId == id);
            var quoteAmount = this.GetQuotedAmountForOrder(id, false, true);
            if (quoteAmount != exisitingAmount.SuggestedCost)
            {
                var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(id, (long)STATUS_ENUM.Modified_Price, null, quoteAmount);
            }

            var result = GetOrderSummary(id);

            return result;
        }

        return default;
    }

    public long Put(TEntity item, IFormFileCollection postedFileCollection)
    {
        return this.Put(item);
    }

    public long Put(TEntity item)
    {
        var mapperResult = this.mapper.Map<TEntity, DBO.Orders>(item);
        mapperResult.StatusId = mapperResult.StatusId > 0 ? mapperResult.StatusId : (long)STATUS_ENUM.PENDING;
        this.UpdateItem(mapperResult);

        if (item?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
        {
            var result = new QuestionnaireResponsesModel(this.config, this.mapper, this.principal, this.context).UpdateQuestionnaire(item.QuestionnaireResponse, item.Id);
            var quoteAmount = this.GetQuotedAmountForOrder(item.Id, true);
        }
        else if (item?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
        {
            new OrderPartsModel(this.config, this.mapper, this.principal, this.context).AddOrUpdateOrderParts(item?.RepairParts, item.Id, mapperResult?.SeriesModelColorId);
        }

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var mapperResult = this.FindById(id);
        if (mapperResult is not null)
        {
            mapperResult.Active = false;
            this.UpdateItem(mapperResult);
            return true;
        }

        return false;
    }

    public PagedList<OrdersViewModel> GetOrdersList(OrderSearchCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
            StatusId = criteria.StatusId ?? null,
            ProductTypeId = criteria.ProductTypeId,
            BrandMasterId = criteria?.BrandMasterId ?? null,
            SeriesModelId = criteria?.SeriesModelId ?? null,
            CityId = criteria?.CityId ?? null,
            ServiceTypeId = criteria?.ServiceTypeId ?? null,
            ReferralCodeId = criteria?.ReferralCodeId ?? null,
            FromDate = criteria?.FromDate ?? null,
            ToDate = criteria?.ToDate ?? null,
            PersonId = criteria?.PersonId ?? null,
            CompletedStartDate = criteria?.CompletedStartDate ?? null,
            CompletedEndDate = criteria?.CompletedEndDate ?? null,
        };

        var results = this.GetPagedSProcResultWithCriteria<OrdersViewModel>(criteria, DOFYConstants.DataBase.SP_GetOrdersList, param);

        return results;
    }

    public async Task<byte[]> ExportOrderCsv(OrderSearchCriteria criteria)
    {
        var results = this.GetOrdersList(criteria);

        // excel should open as default header with no data when data not exist
        if (results == null || results?.Count() == 0)
        {
            results = new PagedList<OrdersViewModel>(new List<OrdersViewModel>() { new OrdersViewModel() }, 1, 1, results?.Count());
        }

        string strOutput = string.Empty;

        strOutput = results.Select(item => new OrderCsv(item)).ExportCsv("Orders");

        byte[] bytes = Encoding.UTF8.GetBytes(strOutput);

        return bytes;
    }

    public long AssignToUser(long orderId, long assigneeId)
    {
        var result = this.FindItem(item => item.Id == orderId);

        if (result is not null && assigneeId > 0)
        {
            result.StatusId = (long)STATUS_ENUM.ASSINGED;
            this.UpdateItem(result);

            new AppointmentModel(this.config, this.mapper, this.principal, this.context).UpdateAssignee(orderId, assigneeId);

            var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(orderId, result?.StatusId ?? 0, assigneeId, null);
        }

        return orderId;
    }

    public long CancelOrderRequest(TEntity order)
    {
        if (order is not null)
        {
            var result = this.FindItem(item => item.Id == order.Id && item.Active == true);

            if (result is not null)
            {
                result.StatusId = (long)STATUS_ENUM.CANCELREQUEST;
                result.CancellationTypeId = order.CancellationTypeId;
                this.UpdateItem(result);

                new AppointmentModel(this.config, this.mapper, this.principal, this.context).UpdateAppointmentAsync(result.Id, order.Remarks);

                var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(order.Id, result?.StatusId ?? 0, null, null, order.Remarks);

                var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
                long pendingemailId = emailTemplateModel.CancelOrderRequest(result.PersonId ?? 0, result.OrderCode);

                return result.Id;
            }
        }

        return default;
    }

    public long Reschedule(Appointment item)
    {
        if (item is not null)
        {
            var result = this.FindItem(orderItem => orderItem.Id == item.OrderId && orderItem.Active == true);

            if (result is not null && result.Id > 0)
            {
                result.StatusId = (long)STATUS_ENUM.RESCHEDULED;
                result.CancellationTypeId = item.ReasonId;
                this.UpdateItem(result);

                return result.Id;
            }
        }

        return default;
    }

    public long AdminReschedule(Appointment item)
    {
        if (item is not null)
        {
            var result = this.FindItem(orderItem => orderItem.Id == item.OrderId && orderItem.Active == true);

            var appointment = new AppointmentModel(this.config, this.mapper, this.principal, this.context).GetAppointmentsByOrderId(item.OrderId);

            if (result is not null && result.Id > 0)
            {
                var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(item.OrderId, (long)STATUS_ENUM.RESCHEDULED, null, null, null, item.StartTime);

                result.StatusId = (long)STATUS_ENUM.RESCHEDULED;
                result.CancellationTypeId = item.ReasonId;
                this.UpdateItem(result);
                var appointmentModel = new AppointmentModel(this.config, this.mapper, this.principal, this.context).Reschedule(item, result.Id);

                var template = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
                long pendingemailId = template.OrderResheduled(result.PersonId ?? 0, result.OrderCode, result.Id);

                if (appointment?.AssigneeId > 0)
                {
                    this.AssignToUser(result.Id, appointment?.AssigneeId ?? 0);
                }

                return result.Id;
            }
        }

        return default;
    }

    public long SaveAppointment(Appointment item)
    {
        if (item is not null)
        {
            var result = this.FindItem(orderItem => orderItem.Id == item.OrderId && orderItem.Active == true);
            var appointment = new AppointmentModel(this.config, this.mapper, this.principal, this.context).GetAppointmentsByOrderId(item.OrderId);

            if (result is not null && result.Id > 0)
            {
                result.StatusId = result.StatusId == (long)STATUS_ENUM.RESCHEDULED ? result.StatusId : (long)STATUS_ENUM.SCHEDULED;
                this.UpdateItem(result);

                var template = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
                if (result.StatusId != (long)STATUS_ENUM.RESCHEDULED)
                {
                    var appointmentModel = new AppointmentModel(this.config, this.mapper, this.principal, this.context).AddOrUpdate(item, result.Id);
                    var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(item.OrderId, result?.StatusId ?? 0, null, null, null, item.StartTime);

                    if (result?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
                    {
                        long pendingemailId = template.OrderPlaced(result.PersonId ?? 0, result?.ModelVariantId ?? 0, (long)SERVICE_TYPE_ENUM.SELL, item, result?.OrderCode);
                    }
                    else if (result?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
                    {
                        long pendingemailId = template.OrderPlaced(result.PersonId ?? 0, result?.SeriesModelId ?? 0, (long)SERVICE_TYPE_ENUM.REPAIR, item, result?.OrderCode);
                    }
                }
                else
                {
                    var appointmentModel = new AppointmentModel(this.config, this.mapper, this.principal, this.context).Reschedule(item, result.Id);

                    var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(item.OrderId, result?.StatusId ?? 0, null, null, null, item.StartTime);

                    if (appointment?.AssigneeId > 0)
                    {
                        this.AssignToUser(result.Id, appointment?.AssigneeId ?? 0);
                    }

                    long pendingemailId = template.OrderResheduled(result.PersonId ?? 0, result.OrderCode, result.Id);
                }

                return result.Id;
            }
        }

        return default;
    }

    public PagedList<OrdersViewModel> GetPersonOrders(PersonOrdersSearchCriteria criteria)
    {
        var param = new
        {
            WhereClause = criteria.SearchText,
            PersonId = criteria.PersonId,
            StatusIds = criteria.StatusIds,
            FromDate = criteria.FromDate,
            ToDate = criteria.ToDate,
        };

        var results = this.GetPagedSProcResultWithCriteria<OrdersViewModel>(criteria, DOFYConstants.DataBase.SP_GetPersonOrders, param);

        return results;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public decimal? GetQuotedAmountForOrder(long orderId, bool isRequote = false, bool isModifiedPrice = false)
    {
        DBO.Orders orders = this.FindItem(orderItem => orderItem.Id == orderId && orderItem.Active == true);
        var orderPayout = new OrderPayoutModel(this.config, this.mapper, this.principal, this.context).GetByOrderId(orderId);
        decimal? result = 0;

        if (orders?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
        {
            var amount = this.ExecStoredProcedure<decimal?>(DOFYConstants.DataBase.SP_GetQuote,
             new
             {
                 OrderId = orderId,
                 IsModifiedPrice = isModifiedPrice
             });

            result = amount?.FirstOrDefault();
        }

        if (isRequote)
        {
            var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
            if (orders?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
            {
                long pendingEmailId = emailTemplateModel.RequoteAmount(orders.PersonId ?? 0, orders.OrderCode, Convert.ToString(result) ?? string.Empty, orders.ModelVariantId ?? 0, Convert.ToString(orderPayout?.SuggestedCost) ?? "0.00", (long)SERVICE_TYPE_ENUM.SELL);
            }
            else if (orders?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
            {
                long pendingEmailId = emailTemplateModel.RequoteAmount(orders.PersonId ?? 0, orders.OrderCode, Convert.ToString(orderPayout?.RequoteAmount) ?? string.Empty, orders?.ModelVariantId ?? 0, Convert.ToString(orderPayout?.SuggestedCost) ?? "0.00", (long)SERVICE_TYPE_ENUM.REPAIR);
            }
        }

        return result;
    }

    public PagedList<OrdersViewModel> GetOrdersByRider(OrdersByRiderSearchCriteria criteria)
    {
        var param = new
        {
            WhereClause = criteria.SearchText,
            PersonId = criteria.PersonId,
            StatusIds = criteria.StatusIds,
            ProductTypeId = criteria.ProductTypeId,
            BrandMasterId = criteria.BrandMasterId,
            SeriesModelId = criteria.SeriesModelId,
        };

        var results = this.GetPagedSProcResultWithCriteria<OrdersViewModel>(criteria, DOFYConstants.DataBase.SP_GetOrdersByRider, param);

        return results;
    }

    public long CancelOrder(RejectOrderViewModel order)
    {
        if (order is not null)
        {
            var result = this.FindItem(item => item.Id == order.OrderId && item.Active == true);

            if (result is not null)
            {
                result.StatusId = (long)STATUS_ENUM.CANCELLED;
                result.CancellationTypeId = order.Reason;
                result.CompletedDate = DateTimeExtensions.GetCurrentIST();

                this.UpdateItem(result);

                new AppointmentModel(this.config, this.mapper, this.principal, this.context).UpdateAppointmentAsyncCancel(result.Id, order.Remarks);

                var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(order.OrderId, result?.StatusId ?? 0, null, null, order.Remarks);

                var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
                long pendingemailId = emailTemplateModel.OrderCancelled(result.PersonId ?? 0, result.OrderCode);

                return result.Id;
            }
        }

        return default;
    }

    public OrderStatsViewModel GetDashboardStats(bool isToday = true)
    {
        var param = new
        {
            PersonId = this.UserId,
            CurrentDate = isToday ? DateTimeExtensions.GetCurrentISTDate() : null,
        };

        var results = this.ExecStoredProcedure<OrderStatsViewModel>(DOFYConstants.DataBase.SP_GetOrderStats, param);

        return results?.FirstOrDefault();
    }

    public async Task<long> ReportDelayAsync(ReportDelayViewModel order)
    {
        DBO.Orders orders = this.FindItem(orderItem => orderItem.Id == order.OrderId && orderItem.Active == true);

        if (orders is not null)
        {
            orders.StatusId = (long)STATUS_ENUM.DELAYED;
            this.UpdateItem(orders);

            await new AppointmentModel(this.config, this.mapper, this.principal, this.context).
                  SaveAppointmentAsync(order.OrderId, order.DelayHours, order.DelayComments);

            var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
            if (orders?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
            {
                long pendingEmailId = emailTemplateModel.ReportDelayEmail(orders.PersonId ?? 0, orders.OrderCode, Convert.ToString(order.DelayHours), orders.ModelVariantId ?? 0, (long)SERVICE_TYPE_ENUM.SELL);
            }
            else if (orders?.ServiceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
            {
                long pendingEmailId = emailTemplateModel.ReportDelayEmail(orders.PersonId ?? 0, orders.OrderCode, Convert.ToString(order.DelayHours), orders.SeriesModelId ?? 0, (long)SERVICE_TYPE_ENUM.REPAIR);
            }

            return await Task.FromResult(orders.Id);
        }

        return default;
    }

    public async Task<long> RejectOrderAsync(RejectOrderViewModel orderEntityAsync)
    {
        DBO.Orders orderEntity = this.FindItem(orderItem => orderItem.Id == orderEntityAsync.OrderId && orderItem.Active == true);
        if (orderEntity is not null)
        {
            return await this.FailOrderProcAsync(orderEntityAsync, orderEntity);
        }

        return default;
    }

    public async Task<long> CallWasNotPickedAsync(TEntity order)
    {
        DBO.Orders orders = this.FindItem(orderItem => orderItem.Id == order.Id && orderItem.Active == true);
        if (orders is not null)
        {
            orders.Remarks = "Call was not Picked";
            this.Update(orders);

            var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
            long pendingEmailId = emailTemplateModel.CallWasNotPickedEmail(orders.PersonId ?? 0, orders.OrderCode);

            return await Task.FromResult(orders.Id);
        }

        return default;
    }

    public async Task<long> RequoteOrder(IEnumerable<QuestionnaireResponses> questionnaireResponses)
    {
        if (questionnaireResponses?.Count() > 0)
        {
            var orderId = questionnaireResponses?.FirstOrDefault()?.OrderId ?? 0;

            var order = this.FindItem(x => x.Id == orderId);

            if (order is not null)
            {
                order.StatusId = (long)STATUS_ENUM.REQUOTE;

                this.UpdateItem(order);
            }

            var questionnaireModel = new QuestionnaireResponsesModel(this.config, this.mapper, this.principal, this.context);
            long requotedOrderId = await questionnaireModel.QuestionnaireUpdateAsync(questionnaireResponses);

            var quoteAmount = this.GetQuotedAmountForOrder(orderId, true);

            var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(order?.Id ?? 0, order?.StatusId ?? 0, null, quoteAmount);
        }

        return await Task.FromResult(questionnaireResponses?.FirstOrDefault()?.OrderId ?? 0);
    }

    public async Task<long> RequoteRepair(IEnumerable<OrderParts> parts)
    {
        if (parts?.Count() > 0)
        {
            var orderPartsModel = new OrderPartsModel(this.config, this.mapper, this.principal, this.context);
            long orderId = parts?.FirstOrDefault()?.OrderId ?? 0;
            var cumulatedAmount = parts?.Sum(x => x.ServiceCharge);

            var order = this.FindItem(x => x.Id == orderId);

            if (order is not null)
            {
                order.StatusId = (long)STATUS_ENUM.REQUOTE;

                this.UpdateItem(order);

                new OrderPayoutModel(this.config, this.mapper, this.principal, this.context).UpdateRequoteAmount(orderId, cumulatedAmount ?? 0);
            }

            var partId = orderPartsModel.FindItems(x => x.OrderId == orderId && x.Active == true)?.FirstOrDefault()?.PartTypeId ?? 0;

            var seriesModelColorId = new PartTypeModel(this.config, this.mapper, this.principal, this.context).FindById(partId)?.SeriesModelColorId;

            orderPartsModel.AddOrUpdateOrderParts(parts, orderId, seriesModelColorId);

            var quoteAmount = this.GetQuotedAmountForOrder(orderId);
        }

        return await Task.FromResult(parts?.FirstOrDefault().OrderId ?? 0);
    }

    public async Task<long> CancelOrderProcAsync(RejectOrderViewModel orderEntityAsync)
    {
        DBO.Orders orderEntity = this.FindItem(orderItem => orderItem.Id == orderEntityAsync.OrderId && orderItem.Active == true);

        if (orderEntity is not null)
        {
            var cancellationType = new CancellationTypeModel(this.config, this.mapper, this.principal, this.context).Get(orderEntityAsync.Reason);
            if (cancellationType?.EntityTypeId == (long)ENTITY_TYPE_ENUM.FAILED_ORDERS)
            {
                return await this.FailOrderProcAsync(orderEntityAsync, orderEntity);
            }
            else
            {
                return await this.CancelOrderProcAsync(orderEntityAsync, orderEntity);
            }
        }

        return default;
    }

    private async Task<long> CancelOrderProcAsync(RejectOrderViewModel orderEntityAsync, DBO.Orders orderEntity)
    {
        orderEntity.CancellationTypeId = orderEntityAsync.Reason;
        orderEntity.StatusId = (long)STATUS_ENUM.CANCELLED;
        orderEntity.CompletedDate = DateTimeExtensions.GetCurrentIST();

        this.UpdateItem(orderEntity);

        new AppointmentModel(this.config, this.mapper, this.principal, this.context).UpdateAppointmentAsync(orderEntity.Id, orderEntityAsync.Remarks);
        var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
        long pendingemailId = emailTemplateModel.OrderCancelled(orderEntity.PersonId ?? 0, orderEntity.OrderCode);

        return await Task.FromResult(pendingemailId);
    }

    private async Task<long> FailOrderProcAsync(RejectOrderViewModel orderEntityAsync, DBO.Orders orderEntity)
    {
        orderEntity.CancellationTypeId = orderEntityAsync.Reason;
        orderEntity.StatusId = (long)STATUS_ENUM.FAILED;
        orderEntity.CompletedDate = DateTimeExtensions.GetCurrentIST();

        this.UpdateItem(orderEntity);

        new OrderPayoutModel(this.config, this.mapper, this.principal, this.context).UpdateCustomerExpectation(orderEntity.Id, orderEntityAsync?.CustomerExpectation ?? 0);

        new AppointmentModel(this.config, this.mapper, this.principal, this.context).UpdateAppointmentAsync(orderEntity.Id, orderEntityAsync.Remarks);

        var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(orderEntity?.Id ?? 0, orderEntity?.StatusId ?? 0, this.UserId, null, orderEntityAsync.Remarks);

        var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
        long pendingemailId = emailTemplateModel.RejectOrderEmail(orderEntity.PersonId ?? 0, orderEntity.OrderCode);

        return await Task.FromResult(pendingemailId);
    }

    public IEnumerable<ReportOrderViewModel> GetReportOrderSummary(long id)
    {
        var param = new
        {
            OrderId = id,
        };

        var results = this.ExecStoredProcedure<ReportOrderViewModel>(DOFYConstants.DataBase.SP_GetInvoiceDetails, param);

        return results;
    }

    public async Task<long> OrderCompleted(long orderId)
    {
        DBO.Orders order = this.FindItem(orderItem => orderItem.Id == orderId && orderItem.Active == true);
        if (order?.StatusId != (long)STATUS_ENUM.FAILED)
        {
            decimal referralAmount = 0;
            if (order?.ReferralCodeId > 0)
            {
                referralAmount = new ReferralCodeModel(this.config, this.mapper, this.principal, this.context).FindById(order.ReferralCodeId ?? 0)?.Amount ?? 0;
            }

            order.StatusId = (long)STATUS_ENUM.COMPLETED;
            order.CompletedDate = DateTimeExtensions.GetCurrentIST();

            this.UpdateItem(order);

            new OrderPayoutModel(this.config, this.mapper, this.principal, this.context).UpdateFinalAmount(orderId);

            var orderPayout = new OrderPayoutModel(this.config, this.mapper, this.principal, this.context).GetByOrderId(orderId);

            var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(orderId, order?.StatusId ?? 0, null, orderPayout?.FinalPaid);

            var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
            long pendingemailId = emailTemplateModel.PaymentSuccessful(orderId, order.PersonId ?? 0, order.OrderCode, orderPayout?.FinalPaid?.ToString(), order.ModelVariantId ?? 0, order.ServiceTypeId ?? 0);

            return await Task.FromResult(order.Id);
        }

        return orderId;
    }

    public async Task<long> RetrieveOrder(long orderId)
    {
        DBO.Orders order = this.FindItem(orderItem => orderItem.Id == orderId && orderItem.Active == true);
        if (order is not null)
        {
            order.StatusId = (long)STATUS_ENUM.SCHEDULED;
            this.UpdateItem(order);

            var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(orderId, order?.StatusId ?? 0, null, null);

            return await Task.FromResult(order.Id);
        }

        return default;
    }

    public async Task<OrderOtpViewModel> GetOrderOTP(long orderId)
    {
        string randomNumber = new AuthModel(this.config, this.mapper, this.principal, this.context).GenerateRandomKey();
        DBO.Orders orders = this.FindItem(item => item.Id == orderId && item.Active == true);
        var emailTemplateModel = new EmailTemplatesModel(this.config, this.mapper, this.principal, this.context);
        long emailTemplateId = await emailTemplateModel.GetEmailTemplateId(DOFYConstants.EmailTemplatesInfo.PAYMENTPROCESS_OTP);
        long vericationId = await new VerificationCodeModel(this.config, this.mapper, this.principal, this.context).OrderOTPRegisterProcessAsync(orderId, orders?.PersonId ?? 0, randomNumber, emailTemplateId);
        long pendingemailId = emailTemplateModel.PaymentOTP(orders?.PersonId ?? 0, randomNumber, orders?.OrderCode);

        OrderOtpViewModel ordersViewModel = new OrderOtpViewModel();
        ordersViewModel.orderId = orderId;
        ordersViewModel.password = string.Empty;
        ordersViewModel.personId = orders?.PersonId;
        ordersViewModel.emailTemplateId = emailTemplateId;

        return await Task.FromResult(ordersViewModel);
    }

    public async Task<bool> ValidateOrderOTP(OrderOtpViewModel orderOtpView)
    {
        var param = new
        {
            orderId = orderOtpView.orderId,
            personId = orderOtpView.personId,
            emailTemplateId = orderOtpView.emailTemplateId,
            VerificationNumber = orderOtpView.password,
        };

        var results = this.ExecStoredProcedure<bool>(DOFYConstants.DataBase.SP_GetVerificationCodeExpirationStatus, param).FirstOrDefault();

        if (results)
        {
            return await this.OrderCompleted(orderOtpView?.orderId ?? 0) > 0 ? true : false;
        }

        return default;
    }

    public async Task<bool> SkipOTP(OrderOtpViewModel orderOtpView)
    {
        var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.principal, this.context).AddHistory(orderOtpView?.orderId ?? 0, (long)STATUS_ENUM.Skip_OTP, orderOtpView?.personId, null);

        return await this.OrderCompleted(orderOtpView?.orderId ?? 0) > 0 ? true : false;
    }

    public long UpdateReferalCode(string code, long orderId)
    {
        if (!string.IsNullOrEmpty(code))
        {
            var order = this.FindById(orderId);

            var referal = new ReferralCodeModel(this.config, this.mapper, this.principal, this.context).FindItem(x => x.Code.ToLower() == code.TrimEnd().ToLower() && x.Active == true);
            order.ReferralCode = code;
            order.ReferralCodeId = referal?.Id;

            this.UpdateItem(order);

            new OrderPayoutModel(this.config, this.mapper, this.principal, this.context).UpdateReferralAmount(orderId, referal?.Amount ?? 0, referal?.Code);
        }

        return orderId;
    }

    public long AddAdjustment(long orderId, decimal amount)
    {
        new OrderPayoutModel(this.config, this.mapper, this.principal, this.context).AddAdjustment(orderId, amount);

        return orderId;
    }

    public OrderPayout GetOrderPayout(long orderId)
    {
        var result = new OrderPayoutModel(this.config, this.mapper, this.principal, this.context).GetByOrderId(orderId);

        return result;
    }
    public async Task<byte[]> ExportProductListCsv(ProductListSearchCriteria criteria)
    {
        var results = this.GetProductList(criteria);

        if (results == null || results?.Count() == 0)
        {
            results = new PagedList<ProductRptViewModel>(new List<ProductRptViewModel>() { new ProductRptViewModel() }, 1, 1, results?.Count());
        }
        string strOutput = string.Empty;
        strOutput = results.Select(item => new ProductListCsv(item)).ExportCsv("ProductLists");
        byte[] bytes = Encoding.UTF8.GetBytes(strOutput);
        return bytes;
    }

    public PagedList<ProductRptViewModel> GetProductList(ProductListSearchCriteria criteria)
    {
        var param = new
        {
            CategoryId = criteria.CategoryId,
            ProductTypeId = criteria.ProductTypeId ?? null,
            BrandMasterId = criteria?.BrandMasterId ?? null,
            SeriesModelId = criteria?.SeriesModelId ?? null,
        };

        var results = this.GetPagedSProcResultWithCriteria<ProductRptViewModel>(criteria, DOFYConstants.DataBase.SP_GetRptProductList, param);

        return results;
    }
}
