namespace DOFY.DataMappers;

using AutoMapper;

public class PersonRatingEntityMapper : ITypeConverter<DBO.PersonRating, ViewEntities.PersonRating>
{
    public ViewEntities.PersonRating Convert(DBO.PersonRating source, ViewEntities.PersonRating destination, ResolutionContext context)
    {
        return new ViewEntities.PersonRating
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            Rating = source?.Rating ?? 0,
            Recomendation = source?.Recomendation ?? 0,
            RecomendationItems = source?.RecomendationItems ,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
