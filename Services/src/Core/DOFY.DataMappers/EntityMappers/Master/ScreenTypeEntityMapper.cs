namespace DOFY.DataMappers;

using AutoMapper;

public class ScreenTypeEntityMapper : ITypeConverter<DBO.ScreenType, ViewEntities.ScreenType>
{
    public ViewEntities.ScreenType Convert(DBO.ScreenType source, ViewEntities.ScreenType destination, ResolutionContext context)
    {
        return new ViewEntities.ScreenType
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            Description = source?.Description,
            EnumName = source?.EnumName,
            Icon = source?.Icon,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
        };
    }
}
