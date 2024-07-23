namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class ContactUSModel : BaseModel<DBO.ContactUS>, IPublicContactUSModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public ContactUSModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ContactUS Get(long id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ContactUS> GetList()
    {
        throw new NotImplementedException();
    }

    public async Task<long> SubmitContactUS(ContactUS contactUS)
    {
        if (contactUS is not null)
        {
            var template = new EmailTemplatesModel(this.config, this.mapper, this.iPrincipal, this.context);
            long contactUSId = template.ContactUSEmail(contactUS.Name, contactUS.Mobile, contactUS.Email, contactUS.Description);

            return await Task.FromResult(contactUSId);
        }

        return default;
    }

    public DOFY.Helper.ContactUsAddress GetAddress()
    {
        var result = new DOFY.Helper.ContactUsAddress();

        if (this.context.CountryCode == "in" && this.context.LanguageCode == "en")
        {
            result.Address = this.config.Value?.ContactUsAddress_in_en?.Address ?? string.Empty;
            result.Phone = this.config.Value?.ContactUsAddress_in_en?.Phone ?? string.Empty;
            result.Email = this.config.Value?.ContactUsAddress_in_en?.Email ?? string.Empty;
            result.PromotionLinks = this.config.Value?.ContactUsAddress_in_en?.PromotionLinks != null ? this.config.Value?.ContactUsAddress_in_en?.PromotionLinks : null;
        }

        if (this.context.CountryCode == "ae" && this.context.LanguageCode == "en")
        {
            result.Address = this.config.Value?.ContactUsAddress_ae_en?.Address ?? string.Empty;
            result.Phone = this.config.Value?.ContactUsAddress_ae_en?.Phone ?? string.Empty;
            result.Email = this.config.Value?.ContactUsAddress_ae_en?.Email ?? string.Empty;
            result.PromotionLinks = this.config.Value?.ContactUsAddress_ae_en?.PromotionLinks != null ? this.config.Value?.ContactUsAddress_ae_en?.PromotionLinks : null;
        }

        if (this.context.CountryCode == "ae" && this.context.LanguageCode == "ar")
        {
            result.Address = this.config.Value?.ContactUsAddress_ae_ar?.Address ?? string.Empty;
            result.Phone = this.config.Value?.ContactUsAddress_ae_ar?.Phone ?? string.Empty;
            result.Email = this.config.Value?.ContactUsAddress_ae_ar?.Email ?? string.Empty;
            result.PromotionLinks = this.config.Value?.ContactUsAddress_ae_ar?.PromotionLinks != null ? this.config.Value?.ContactUsAddress_ae_ar?.PromotionLinks : null;
        }

        return result;
    }
}
