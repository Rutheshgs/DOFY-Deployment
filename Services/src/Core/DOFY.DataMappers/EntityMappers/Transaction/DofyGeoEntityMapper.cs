namespace DOFY.DataMappers;

using AutoMapper;

public class DofyGeoEntityMapper : ITypeConverter<DBO.DofyGeo, ViewEntities.DofyGeo>
{
    public ViewEntities.DofyGeo Convert(DBO.DofyGeo source, ViewEntities.DofyGeo destination, ResolutionContext context)
    {
        return new ViewEntities.DofyGeo
        {
            Id = source?.Id ?? 0,
            Identifier = source?.Identifier ?? 0,
            Name = source?.Name ?? null,
            EnumName = source?.EnumName ?? null,
            Code = source?.Code ?? null,
            Level = source?.Level ?? 0,
            LevelName = source?.LevelName ?? null,
            Parent = source?.Parent ?? 0,
            RowOrder = source?.RowOrder ?? 0,
            DisplayInList = source?.DisplayInList ?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            Parent1 = source?.Parent1 ?? 0,
            SecondLanguage = source?.SecondLanguage ,
            DeliveryDelay = source?.DeliveryDelay ?? 0
        };
    }
}
