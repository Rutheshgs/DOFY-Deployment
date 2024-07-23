namespace DOFY.Contracts.Interfaces.Public;

using DOFY.ViewEntities;
using System.Threading.Tasks;

public interface IPublicAuthModel : IBaseModel<Logins>
{
    /// <summary>
    /// Get OTP process.
    /// </summary>
    /// <param name="userName">request.</param>
    /// <returns> boolean result creation</returns>
    Task<ViewEntities.Logins> Login(string userName);

    /// <summary>
    /// Chech whether Given credentials are valid or not.
    /// </summary>
    /// <param name="userName">request.</param>
    /// <param name="passWord">passWord.</param>
    /// <returns> boolean result.</returns>
    Task<ViewEntities.Logins> AuthenticateWithOTP(string userName, string passWord);

    /// <summary>
    /// Get Update Password.
    /// </summary>
    /// <param name="username">request.</param>
    /// <param name="updatedPassword">request.</param>
    /// <returns> EncryptedPassword.</returns>
    Task<Logins> ResetPasswordUae(string username, string updatedPassword);

    /// <summary>
    /// Get OTP process.
    /// </summary>
    /// <param name="phoneNumber">request</param>
    /// <returns> boolean result creation</returns>
    Task<ViewEntities.Logins> ForgetPassword(string email);

    /// <summary>
    /// Chech whether Given credentials are valid or not.
    /// </summary>
    /// <param name="userName">request.</param>
    /// <param name="passWord">passWord.</param>
    /// <returns> boolean result.</returns>
    Task<ViewEntities.Logins> AuthenticateWithPassword(string userName, string passWord);

    /// <summary>
    /// Get logins by userName.
    /// </summary>
    /// <param name="userName">request.</param>
    /// <returns> Get logins.</returns>
    Logins GetLoginsDetailsbyUserName(string userName);

    /// <summary>
    /// Get decryptedPassword.
    /// </summary>
    /// <param name="encrytedPassword">request.</param>
    /// <returns> EncryptedPassword.</returns>
    public string DecryptPassword(string encrytedPassword);


    /// <summary>
    /// Get person details
    /// </summary>
    /// <param name="loginId">request.</param>
    /// <returns> person.</returns>
    ViewEntities.Person GetPersonByLoginId(long loginId);

    /// <summary>
    /// Get OTP process.
    /// </summary>
    /// <param name="phoneNumber">request</param>
    /// <returns> result creation</returns>
    Task<ViewEntities.Logins> ResendOTP(string phoneNumber);

    public Task<bool> ValidateUserAsync(string phoneNumber);
}