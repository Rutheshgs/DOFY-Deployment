namespace DOFY.Admin.API.Controllers;

using DOFY.Contracts.Interfaces.Public;
using Microsoft.AspNetCore.Mvc;

[Route("v1/OrderDocuments")]
public class OrderDocumentsController : BaseController<IOrderDocumentsModel, OrderDocuments>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IOrderDocumentsModel OrderDocumentsModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public OrderDocumentsController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IOrderDocumentsModel iOrderDocumentsModel, CountryContext requestContext)
             : base(iOrderDocumentsModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.OrderDocumentsModel = iOrderDocumentsModel;
        this.requestContext = requestContext;
    }

    [HttpPost]
    [Route("AddOrderDocument")]
    public async Task<IActionResult> UploadOrderDocuments([FromForm] OrderDocuments orderDocuments)
    {       
        await this.Contract.AddOrderDocumentsAsync(orderDocuments);

        return Ok();
    }

    [HttpGet]
    [Route("GetOrderDocument")]
    public async Task<IActionResult> GetOrderDocument([FromQuery] long orderId, [FromQuery] long documentTypeId)
    {
        (byte[] fileContent, string fileName) = await this.Contract.GetOrderDocumentAsync(orderId, documentTypeId);

        this.Response.Headers.Add("Content-Disposition", "inline;filename=\"" + fileName + "\"");
        return new FileContentResult(fileContent, $"image/{Path.GetExtension(fileName)}");
    }

    [HttpGet]
    [Route("GetBase64OrderDocument")]
    public async Task<string> GetBase64OrderDocument([FromQuery] long orderId, [FromQuery] long documentTypeId)
    {
        var result = await this.Contract.GetBase64OrderDocument(orderId, documentTypeId);
       
        return result;
    }

    [HttpGet]
    [Route("GetOrderDocuments")]
    public async Task<IEnumerable<OrderDocuments>> GetOrderDocuments([FromQuery] long orderId)
    {
       var result = await this.Contract.GetOrderDocumentsAsync(orderId);
       
        return result;
    }

    [HttpPost]
    [Route("DeleteOrderDocument")]
    public async Task<IActionResult> DeleteOrderDocument([FromQuery] long orderId, [FromQuery] long documentTypeId)
    {
        await this.Contract.DeleteOrderDocumentAsync(orderId, documentTypeId);

        return Ok();
    }
}
