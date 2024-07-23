using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Routing;

namespace DOFY.Report.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            //config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.MapHttpAttributeRoutes();

            // define route
            IHttpRoute defaultRoute = config.Routes.CreateRoute("api/{controller}/{id}",
                                                new { id = RouteParameter.Optional }, null);

            // Add route
            config.Routes.Add("DefaultApi", defaultRoute);

        }
    }
}
