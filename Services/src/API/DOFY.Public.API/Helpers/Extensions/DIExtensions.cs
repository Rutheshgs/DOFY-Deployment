namespace DOFY.Public.API.Helpers
{
    using Contracts;
    using DOFY.Contracts.Interfaces;
    using DOFY.Contracts.Interfaces.Public;
    using Model;

    public static class DIExtensions
    {
        public static IServiceCollection RegisterModelDependencies(this IServiceCollection services)
        {
            services.AddScoped<IPublicQuestionnaireTypeModel, QuestionnaireTypeModel>();
            services.AddScoped<IPublicAuthModel, AuthModel>();
            services.AddScoped<IPublicPersonModel, PersonModel>();
            services.AddScoped<IPublicUserAddressModel, UserAddressModel>();
            services.AddScoped<IPublicAppointmentModel, AppointmentModel>();
            services.AddScoped<IPublicAppointmentSlotsModel, AppointmentSlotsModel>();
            services.AddScoped<IPublicQuestionnaireTemplateModel, QuestionnaireTemplateModel>();
            services.AddScoped<IPublicPersonRatingModel, PersonRatingModel>();
            services.AddScoped<IPublicPersonReviewModel, PersonReviewModel>();
            services.AddScoped<IPublicOrderWishListModel, OrderWishListModel>();
            services.AddScoped<IPublicOrderDocumentsModel, OrderDocumentsModel>();
            services.AddScoped<IPublicContactUSModel, ContactUSModel>();
            services.AddScoped<IPublicMasterModel, MasterModel>();
            services.AddScoped<IPublicOrderBaseModel<ViewEntities.Orders>, OrdersBaseModel<ViewEntities.Orders>>();
            services.AddScoped<IPublicOrderBaseModel<ViewEntities.SellOrder>, OrdersBaseModel<ViewEntities.SellOrder>>();
            services.AddScoped<IPublicOrderBaseModel<ViewEntities.RepairOrder>, OrdersBaseModel<ViewEntities.RepairOrder>>();
            services.AddScoped<IPublicDashboardElementsModel, DashboardElementsModel>();
            services.AddScoped<IPublicDownloadAppModel, DownloadAppModel>();
            services.AddScoped<IPublicCarousalBannerModel, CarousalBanner>();
            services.AddScoped<IPublicSEOModel, SEOModel>();
            services.AddScoped<IPublicReferralCodeModel, ReferralCodeModel>();
            services.AddScoped<IPublicRequestOrderModel, PublicRequestOrderModel>();
            services.AddScoped<CountryContext, CountryContextHelper>();           

            return services;
        }
    }
}