namespace DOFY.Contracts;

using DOFY.ViewEntities;
using System;

public interface IAuthModel : IBaseModel<ViewEntities.Logins>, IDisposable
{
    /// <summary>
    /// Get OTP process.
    /// </summary>
    /// <param name="phoneNumber">request</param>
    /// <returns> boolean result creation</returns>
    Task<ViewEntities.Logins> Login(string phoneNumber);


    /// <summary>
    /// Chech whether Given credentials are valid or not.
    /// </summary>
    /// <param name="phoneNumber">request.</param>
    /// <param name="passWord">request</param>
    /// <returns> boolean result.</returns>
    Task<ViewEntities.Logins> IsAuthenticate(string phoneNumber, string passWord);

    /// <summary>
    /// Chech whether Given credentials are valid or not.
    /// </summary>
    /// <param name="phoneNumber">request.</param>
    /// <param name="passWord">request</param>
    /// <returns> boolean result.</returns>
    Task<ViewEntities.Logins> AuthenticateWithOTP(string phoneNumber, string passWord);

    /// <summary>
    /// Chech whether Given credentials are valid or not.
    /// </summary>
    /// <param name="phoneNumber">request.</param>
    /// <param name="passWord">request</param>
    /// <returns> boolean result.</returns>
    Task<ViewEntities.Logins> AuthenticateWithEmail(string phoneNumber, string passWord);


    /// <summary>
    /// Get person.
    /// </summary>
    /// <param name="loginId">request</param>
    /// <returns> person result.</returns>
    ViewEntities.Person GetPersonByLoginId(long loginId);

    /// <summary>
    /// Get logins by userName.
    /// </summary>
    /// <param name="userName">request.</param>
    /// <returns> Get logins.</returns>
    Logins GetLoginsDetailsbyUserName(string userName);

    /// <summary>
    /// Chech whether Given credentials are valid or not.
    /// </summary>
    /// <param name="userName">userName.</param>
    /// <param name="passWord">passWord.</param>
    /// <returns> boolean result.</returns>
    Task<ViewEntities.Logins> AdminLogin(string userName, string passWord);

    /// <summary>
    /// Get decryptedPassword.
    /// </summary>
    /// <param name="encrytedPassword">request.</param>
    /// <returns> EncryptedPassword.</returns>
    public string DecryptPassword(string encrytedPassword);

    /// <summary>
    /// Get Update Password.
    /// </summary>
    /// <param name="username">request.</param>
    /// <param name="password">request.</param>
    /// <param name="updatedPassword">request.</param>
    /// <returns> EncryptedPassword.</returns>
    Task<Logins> ResetPassword(string username, string password, string updatedPassword);

    /// <summary>
    /// Get OTP process.
    /// </summary>
    /// <param name="phoneNumber">request</param>
    /// <returns> result creation</returns>
    Task<ViewEntities.Logins> ResendOTP(string phoneNumber);

    /// <summary>
    /// Validate Admin User.
    /// </summary>
    /// <param name="phoneNumber">request.</param>
    /// <returns> result true or False.</returns>
    public Task<bool> ValidateUserAsync(string phoneNumber);
}