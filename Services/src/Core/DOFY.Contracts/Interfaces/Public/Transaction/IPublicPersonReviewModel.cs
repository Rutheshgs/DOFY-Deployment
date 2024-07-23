namespace DOFY.Contracts.Interfaces;

using DOFY.ViewEntities;

public interface IPublicPersonReviewModel : IEntityModel<PersonReview>
{
    /// <summary>
    /// Get PersonReview list.
    /// </summary>
    /// <param name="id">criteria.</param>
    /// <returns>List in PersonReview creation.</returns>
    PersonReview GetPersonReview(long OrderId);
}
