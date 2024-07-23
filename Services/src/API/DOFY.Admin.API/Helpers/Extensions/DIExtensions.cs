namespace DOFY.Admin.API.Helpers
{
    using Contracts;
    using DOFY.Contracts.Interfaces;
    using Microsoft.Extensions.DependencyInjection;
    using Model;

    public static class DIExtensions
    {
        public static IServiceCollection RegisterModelDependencies(this IServiceCollection services)
        {
            services.AddScoped<IBrandMasterModel, BrandMasterModel>();
            services.AddScoped<IBrandSeriesModel, BrandSeriesModel>();
            services.AddScoped<IProductTypeModel, ProductTypeModel>();
            services.AddScoped<ISeriesModelModel, SeriesModelModel>();
            services.AddScoped<IModelVariantModel, ModelVariantModel>();
            services.AddScoped<IQuestionnaireTypeModel, QuestionnaireTypeModel>();
            services.AddScoped<IServiceTypeModel, ServiceTypeModel>();
            services.AddScoped<IPersonModel, PersonModel>();
            services.AddScoped<ILoginsModel, LoginsModel>();
            services.AddScoped<IAuthModel, AuthModel>();
            services.AddScoped<IQuestionnaireTemplateModel, QuestionnaireTemplateModel>();
            services.AddScoped<IRepairTypeModel, RepairTypeModel>();
            services.AddScoped<IAppointmentSlotsModel, AppointmentSlotsModel>();
            services.AddScoped<IAddressTypeModel, AddressTypeModel>();
            services.AddScoped<IOrderBaseModel<ViewEntities.Orders>, OrdersBaseModel<ViewEntities.Orders>>();
            services.AddScoped<IOrderBaseModel<ViewEntities.SellOrder>, OrdersSellModel>();
            services.AddScoped<IOrderBaseModel<ViewEntities.RepairOrder>, OrdersRepairModel>();
            services.AddScoped<IMasterModel, MasterModel>();
            services.AddScoped<IOrderDocumentsModel, OrderDocumentsModel>();
            services.AddScoped<IOrderSpecificationsModel, OrderSpecificationsModel>();
            services.AddScoped<IDashboardElementsModel, DashboardElementsModel>();
            services.AddScoped<IPaymentDetailsModel, PaymentDetailsModel>();
            services.AddScoped<ISEOModel, SEOModel>();
            services.AddScoped<CountryContext, CountryContextHelper>();
            services.AddScoped<ICurrencyConvertorModel,CurrencyConvertorModel>();




            return services;
        }
    }
}