namespace DOFY.DataMappers;

using AutoMapper;

public class OrderDocumentsModelMapper : ITypeConverter<ViewEntities.OrderDocuments, DBO.OrderDocuments>
{
    public DBO.OrderDocuments Convert(ViewEntities.OrderDocuments source, DBO.OrderDocuments destination, ResolutionContext context)
    {
        return new DBO.OrderDocuments
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
