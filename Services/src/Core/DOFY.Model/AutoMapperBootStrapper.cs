namespace DOFY.Model;

using AutoMapper;
using DataMappers;

public class AutoMapperBootStrapper : Profile
{
    public AutoMapperBootStrapper()
    {
        // Entity Mappers
        this.CreateMap<DBO.VerificationCode, ViewEntities.VerificationCode>().ConvertUsing(new VerificationCodeEntityMapper());
        this.CreateMap<DBO.UserSetting, ViewEntities.UserSetting>().ConvertUsing(new UserSettingEntityMapper());
        this.CreateMap<DBO.UserRoleScreenActivity, ViewEntities.UserRoleScreenActivity>().ConvertUsing(new UserRoleScreenActivityEntityMapper());
        this.CreateMap<DBO.UserRoles, ViewEntities.UserRoles>().ConvertUsing(new UserRolesEntityMapper());
        this.CreateMap<DBO.ServiceType, ViewEntities.ServiceType>().ConvertUsing(new ServiceTypeEntityMapper());
        this.CreateMap<DBO.SeriesModel, ViewEntities.SeriesModel>().ConvertUsing(new SeriesModelEntityMapper());
        this.CreateMap<DBO.ScreenType, ViewEntities.ScreenType>().ConvertUsing(new ScreenTypeEntityMapper());
        this.CreateMap<DBO.ScreenMaster, ViewEntities.ScreenMaster>().ConvertUsing(new ScreenMasterEntityMapper());
        this.CreateMap<DBO.ScreenActivityMaster, ViewEntities.ScreenActivityMaster>().ConvertUsing(new ScreenActivityMasterEntityMapper());
        this.CreateMap<DBO.Roles, ViewEntities.Roles>().ConvertUsing(new RolesEntityMapper());
        this.CreateMap<DBO.QuestionnaireType, ViewEntities.QuestionnaireType>().ConvertUsing(new QuestionnaireTypeEntityMapper());

        this.CreateMap<DBO.UserSetting, ViewEntities.UserSetting>().ConvertUsing(new UserSettingEntityMapper());
        this.CreateMap<DBO.ActivityMaster, ViewEntities.ActivityMaster>().ConvertUsing(new ActivityMasterEntityMapper());
        this.CreateMap<DBO.BrandMaster, ViewEntities.BrandMaster>().ConvertUsing(new BrandMasterEntityMapper());
        this.CreateMap<DBO.BrandSeries, ViewEntities.BrandSeries>().ConvertUsing(new BrandSeriesEntityMapper());
        this.CreateMap<DBO.EmailTemplates, ViewEntities.EmailTemplates>().ConvertUsing(new EmailTemplatesEntityMapper());
        this.CreateMap<DBO.Logins, ViewEntities.Logins>().ConvertUsing(new LoginsEntityMapper());
        this.CreateMap<DBO.ModelVariant, ViewEntities.ModelVariant>().ConvertUsing(new ModelVariantEntityMapper());
        this.CreateMap<DBO.ProductType, ViewEntities.ProductType>().ConvertUsing(new ProductTypeEntityMapper());
        this.CreateMap<DBO.Status, ViewEntities.Status>().ConvertUsing(new StatusEntityMapper());
        this.CreateMap<DBO.Orders, ViewEntities.Orders>().ConvertUsing(new OrdersEntityMapper());
        this.CreateMap<DBO.UserAddress, ViewEntities.UserAddress>().ConvertUsing(new UserAddressEntityMapper());
        this.CreateMap<DBO.Appointment, ViewEntities.Appointment>().ConvertUsing(new AppointmentEntityMapper());
        this.CreateMap<DBO.AddressType, ViewEntities.AddressType>().ConvertUsing(new AddressTypeEntityMapper());
        this.CreateMap<DBO.QuestionnaireTemplate, ViewEntities.QuestionnaireTemplate>().ConvertUsing(new QuestionnaireTemplateEntityMapper());
        this.CreateMap<DBO.AppointmentSlots, ViewEntities.AppointmentSlots>().ConvertUsing(new AppointmentSlotsEntityMapper());
        this.CreateMap<DBO.CancellationType, ViewEntities.CancellationType>().ConvertUsing(new CancellationTypeEntityMapper());
        this.CreateMap<DBO.PaymentDetails, ViewEntities.PaymentDetails>().ConvertUsing(new PaymentDetailsEntityMapper());
        this.CreateMap<DBO.PaymentType, ViewEntities.PaymentType>().ConvertUsing(new PaymentTypeEntityMapper());
        this.CreateMap<DBO.RecomendationItems, ViewEntities.RecomendationItems>().ConvertUsing(new RecomendationItemsEntityMapper());
        this.CreateMap<DBO.OrderParts, ViewEntities.OrderParts>().ConvertUsing(new OrderPartsEntityMapper());
        this.CreateMap<DBO.QuestionnaireResponses, ViewEntities.QuestionnaireResponses>().ConvertUsing(new QuestionnaireResponsesEntityMapper());
        this.CreateMap<DBO.PartType, ViewEntities.PartType>().ConvertUsing(new PartTypeEntityMapper());
        this.CreateMap<DBO.RepairType, ViewEntities.RepairType>().ConvertUsing(new RepairTypeEntityMapper());
        this.CreateMap<DBO.Person, ViewEntities.Person>().ConvertUsing(new PersonEntityMapper());
        this.CreateMap<DBO.PersonRating, ViewEntities.PersonRating>().ConvertUsing(new PersonRatingEntityMapper());
        this.CreateMap<DBO.PersonReview, ViewEntities.PersonReview>().ConvertUsing(new PersonReviewEntityMapper());
        this.CreateMap<DBO.OrderQuestionnaire, ViewEntities.OrderQuestionnaire>().ConvertUsing(new OrderQuestionnaireEntityMapper());
        this.CreateMap<DBO.OrderSpecifications, ViewEntities.OrderSpecifications>().ConvertUsing(new OrderSpecificationsEntityMapper());
        this.CreateMap<DBO.DofyGeo, ViewEntities.DofyGeo>().ConvertUsing(new DofyGeoEntityMapper());
        this.CreateMap<DBO.OrderWishList, ViewEntities.OrderWishList>().ConvertUsing(new OrderWishListEntityMapper());
        this.CreateMap<DBO.SeriesModelColors, ViewEntities.SeriesModelColors>().ConvertUsing(new SeriesModelColorsEntityMapper());
        this.CreateMap<DBO.DashboardElements, ViewEntities.DashboardElements>().ConvertUsing(new DashboardElementsEntityMapper());
        this.CreateMap<DBO.DocumentType, ViewEntities.DocumentType>().ConvertUsing(new DocumentTypeEntityMapper());
        this.CreateMap<DBO.OrderDocuments, ViewEntities.OrderDocuments>().ConvertUsing(new OrderDocumentsEntityMapper());
        this.CreateMap<DBO.Category, ViewEntities.Category>().ConvertUsing(new CategoryEntityMapper());
        this.CreateMap<DBO.DownloadApp, ViewEntities.DownloadApp>().ConvertUsing(new DownloadAppEntityMapper());
        this.CreateMap<DBO.OrderHistory, ViewEntities.OrderHistory>().ConvertUsing(new OrderHistoryEntityMapper());
        this.CreateMap<DBO.SEO, ViewEntities.SEO>().ConvertUsing(new SEOEntityMapper());
        this.CreateMap<DBO.ReferralCode, ViewEntities.ReferralCode>().ConvertUsing(new ReferralCodeEntityMapper());
        this.CreateMap<DBO.OrderPayout, ViewEntities.OrderPayout>().ConvertUsing(new OrderPayoutEntityMapper());
        this.CreateMap<DBO.CurrencyConvertor, ViewEntities.CurrencyConvertor>().ConvertUsing(new CurrencyConvertorEntityMapper());
        this.CreateMap<DBO.OrderPublicRequest, ViewEntities.OrderPublicRequest>().ConvertUsing(new OrderPublicRequestEntityMapper());

        // Master Entity mapper
        this.CreateMap<DBO.MasterModelVariant, DBO.ModelVariant>().ConvertUsing(new MasterModelVariantEntityMapper());
        this.CreateMap<DBO.MasterModelVariant, DBO.SeriesModel>().ConvertUsing(new MasterSeriesModelEntityMapper());
        this.CreateMap<DBO.MasterModelVariant, DBO.BrandSeries>().ConvertUsing(new MasterBrandSeriesEntityMapper());
        this.CreateMap<DBO.MasterModelVariant, DBO.BrandMaster>().ConvertUsing(new MasterBrandMasterEntityMapper());
        this.CreateMap<DBO.MasterModelVariant, DBO.ProductType>().ConvertUsing(new MasterProductTypeEntityMapper());
        this.CreateMap<DBO.UTMLinks, ViewEntities.UTMLinks>().ConvertUsing(new UTMLinksEntityMapper());
        this.CreateMap<DBO.ReportParameter, ViewEntities.ReportParameter>().ConvertUsing(new ReportParameterEntityMapper());
        this.CreateMap<DBO.CarousalBanner, ViewEntities.CarousalBanner>().ConvertUsing(new CarousalBannerEntityMapper());
        this.CreateMap<DBO.AppUpdate, ViewEntities.AppUpdate>().ConvertUsing(new AppUpdateEntityMapper());

        // Model Mappers
        this.CreateMap<ViewEntities.VerificationCode, DBO.VerificationCode>().ConvertUsing(new VerificationCodeModelMapper());
        this.CreateMap<ViewEntities.UserSetting, DBO.UserSetting>().ConvertUsing(new UserSettingModelMapper());
        this.CreateMap<ViewEntities.UserRoleScreenActivity, DBO.UserRoleScreenActivity>().ConvertUsing(new UserRoleScreenActivityModelMapper());
        this.CreateMap<ViewEntities.UserRoles, DBO.UserRoles>().ConvertUsing(new UserRolesModelMapper());
        this.CreateMap<ViewEntities.ServiceType, DBO.ServiceType>().ConvertUsing(new ServiceTypeModelMapper());
        this.CreateMap<ViewEntities.SeriesModel, DBO.SeriesModel>().ConvertUsing(new SeriesModelModelMapper());
        this.CreateMap<ViewEntities.ScreenType, DBO.ScreenType>().ConvertUsing(new ScreenTypeModelMapper());
        this.CreateMap<ViewEntities.ScreenMaster, DBO.ScreenMaster>().ConvertUsing(new ScreenMasterModelMapper());
        this.CreateMap<ViewEntities.ScreenActivityMaster, DBO.ScreenActivityMaster>().ConvertUsing(new ScreenActivityMasterModelMapper());
        this.CreateMap<ViewEntities.Roles, DBO.Roles>().ConvertUsing(new RolesModelMapper());
        this.CreateMap<ViewEntities.QuestionnaireType, DBO.QuestionnaireType>().ConvertUsing(new QuestionnaireTypeModelMapper());

        this.CreateMap<ViewEntities.UserSetting, DBO.UserSetting>().ConvertUsing(new UserSettingModelMapper());
        this.CreateMap<ViewEntities.ActivityMaster, DBO.ActivityMaster>().ConvertUsing(new ActivityMasterModelMapper());
        this.CreateMap<ViewEntities.BrandMaster, DBO.BrandMaster>().ConvertUsing(new BrandMasterModelMapper());
        this.CreateMap<ViewEntities.BrandSeries, DBO.BrandSeries>().ConvertUsing(new BrandSeriesModelMapper());
        this.CreateMap<ViewEntities.EmailTemplates, DBO.EmailTemplates>().ConvertUsing(new EmailTemplatesModelMapper());
        this.CreateMap<ViewEntities.Logins, DBO.Logins>().ConvertUsing(new LoginsModelMapper());
        this.CreateMap<ViewEntities.ModelVariant, DBO.ModelVariant>().ConvertUsing(new ModelVariantModelMapper());
        this.CreateMap<ViewEntities.ProductType, DBO.ProductType>().ConvertUsing(new ProductTypeModelMapper());
        this.CreateMap<ViewEntities.QuestionnaireTemplate, DBO.QuestionnaireTemplate>().ConvertUsing(new QuestionnaireTemplateModelMapper());
        this.CreateMap<ViewEntities.Status, DBO.Status>().ConvertUsing(new StatusModelMapper());
        this.CreateMap<ViewEntities.Orders, DBO.Orders>().ConvertUsing(new OrdersModelMapper());
        this.CreateMap<ViewEntities.Person, DBO.Person>().ConvertUsing(new PersonModelMapper());
        this.CreateMap<ViewEntities.UserAddress, DBO.UserAddress>().ConvertUsing(new UserAddressModelMapper());
        this.CreateMap<ViewEntities.Appointment, DBO.Appointment>().ConvertUsing(new AppointmentModelMapper());
        this.CreateMap<ViewEntities.AddressType, DBO.AddressType>().ConvertUsing(new AddressTypeModelMapper());
        this.CreateMap<ViewEntities.AppointmentSlots, DBO.AppointmentSlots>().ConvertUsing(new AppointmentSlotsModelMapper());
        this.CreateMap<ViewEntities.CancellationType, DBO.CancellationType>().ConvertUsing(new CancellationTypeModelMapper());
        this.CreateMap<ViewEntities.PaymentDetails, DBO.PaymentDetails>().ConvertUsing(new PaymentDetailsModelMapper());
        this.CreateMap<ViewEntities.PaymentType, DBO.PaymentType>().ConvertUsing(new PaymentTypeModelMapper());
        this.CreateMap<ViewEntities.RecomendationItems, DBO.RecomendationItems>().ConvertUsing(new RecomendationItemsModelMapper());
        this.CreateMap<ViewEntities.OrderParts, DBO.OrderParts>().ConvertUsing(new OrderPartsModelMapper());
        this.CreateMap<ViewEntities.QuestionnaireResponses, DBO.QuestionnaireResponses>().ConvertUsing(new QuestionnaireResponsesModelMapper());
        this.CreateMap<ViewEntities.PartType, DBO.PartType>().ConvertUsing(new PartTypeModelMapper());
        this.CreateMap<ViewEntities.RepairType, DBO.RepairType>().ConvertUsing(new RepairTypeModelMapper());
        this.CreateMap<ViewEntities.PersonRating, DBO.PersonRating>().ConvertUsing(new PersonRatingModelMapper());
        this.CreateMap<ViewEntities.PersonReview, DBO.PersonReview>().ConvertUsing(new PersonReviewModelMapper());
        this.CreateMap<ViewEntities.OrderQuestionnaire, DBO.OrderQuestionnaire>().ConvertUsing(new OrderQuestionnaireModelMapper());
        this.CreateMap<ViewEntities.OrderSpecifications, DBO.OrderSpecifications>().ConvertUsing(new OrderSpecificationsModelMapper());
        this.CreateMap<ViewEntities.DofyGeo, DBO.DofyGeo>().ConvertUsing(new DofyGeoModelMapper());
        this.CreateMap<ViewEntities.OrderWishList, DBO.OrderWishList>().ConvertUsing(new OrderWishListModelMapper());
        this.CreateMap<ViewEntities.OrderDocuments, DBO.OrderDocuments>().ConvertUsing(new OrderDocumentsModelMapper());
        this.CreateMap<ViewEntities.SeriesModelColors, DBO.SeriesModelColors>().ConvertUsing(new SeriesModelColorsModelMapper());
        this.CreateMap<ViewEntities.DashboardElements, DBO.DashboardElements>().ConvertUsing(new DashboardElementsModelMapper());
        this.CreateMap<ViewEntities.DocumentType, DBO.DocumentType>().ConvertUsing(new DocumentTypeModelMapper());
        this.CreateMap<ViewEntities.Category, DBO.Category>().ConvertUsing(new CategoryModelMapper());
        this.CreateMap<ViewEntities.DownloadApp, DBO.DownloadApp>().ConvertUsing(new DownloadAppModelMapper());
        this.CreateMap<ViewEntities.OrderHistory, DBO.OrderHistory>().ConvertUsing(new OrderHistoryModelMapper());
        this.CreateMap<ViewEntities.SEO, DBO.SEO>().ConvertUsing(new SEOModelMapper());
        this.CreateMap<ViewEntities.ReferralCode, DBO.ReferralCode>().ConvertUsing(new ReferralCodeModelMapper());
        this.CreateMap<ViewEntities.OrderPayout, DBO.OrderPayout>().ConvertUsing(new OrderPayoutModelMapper());
        this.CreateMap<ViewEntities.UTMLinks, DBO.UTMLinks>().ConvertUsing(new UTMLinksModelMapper());

        this.CreateMap<ViewEntities.ReportParameter, DBO.ReportParameter>().ConvertUsing(new ReportParameterModelMapper());
        this.CreateMap<ViewEntities.CarousalBanner, DBO.CarousalBanner>().ConvertUsing(new CarousalBannerModelMapper());

        this.CreateMap<ViewEntities.CurrencyConvertor, DBO.CurrencyConvertor>().ConvertUsing(new CurrencyConvertorModelMapper());
        this.CreateMap<ViewEntities.OrderPublicRequest, DBO.OrderPublicRequest>().ConvertUsing(new OrderPublicRequestModelMapper());
        this.CreateMap<ViewEntities.AppUpdate, DBO.AppUpdate>().ConvertUsing(new AppUpdateModelMapper());
    }
}
