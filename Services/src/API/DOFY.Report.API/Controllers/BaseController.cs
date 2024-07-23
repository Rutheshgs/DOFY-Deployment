namespace DOFY.Report.API.Controllers
{
	using System;
	using System.Collections.Generic;
	using System.Configuration;
	using System.IO;
	using System.Linq;
	using System.Net;
	using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
	using System.Web.Http;
	using System.Web.Mvc;
	using CrystalDecisions.CrystalReports.Engine;
	using CrystalDecisions.Shared;
    using DOFY.Report.API.Helper;
    using Newtonsoft.Json;

    public class BaseController : ApiController
    {      
        private readonly IBaseContext baseContext;

        public BaseController(IBaseContext context = null)
        {
            this.baseContext = context;
        }

        public HttpClient Client
        {
            get { return this.baseContext.Client; }
        }


        protected IEnumerable<TEntity> GetAsync<TEntity>(string apiURL)
		{
			HttpResponseMessage responseMessage = new HttpResponseMessage();
			try
			{
				string baseAPIURL = Convert.ToString(ConfigurationManager.AppSettings["BaseURL"]);				

				HttpClient client = new HttpClient();				
				client.Timeout = TimeSpan.FromMinutes(2);
				//client.DefaultRequestHeaders.Add("DBName", GetDBName());
				responseMessage = client.GetAsync(string.Concat(baseAPIURL, apiURL)).Result;

				if (!responseMessage.IsSuccessStatusCode)
				{
					throw new Exception(responseMessage.ReasonPhrase);
				}

				if (typeof(IEnumerable<TEntity>).Equals(typeof(HttpResponseMessage)))
				{
					return (IEnumerable<TEntity>)(object)responseMessage;
				}

				if (responseMessage.IsSuccessStatusCode)
				{
					var resultString = responseMessage.Content.ReadAsStringAsync().Result;
					return MakeMeEnumerable(JsonConvert.DeserializeObject<TEntity>(resultString));
				}

				throw new Exception(responseMessage.ReasonPhrase);
			}
			catch (Exception ex)
			{
				throw ex;
			}

			return default(IEnumerable<TEntity>);
		}

		private IEnumerable<T> MakeMeEnumerable<T>(T Entity)
		{
			yield return Entity;
		}

		protected HttpResponseMessage GenerateReport<TEntity>(IEnumerable<TEntity> item, string reportPath, string reportName)
		{
			if (item != null)
			{
				using (ReportDocument crystalReport = new ReportDocument())
				{

					crystalReport.Load(Path.Combine(System.Web.Hosting.HostingEnvironment.MapPath(reportPath), reportName));
					crystalReport.SetDataSource(item);

					try
					{
						HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
						result.Content = new StreamContent(crystalReport.ExportToStream(ExportFormatType.PortableDocFormat));
						result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
						result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
						result.Content.Headers.ContentLength = crystalReport.ExportToStream(ExportFormatType.PortableDocFormat).Length;
						result.Content.Headers.ContentDisposition.FileName = "Dofy_Invoice.pdf"; ;

						return result;

						//HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
						//response.Content = new StreamContent(crystalReport.ExportToStream(ExportFormatType.PortableDocFormat));
						//response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
						//response.Content.Headers.ContentDisposition.FileName = "Dofy_Invoice.pdf";

						//return response;
					}
					catch (Exception ex)
					{

					}
				}
			}

			return default(HttpResponseMessage);
		}
	}
}
