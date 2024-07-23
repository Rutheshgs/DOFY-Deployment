namespace DOFY.Contracts;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IPersonModel : IEntityModel<Person>
{
    /// <summary>
    /// Get Persons.
    /// </summary>
    /// <param name="id">request.</param>
    /// <returns> Persons creation.</returns>
    Users GetUserByPersonId(long id);

    /// <summary>
    /// Creates the Entity Information with out IFormFileCollection.
    /// </summary>
    /// <param name="item">Represents an entity to create entity Information.</param>
    /// <returns>EntityItem Id</returns>
    Task<long> PostUser(Users item);

    /// <summary>
    /// Update the Entity Information with out IFormFileCollection.
    /// </summary>
    /// <param name="item">Represents an entity to create entity Information.</param>
    /// <returns>Entity Item Id</returns>
    Task<long> PutUser(Users item);

    /// <summary>
    /// Get Persons.
    /// </summary>
    /// <param name="roleId">request.</param>
    /// <returns> Persons creation.</returns>
    IEnumerable<ViewEntities.Person> GetPersonsByRoleId(long roleId);

    /// <summary>
    /// Get Assignee list.
    /// </summary>
    /// <param name="criteria">criteria.</param>
    /// <returns>List in AssigneeList creation.</returns>
    IEnumerable<Person> GetAssigneeList();

    /// <summary>
    /// Get Assignee Details.
    /// </summary>
    /// <param name="id">assigneeId..</param>
    /// <returns>List in Assignee detail.</returns>
    ViewEntities.AssigneeDetailsViewModel GetAssigneeDetail(long id);

    /// <summary>
    /// Get Assignee Details.
    /// </summary>
    /// <param name="personId">assigneeId..</param>
    /// <returns>List in Assignee detail.</returns>
    Task<(byte[] fileContent, string fileName)> GetUserProfileImage(long personId);

    /// <summary>
    /// Get Assignee Details.
    /// </summary>
    /// <param name="personId">assigneeId..</param>
    /// <returns>List in Assignee detail.</returns>
    Task<string> GetBase64ProfileImage(long personId);

    public Task<PagedList<Person>> GetPersonList(SearchBaseCriteria criteria);
}
