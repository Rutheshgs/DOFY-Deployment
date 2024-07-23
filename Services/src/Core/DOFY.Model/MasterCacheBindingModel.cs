namespace DOFY.Model;

using AutoMapper;
using DOFY.Helper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;

public class MasterCacheBindingModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly CountryContext context;

    public MasterCacheBindingModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.context = new CountryContext();
    }

    public IEnumerable<DBO.DofyGeo> GetGeoList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new DofyGeoModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new DofyGeoModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.DocumentType> GetDocumentTypeList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new DocumentTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new DocumentTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.EmailTemplates> GetEmailTemplateList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new EmailTemplatesModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new EmailTemplatesModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.OSType> GetOSTypeList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new OSTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new OSTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.QuestionnaireType> GetQuestionnaireTypeList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new QuestionnaireTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new QuestionnaireTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.ServiceType> GetServiceTypeList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new ServiceTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new ServiceTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.Status> GetStatusList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new StatusModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new StatusModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.AddressType> GetAddressTypeList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new AddressTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new AddressTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.CancellationType> GetCancellationTypeList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new CancellationTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new CancellationTypeModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.RecomendationItems> GetRecomendationItemsList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new RecomendationItemsModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new RecomendationItemsModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.SEO> GetSEOList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new SEOModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new SEOModel(this.config, this.mapper, null, this.context).GetAllItems();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }

    public IEnumerable<DBO.MasterModelVariant> GetModelVariantList()
    {
        this.context.CountryCode = DOFYConstants.India;
        var resultIn = new ModelVariantModel(this.config, this.mapper, null, this.context).UpdateCacheModelVariants();

        resultIn?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.India;
        });

        this.context.CountryCode = DOFYConstants.UAE;
        var resultUAE = new ModelVariantModel(this.config, this.mapper, null, this.context).UpdateCacheModelVariants();

        resultUAE?.AsParallel()?.ForAll(item =>
        {
            item.CountryCode = DOFYConstants.UAE;
        });

        return resultIn?.Count() > 0 ? resultIn?.Concat(resultUAE) : resultUAE;
    }
}