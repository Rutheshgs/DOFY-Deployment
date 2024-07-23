namespace DOFY.DataMappers;

using AutoMapper;

public class UTMLinksModelMapper : ITypeConverter<ViewEntities.UTMLinks, DBO.UTMLinks>
{
    public DBO.UTMLinks Convert(ViewEntities.UTMLinks source, DBO.UTMLinks destination, ResolutionContext context)
    {
        return new DBO.UTMLinks
        {
            Id = source?.Id ?? 0,
            Name = source?.Name ?? null,
            UTMId = source?.UTMId ?? null,
            ThemeColor = source?.ThemeColor ?? null,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}