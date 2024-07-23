namespace DOFY.Contracts;

using DOFY.ViewEntities;

public interface IUserRolesModel : IEntityModel<UserRoles>
{
    /// <summary>
    /// GetUser Roles .
    /// </summary>
    /// <param name="loginId">criteria.</param>
    /// <returns>List in UserRoles creation.</returns>
    Task<UserRoles> GetRolesByLoginId(long loginId);
}
