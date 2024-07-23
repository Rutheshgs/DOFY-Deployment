namespace DOFY.DataMappers;

using AutoMapper;

public class UTMLinksEntityMapper : ITypeConverter<DBO.UTMLinks, ViewEntities.UTMLinks>
{
    public ViewEntities.UTMLinks Convert(DBO.UTMLinks source, ViewEntities.UTMLinks destination, ResolutionContext context)
    {
        return new ViewEntities.UTMLinks
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