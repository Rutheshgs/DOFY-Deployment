namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class PaymentDetailsModel : BaseModel<DBO.PaymentDetails>, IPaymentDetailsModel

{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public PaymentDetailsModel(IOptionsSnapshot<AppConfiguration> _AppConfiguration, IMapper _iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
       : base(_AppConfiguration, _iMapper, iPrincipal, GetConnectionString(requestContext, _AppConfiguration?.Value.DatabaseConfiguration), requestContext)
    {
        this.appConfiguration = _AppConfiguration;
        this.mapper = _iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = _AppConfiguration.Value.ApplicationConfiguration.MasterDataFromCache;
        this.context = requestContext;
    }

    public async Task<long> AddPaymentDetailsAsync(ViewEntities.PaymentDetails payment)
    {
        DBO.PaymentDetails paymentDetails = this.mapper.Map<ViewEntities.PaymentDetails, DBO.PaymentDetails>(payment);

        if (paymentDetails is not null)
        {
            paymentDetails.Active = true;
            long paymentId = this.AddItem(paymentDetails);

            return await Task.FromResult(paymentId);
        }

        return default;
    }

    public ViewEntities.PaymentDetails Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.PaymentDetails, ViewEntities.PaymentDetails>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.PaymentDetails> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.PaymentDetails>, IEnumerable<ViewEntities.PaymentDetails>>(results);

        return mapperResults;
    }

    public async Task<long> UpdatePaymentDetailsAsync(ViewEntities.PaymentDetails payment)
    {
        DBO.PaymentDetails paymentDetails = this.mapper.Map<ViewEntities.PaymentDetails, DBO.PaymentDetails>(payment);

        if (paymentDetails is not null)
        {
            paymentDetails.Active = true;
            this.UpdateItem(paymentDetails);

            return await Task.FromResult(paymentDetails.Id);
        }

        return default;
    }
}
