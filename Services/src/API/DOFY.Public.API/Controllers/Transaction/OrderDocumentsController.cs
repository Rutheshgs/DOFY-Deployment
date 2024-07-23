namespace DOFY.Public.API.Controllers;

using Microsoft.AspNetCore.Mvc;

[Route("v1/OrderDocuments")]
public class OrderDocumentsController : BaseController<IPublicOrderDocumentsModel, OrderDocuments>
{
    private readonly IOptionsSnapshot<AppConfiguration> appConfiguration;
    private readonly IPublicOrderDocumentsModel publicOrderDocumentsModel;
    private readonly CountryContext requestContext;
    private IMapper mapper;

    public OrderDocumentsController(IOptionsSnapshot<AppConfiguration> iAppConfiguration, IMapper iMapper, IPublicOrderDocumentsModel iPublicOrderDocumentsModel, CountryContext requestContext)
             : base(iPublicOrderDocumentsModel, iAppConfiguration, requestContext: requestContext)
    {
        this.appConfiguration = iAppConfiguration;
        this.mapper = iMapper;
        this.publicOrderDocumentsModel = iPublicOrderDocumentsModel;
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

    [HttpPost]
    [Route("DeleteOrderDocument")]
    public async Task<IActionResult> DeleteOrderDocument([FromQuery] long orderId, [FromQuery] long documentTypeId)
    {
        await this.Contract.DeleteOrderDocumentAsync(orderId, documentTypeId);

        return Ok();
    }
}
