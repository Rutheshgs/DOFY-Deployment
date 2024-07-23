namespace DOFY.DataMappers;

using AutoMapper;

public class PersonDocumentsEntityMapper : ITypeConverter<DBO.PersonDocuments, ViewEntities.PersonDocuments>
{
    public ViewEntities.PersonDocuments Convert(DBO.PersonDocuments source, ViewEntities.PersonDocuments destination, ResolutionContext context)
    {
        return new ViewEntities.PersonDocuments
        {
            Id = source?.Id ?? 0,
            PersonId = source?.PersonId ?? 0,
            DocumentTypeId = source?.DocumentTypeId ?? 0,
            DocumentPath = source?.DocumentPath,
            DocumentNumber = source?.DocumentNumber,
            Expiry = (DateTime)(source?.Expiry),
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
        };
    }
}
