using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace DOFY.Report.API.Controllers
{
    public static class HttpResponseHelper
    {
        public static HttpResponseMessage SendByteArrayAsAttachment(this byte[] byteContent, string fileName)
        {
            if (byteContent == null || byteContent.Length == 0)
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }

            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.BufferOutput = true;

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new ByteArrayContent(byteContent);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentLength = byteContent.Length;
            result.Content.Headers.ContentDisposition.FileName = fileName;

            return result;
        }
    }
}