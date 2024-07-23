namespace DOFY.DataMappers;

using AutoMapper;

public class PersonReviewEntityMapper : ITypeConverter<DBO.PersonReview, ViewEntities.PersonReview>
{
    public ViewEntities.PersonReview Convert(DBO.PersonReview source, ViewEntities.PersonReview destination, ResolutionContext context)
    {
        return new ViewEntities.PersonReview
        {
            Id = source?.Id ?? 0,
            PersonId = source?.PersonId ?? 0,
            OrderId = source?.OrderId ?? 0,
            ReviewComments = source?.ReviewComments,
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
