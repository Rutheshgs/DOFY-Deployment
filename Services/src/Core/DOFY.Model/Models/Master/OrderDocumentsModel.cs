namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.Helper.Extensions;
using DOFY.UploadHelper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class OrderDocumentsModel : BaseModel<DBO.OrderDocuments>, IPublicOrderDocumentsModel, IOrderDocumentsModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly string filePath;
    private readonly CountryContext context;

    public OrderDocumentsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.filePath = "orders";
        this.context = requestContext;
    }

    public async Task AddOrderDocumentsAsync(ViewEntities.OrderDocuments requestOrderDocument)
    {
        if (this.config?.Value.AWSConfiguration?.EnableS3 == true)
        {
            string filePath = string.Concat(this.filePath, "/", requestOrderDocument.OrdersId, "/", requestOrderDocument.DocumentTypeId);
            IEnumerable<string> filePathList = await new S3ClientHelperService(this.config, this.GetS3FolderName(this.context.CountryCode)).SaveAttachmentsToS3(requestOrderDocument?.UploadFiles, filePath);
        }
        else
        {
            string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                $"{this.filePath}", $"{requestOrderDocument.OrdersId}", $"{requestOrderDocument.DocumentTypeId}");
            IEnumerable<string> filePathList = await requestOrderDocument?.UploadFiles.SaveAttachments(filePath);
        }

        requestOrderDocument.DocumentPath = this.filePath;
        DBO.OrderDocuments orderDocument = this.mapper.Map<ViewEntities.OrderDocuments, DBO.OrderDocuments>(requestOrderDocument);
        orderDocument.Active = true;

        this.AddItem(orderDocument);
    }

    public ViewEntities.OrderDocuments Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.OrderDocuments, ViewEntities.OrderDocuments>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.OrderDocuments> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.OrderDocuments>, IEnumerable<ViewEntities.OrderDocuments>>(results);

        return mapperResults;
    }

    public async Task<(byte[] fileContent, string fileName)> GetOrderDocumentAsync(long orderId, long documentTypeId)
    {
        DBO.OrderDocuments orderDocuments = this.FindItem(item => item.OrdersId == orderId && item.DocumentTypeId == documentTypeId && item.Active == true);
        if (orderDocuments is not null)
        {
            string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                            $"{this.filePath}", $"{orderDocuments.OrdersId}", $"{orderDocuments.DocumentTypeId}", orderDocuments.FileName);

            byte[] fileContent = await File.ReadAllBytesAsync(filePath);

            return (fileContent: fileContent, fileName: orderDocuments?.FileName);
        }

        return default;
    }

    public async Task<string> GetBase64OrderDocument(long orderId, long documentTypeId)
    {
        DBO.OrderDocuments orderDocuments = this.FindItem(item => item.OrdersId == orderId && item.DocumentTypeId == documentTypeId && item.Active == true);

        if (orderDocuments is not null)
        {
            if (this.config?.Value.AWSConfiguration?.EnableS3 == true)
            {
                string filePath = string.Concat(this.filePath, "/", orderDocuments.OrdersId, "/", orderDocuments.DocumentTypeId, '/', orderDocuments.FileName);

                var resultByte = await new S3ClientHelperService(this.config, this.GetS3FolderName(this.context.CountryCode)).FileDownloadAsync(filePath);

                string result = Convert.ToBase64String(resultByte);

                return result;
            }
            else
            {
                string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                               $"{this.filePath}", $"{orderDocuments.OrdersId}", $"{orderDocuments.DocumentTypeId}", orderDocuments.FileName);

                using (System.Drawing.Image image = System.Drawing.Image.FromFile(filePath))
                {
                    using (MemoryStream m = new MemoryStream())
                    {
                        image.Save(m, image.RawFormat);
                        byte[] imageBytes = m.ToArray();
                        var base64String = Convert.ToBase64String(imageBytes);
                        return base64String;
                    }
                }
            }
        }

        return null;
    }

    public async Task<IEnumerable<ViewEntities.OrderDocuments>> GetOrderDocumentsAsync(long orderId)
    {
        IEnumerable<DBO.OrderDocuments> orderDocuments = this.FindItems(item => item.OrdersId == orderId && item.Active == true);
        if (orderDocuments.Count() > 0)
        {
            var mapperResults = this.mapper.Map<IEnumerable<DBO.OrderDocuments>, IEnumerable<ViewEntities.OrderDocuments>>(orderDocuments);

            return mapperResults;
        }

        return default;
    }

    public async Task DeleteOrderDocumentAsync(long orderId, long documentTypeId)
    {
        DBO.OrderDocuments orderDocument = this.FindItem(item => item.OrdersId == orderId && item.DocumentTypeId == documentTypeId && item.Active == true);
        if (orderDocument is not null)
        {
            orderDocument.Active = false;

            this.UpdateItem(orderDocument);
        }
    }
}