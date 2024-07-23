namespace DOFY.Model;

using AutoMapper;
using DOFY.Helper;
using Microsoft.Extensions.Options;

public class MasterEntitiesCache
{
    public static void Init(IOptionsSnapshot<AppConfiguration> config, IMapper mapper)
    {
        new MasterCacheBindingModel(config, mapper).GetGeoList();
        new MasterCacheBindingModel(config, mapper).GetDocumentTypeList();
        new MasterCacheBindingModel(config, mapper).GetEmailTemplateList();
        new MasterCacheBindingModel(config, mapper).GetOSTypeList();
        new MasterCacheBindingModel(config, mapper).GetQuestionnaireTypeList();
        new MasterCacheBindingModel(config, mapper).GetServiceTypeList();
        new MasterCacheBindingModel(config, mapper).GetStatusList();       
        new MasterCacheBindingModel(config, mapper).GetAddressTypeList();
        new MasterCacheBindingModel(config, mapper).GetCancellationTypeList();
        new MasterCacheBindingModel(config, mapper).GetRecomendationItemsList();
        new MasterCacheBindingModel(config, mapper).GetSEOList();
        new MasterCacheBindingModel(config, mapper).GetModelVariantList();
    }
}
