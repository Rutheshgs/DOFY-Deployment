namespace DOFY.DataMappers;

using AutoMapper;

public class DocumentTypeModelMapper : ITypeConverter<ViewEntities.DocumentType, DBO.DocumentType>
{
    public DBO.DocumentType Convert(ViewEntities.DocumentType source, DBO.DocumentType destination, ResolutionContext context)
    {
        return new DBO.DocumentType
        {
            Id = source?.Id ?? 0,
            EntityTypeId = source?.EntityTypeId ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            DisplayInList = source?.DisplayInList ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
        };
    }
}
