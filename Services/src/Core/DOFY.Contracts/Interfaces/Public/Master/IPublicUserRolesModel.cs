namespace DOFY.Contracts.Interfaces.Public;

using DOFY.ViewEntities;

public interface IPublicUserRolesModel : IBaseModel<UserRoles>
{

    /// <summary>
    /// Register userRoles .
    /// </summary>
    /// <param name="loginId">criteria.</param>
    ///  <param name="roleId">criteria</param>
    /// <returns>List in UserRoles creation.</returns>
    public long RegisterUserRoles(long loginId, long roleId);

    /// <summary>
    /// GetUser Roles .
    /// </summary>
    /// <param name="loginId">criteria.</param>
    /// <returns>List in UserRoles creation.</returns>
    Task<UserRoles> GetRolesByLoginId(long loginId);
}
