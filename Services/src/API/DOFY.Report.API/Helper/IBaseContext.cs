﻿namespace DOFY.Report.API.Helper
{
    using System.Net.Http;

    public interface IBaseContext
    {
        /// <summary>
        /// Gets or sets the client.
        /// </summary>
        HttpClient Client { get; }
    }
}