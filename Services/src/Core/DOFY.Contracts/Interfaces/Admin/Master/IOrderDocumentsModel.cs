namespace DOFY.Contracts;

using DOFY.ViewEntities;

public interface IOrderDocumentsModel : IBaseModel<OrderDocuments>
{
    Task AddOrderDocumentsAsync(OrderDocuments orderDocuments);

    Task<(byte[] fileContent, string fileName)> GetOrderDocumentAsync(long orderId, long documentTypeId);

    Task<string> GetBase64OrderDocument(long orderId, long documentTypeId);

    Task DeleteOrderDocumentAsync(long orderId, long documentTypeId);

    Task<IEnumerable<OrderDocuments>> GetOrderDocumentsAsync(long orderId);
}
