namespace DOFY.Report.API.Controllers
{
    using CrystalDecisions.CrystalReports.Engine;
    using CrystalDecisions.Shared;
    using DOFY.ReportEntities;
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Web.Http;


    [RoutePrefix("v1/Reports")]
    public class ReportsController : ApiController
    {
        [HttpGet]
        [Route("Invoicereport/{id}")]
        public HttpResponseMessage Invoicereport(long id)
        {
            string reportURL = "sell/GetReportOrderSummary/{0}";
            reportURL = string.Format(reportURL, id);

            var result = this.GetAsync<Orders>(reportURL);

            if (result?.Count() > 0)
            {
                IEnumerable<string> countryCodes = default;
                this.Request?.Headers?.TryGetValues("CountryCode", out countryCodes);
                if (countryCodes?.FirstOrDefault() == "in")
                {
                    return this.GenerateReport(result, "~/Reports", "Receipt_Purchase_New.rpt");
                }
                else
                {
                    return this.GenerateReport(result, "~/Reports", "Receipt_Purchase_uae.rpt");
                }
            }

            return default;
        }

        //[HttpGet]
        //public HttpResponseMessage OrderSummaryreport()
        //{
        //    int id = 125;
        //    string reportURL = "sell/GetReportOrderSummary/{0}";
        //    reportURL = string.Format(reportURL, id);

        //    var result = this.GetAsync<Orders>(reportURL);

        //    if (result?.Count() > 0)
        //    {
        //        return this.GenerateReport(result, "~/Reports", "DOFY_Invoice.rpt");
        //    }

        //    return default;
        //}


        protected IEnumerable<TEntity> GetAsync<TEntity>(string apiURL)
        {
            HttpResponseMessage responseMessage = new HttpResponseMessage();
            try
            {
                string baseAPIURL = Convert.ToString(ConfigurationManager.AppSettings["BaseURL"]);

                IEnumerable<string> languageCodes = default;
                IEnumerable<string> countryCodes = default;
                this.Request?.Headers?.TryGetValues("CountryCode", out countryCodes);
                this.Request?.Headers?.TryGetValues("LanguageCode", out languageCodes);

                HttpClient client = new HttpClient();
                client.Timeout = TimeSpan.FromMinutes(2);
                //client.DefaultRequestHeaders.Add("DBName", GetDBName());
                client.DefaultRequestHeaders.Add("LanguageCode", languageCodes?.FirstOrDefault());
                client.DefaultRequestHeaders.Add("CountryCode", countryCodes?.FirstOrDefault());
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
                    return JsonConvert.DeserializeObject<IEnumerable<TEntity>>(resultString);
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
                        result.Content.Headers.ContentDisposition.FileName = reportName.Replace(".rpt", ".pdf");

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
