namespace DOFY.Admin.API;

using DOFY.Logger;
using DOFY.Model;
using DOFY.Admin.API.Filters;
using DOFY.Admin.API.Helpers;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using System.Security.Principal;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    private IMapper mapper { get; set; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        /// Response Cache Method Enable like ETag, Expire
        services.AddHttpCacheHeaders(option =>
        {
            option.MaxAge = 60;
            option.CacheLocation = Marvin.Cache.Headers.CacheLocation.Private;
        }, (validationModel) => { validationModel.MustRevalidate = true; });

        /// IOptionsSnapshot Implementation
        services.AddOptions()
                .Configure<AppConfiguration>(Configuration)
                .AddTransient<IConfiguration>(item => Configuration);

        services.AddCors(c =>
        {
            c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
        });

        /// API Return Response JSON String.
        services.AddControllersWithViews(option =>
        {
            option.Filters.Add(typeof(APIExceptionFilter));
            option.Filters.Add(typeof(APIActionFilter));
        }).AddNewtonsoftJson(option =>
        {
            option.SerializerSettings.ContractResolver = new DefaultContractResolver();
            option.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Include;
            option.SerializerSettings.DefaultValueHandling = Newtonsoft.Json.DefaultValueHandling.Include;
        });

        /// API Documentation Implementation.
        services.AddSwaggerGen(option =>
        {
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 1safsfsdfdfd\"",
            });
            option.AddSecurityRequirement(new OpenApiSecurityRequirement
             {
                 {
                       new OpenApiSecurityScheme
                         {
                             Reference = new OpenApiReference
                             {
                                 Type = ReferenceType.SecurityScheme,
                                 Id = "Bearer"
                             }
                         },
                         new string[] {}
                 }
             });
        });

        /// API Version Implementation.
        services.AddApiVersioning(options =>
        {
            options.ReportApiVersions = true;
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.ApiVersionSelector = new CurrentImplementationApiVersionSelector(options);
            options.DefaultApiVersion = new ApiVersion(1, 0);
            options.ApiVersionReader = ApiVersionReader.Combine(
                                        new MediaTypeApiVersionReader(),
                                        new QueryStringApiVersionReader(),
                                        new HeaderApiVersionReader("api-version"));
        });

        services.AddResponseCompression(option =>
        {
            option.Providers.Add<BrotliCompressionProvider>();
            option.Providers.Add<GzipCompressionProvider>();
        });

        services.AddAuthentication(option =>
        {
            option.DefaultScheme = DOFYConstants.ServiceAuthorizationHeaderScheme;
        }).AddScheme<ServiceAPIAuthOptions, TokenAuthenticationHandler>(DOFYConstants.ServiceAuthorizationHeaderScheme, o => { });

        services.AddScoped<CountryContext, CountryContextHelper>();
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddTransient<IPrincipal>(provider => provider.GetService<IHttpContextAccessor>().HttpContext.User);

        // Configure/Map the Automapper containers
        services.AddAutoMapper(typeof(AutoMapperBootStrapper));     

        services.Configure<FormOptions>(o =>
        {
            o.ValueLengthLimit = int.MaxValue;
            o.MultipartBodyLengthLimit = int.MaxValue;
            o.MemoryBufferThreshold = int.MaxValue;
        });

        services.RegisterModelDependencies();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IOptionsSnapshot<AppConfiguration> appConfiguration, IMapper iMapper)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseResponseCompression();

        app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

        // https://github.com/openiddict/openiddict-core/issues/518
        // And
        // https://github.com/aspnet/Docs/issues/2384#issuecomment-297980490
        ForwardedHeadersOptions forwarOptions = new ForwardedHeadersOptions
        {
            ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
        };

        forwarOptions.KnownNetworks.Clear();
        forwarOptions.KnownProxies.Clear();

        app.UseForwardedHeaders(forwarOptions);

        app.UseHttpsRedirection();

        app.UseHttpCacheHeaders();

        app.UseStaticFiles();

        app.UseRouting();

        app.UseApiVersioning();
        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
        });

        app.UseSwagger();
        app.UseSwaggerUI(option => { option.SwaggerEndpoint("/swagger/v1/swagger.json", "DOFY Admin API V1"); });

        SeriLogger.LoggingConfiguration(Configuration, typeof(Program).Namespace);

        if (appConfiguration?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false)
        {
            MasterEntitiesCache.Init(appConfiguration, iMapper);
        }
    }       
}

public static class JwtSecurityKey
{
    public static SymmetricSecurityKey Create(string secret)
    {
        return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
    }
}
