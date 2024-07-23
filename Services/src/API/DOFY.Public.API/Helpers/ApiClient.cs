﻿namespace DOFY.Public.API
{
    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using DOFY.Helper;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.Options;

    public static class ApiClient
    {
        public static HttpClient GetClient(IConfiguration _AppConfiguration)
        {
            string userCredentials = "anonymous:temp:-1";
            HttpClientHandler handler = new HttpClientHandler();
            var client = new HttpClient(handler)
            {
                BaseAddress = new Uri(_AppConfiguration["ApplicationConfiguration:BaseURL"]),
            };

            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/Json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", userCredentials);

            return client;
        }
    }
}
