namespace DOFY.Contracts.Interfaces.Public;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IPublicPersonModel : IEntityModel<Person>
{
    /// <summary>
    /// Get Persons.
    /// </summary>
    /// <param name="loginId">request.</param>
    /// <returns> Persons creation.</returns>
    Person GetPersonsByLoginId(long loginId);

    /// <summary>
    /// Get Persons list.
    /// </summary>
    /// <param name="criteria">request.</param>
    /// <returns> Persons creation.</returns>
    public Task<PagedList<Person>> GetPersonList(SearchBaseCriteria criteria);

    /// <summary>
    /// Get Persons.
    /// </summary>
    /// <param name="id">request.</param>
    /// <returns> Persons creation.</returns>
    Users GetUserByPersonId(long id);

    /// <summary>
    /// Get Assignee Details.
    /// </summary>
    /// <param name="personId">assigneeId..</param>
    /// <returns>List in Assignee detail.</returns>
    Task<string> GetBase64ProfileImage(long personId);

    /// <summary>
    /// DeleteUser.
    /// </summary>
    /// <param name="PersonId">request.</param>
    /// <returns> DeleteUser.</returns>
    bool DeleteUser(long PersonId);

    /// <summary>
    /// VerifyUser.
    /// </summary>
    /// <param name="PersonId">request.</param>
    /// <param name="Password">request.</param>
    /// <returns> VerifyUser.</returns>
    bool VerifyUser(long PersonId, string Password);
}
