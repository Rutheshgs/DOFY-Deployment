namespace DOFY.DataMappers;

using AutoMapper;

public class RecomendationItemsModelMapper : ITypeConverter<ViewEntities.RecomendationItems, DBO.RecomendationItems>
{
    public DBO.RecomendationItems Convert(ViewEntities.RecomendationItems source, DBO.RecomendationItems destination, ResolutionContext context)
    {
        return new DBO.RecomendationItems
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            DisplayInList = source?.DisplayInList ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
