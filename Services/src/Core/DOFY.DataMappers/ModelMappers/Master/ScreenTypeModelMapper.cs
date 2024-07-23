namespace DOFY.DataMappers;

using AutoMapper;

public class ScreenTypeModelMapper : ITypeConverter<ViewEntities.ScreenType, DBO.ScreenType>
{
    public DBO.ScreenType Convert(ViewEntities.ScreenType source, DBO.ScreenType destination, ResolutionContext context)
    {
        return new DBO.ScreenType
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
