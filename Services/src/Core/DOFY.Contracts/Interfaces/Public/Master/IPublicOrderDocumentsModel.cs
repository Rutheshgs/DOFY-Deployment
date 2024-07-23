namespace DOFY.Contracts.Interfaces.Public;

using DOFY.ViewEntities;

public interface IPublicOrderDocumentsModel : IBaseModel<OrderDocuments>
{
    Task AddOrderDocumentsAsync(OrderDocuments orderDocuments);

    Task<(byte[] fileContent, string fileName)> GetOrderDocumentAsync(long orderId, long documentTypeId);

    Task DeleteOrderDocumentAsync(long orderId, long documentTypeId);
}
