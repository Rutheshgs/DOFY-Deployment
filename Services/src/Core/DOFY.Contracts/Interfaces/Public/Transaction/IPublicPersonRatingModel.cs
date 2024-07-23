namespace DOFY.Contracts.Interfaces;

using DOFY.ViewEntities;

public interface IPublicPersonRatingModel : IEntityModel<PersonRating>
{
    /// <summary>
    /// Get PersonRating list.
    /// </summary>
    /// <param name="id">criteria.</param>
    /// <returns>List in PersonRating creation.</returns>
    PersonRating GetPersonRating(long PersonId);
}
