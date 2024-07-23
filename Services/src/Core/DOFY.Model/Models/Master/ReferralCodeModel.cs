using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

namespace DOFY.Model
{
    public class ReferralCodeModel : BaseModel<DBO.ReferralCode>, IReferralCodeModel, IPublicReferralCodeModel
    {
        private readonly IOptionsSnapshot<AppConfiguration> config;
        private new readonly IMapper mapper;
        private readonly IPrincipal iPrincipal;
        private readonly CountryContext context;

        public ReferralCodeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
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

        public ReferralCode Get(long id)
        {
            var result = this.FindItem(item => item.Id == id);

            if (result is not null)
            {
                var mapperResult = this.mapper.Map<DBO.ReferralCode, ViewEntities.ReferralCode>(result);

                return mapperResult;
            }

            return default;
        }

        public IEnumerable<ReferralCode> GetList()
        {
            var result = this.FindItems(item => item.Active == true)?.OrderBy(x => x.RowOrder);

            if (result is not null)
            {
                var mapperResult = this.mapper.Map<IEnumerable<DBO.ReferralCode>, IEnumerable<ViewEntities.ReferralCode>>(result);

                return mapperResult;
            }

            return default;
        }

        public long Post(ReferralCode item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ReferralCode, DBO.ReferralCode>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ReferralCode item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ReferralCode, DBO.ReferralCode>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        public long Post(ReferralCode item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ReferralCode, DBO.ReferralCode>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ReferralCode item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.ReferralCode, DBO.ReferralCode>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        public bool Remove(long id)
        {
            var ReferralCode = this.FindById(id);

            if (ReferralCode is not null)
            {
                ReferralCode.Active = false;
                this.UpdateItem(ReferralCode);

                return true;
            }

            return false;
        }

        public PagedList<ReferralCode> GetPagedList(IDataTablesRequest request)
        {
            throw new NotImplementedException();
        }

        public ReferralCode GetReferralCodeOrders(string referralCode, long personId, long orderId)
        {

            var param = new
            {
                referralCode = referralCode,
                personId = personId,
            };

            var result = this.ExecStoredProcedure<ViewEntities.ReferralCode>(DOFYConstants.DataBase.SP_ValidateReferralCode, param)?.FirstOrDefault();

            if (result is not null)
            {
                return result;
            }

            return default;
        }

        public ReferralCode RemoveReferralCode(string referralCode, long personId, long orderId)
        {
            var param = new
            {
                referralCode = referralCode,
                personId = personId,
                OrderId = orderId,
                TransactionDate = Helper.Extensions.DateTimeExtensions.GetCurrentIST()
            };

            var result = this.ExecStoredProcedure<ViewEntities.ReferralCode>(DOFYConstants.DataBase.SP_RemoveReferralCode, param)?.FirstOrDefault();

            if (result is not null)
            {
                return result;
            }

            return default;
        }

        public long RemoveReferralCodeFromOrder(string referralCode, long personId, long orderId)
        {
            var referralCodeResult = this.FindItem(x => x.Active == true && x.Code == referralCode);
            var order = new OrdersModel(this.config, this.mapper, this.principle, this.context);
            var orderPayout = new OrderPayoutModel(this.config, this.mapper, this.principle, this.context);
            var orderHistory = new OrderHistoryModel(this.config, this.mapper, this.principle, this.context);

            if (referralCodeResult is not null)
            {
                var orderResult = order.FindItem(x => x.Active == true && x.Id == orderId && x.PersonId == personId);
                var orderPayoutResult = orderPayout.FindItem(x => x.Active == true && x.OrderId == orderId);

                if (orderPayoutResult is not null)
                {
                    orderPayoutResult.TotalAmount = orderPayoutResult?.TotalAmount - referralCodeResult?.Amount;
                    orderPayoutResult.ReferralAmount = 0;
                    orderPayout.UpdateItem(orderPayoutResult);
                }

                if (orderResult is not null)
                {
                    orderResult.ReferralCodeId = null;
                    orderResult.ReferralCode = null;
                    order.UpdateItem(orderResult);
                }

                orderHistory.AddHistory(orderId, (long)STATUS_ENUM.Referral_Code_Removed, null, (orderPayoutResult.TotalAmount - referralCodeResult.Amount));

                return orderId;
            }

            return default;
        }
    }
}
