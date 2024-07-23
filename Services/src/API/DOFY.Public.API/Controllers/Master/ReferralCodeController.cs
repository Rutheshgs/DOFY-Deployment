using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DOFY.Public.API.Controllers
{
    [Route("v1/ReferralCode")]
    [ApiController]
    public class ReferralCodeController : BaseController<IPublicReferralCodeModel, ReferralCode>
    {
        private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
        private readonly IPublicReferralCodeModel ReferralCodeModel;
        private readonly CountryContext requestContext;
        private IMapper mapper;

        public ReferralCodeController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicReferralCodeModel iReferralCodeModel, CountryContext requestContext)
            : base(iReferralCodeModel, iAppConfiguration, requestContext: requestContext)
        {
            this.appConfiguration = iAppConfiguration;
            this.mapper = iMapper;
            this.ReferralCodeModel = iReferralCodeModel;
            this.requestContext = requestContext;
        }

        [HttpPost]
        [Route("GetReferralCode")]
        public async Task<ViewEntities.ReferralCode> GetReferralCode(string referralCode, long personId, long orderId)
        {
            var result = await Task.Run(() =>
            {
                return this.Contract.GetReferralCodeOrders(referralCode, personId, orderId);
            });

            return result;
        }

        [HttpPost]
        [Route("RemoveReferralCode")]
        public async Task<ViewEntities.ReferralCode> RemoveReferralCode(string referralCode, long personId, long orderId)
        {
            var result = await Task.Run(() =>
            {
                return this.Contract.RemoveReferralCode(referralCode, personId, orderId);
            });

            return result;
        }

        [HttpPost]
        [Route("RemoveReferralCodeFromOrder")]
        public async Task<long> RemoveReferralCodeFromOrder(string referralCode, long personId, long orderId)
        {
            var result = await Task.Run(() =>
            {
                return this.Contract.RemoveReferralCodeFromOrder(referralCode, personId, orderId);
            });

            return result;
        }

    }
}
