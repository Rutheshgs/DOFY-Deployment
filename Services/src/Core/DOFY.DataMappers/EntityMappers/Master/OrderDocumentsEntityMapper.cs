namespace DOFY.DataMappers;

using AutoMapper;

public class OrderDocumentsEntityMapper : ITypeConverter<DBO.OrderDocuments, ViewEntities.OrderDocuments>
{
    public ViewEntities.OrderDocuments Convert(DBO.OrderDocuments source, ViewEntities.OrderDocuments destination, ResolutionContext context)
    {
        return new ViewEntities.OrderDocuments
        {
            Id = source?.Id ?? 0,
            OrdersId = source?.OrdersId ?? 0,
            DocumentTypeId = source?.DocumentTypeId ?? 0,
            DocumentPath = source?.DocumentPath, 
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Specifics = source?.Specifics ?? 0,
            FileName = source?.FileName,
            Active = source?.Active ?? true,
        };
    }
}
