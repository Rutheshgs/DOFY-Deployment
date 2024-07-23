namespace DOFY.DataMappers;

using AutoMapper;

public class PersonRatingModelMapper : ITypeConverter<ViewEntities.PersonRating, DBO.PersonRating>
{
    public DBO.PersonRating Convert(ViewEntities.PersonRating source, DBO.PersonRating destination, ResolutionContext context)
    {
        return new DBO.PersonRating
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            Rating = source?.Rating ?? 0,
            Recomendation = source?.Recomendation ?? 0,
            RecomendationItems = source?.RecomendationItems,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
