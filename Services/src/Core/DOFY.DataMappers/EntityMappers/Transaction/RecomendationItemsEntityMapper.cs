namespace DOFY.DataMappers;

using AutoMapper;

public class RecomendationItemsEntityMapper : ITypeConverter<DBO.RecomendationItems, ViewEntities.RecomendationItems>
{
    public ViewEntities.RecomendationItems Convert(DBO.RecomendationItems source, ViewEntities.RecomendationItems destination, ResolutionContext context)
    {
        return new ViewEntities.RecomendationItems
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
