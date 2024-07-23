namespace DOFY.Contracts;

using DOFY.ViewEntities;


public interface IVerificationCodeModel : IEntityModel<VerificationCode>
{
    /// <summary>
    /// Register VerificationCode Details.
    /// </summary>
    /// <param name="userId">request.</param>
    /// <param name="verificationCode">request</param>.
    /// <returns>Created Id.</returns>
    long RegisterVerficationCode(long userId, string verificationCode);

    /// <summary>
    /// Get VerificationCode Details.
    /// </summary>
    /// <param name="personId">request.</param>
    /// <returns>Created Id.</returns>
    ViewEntities.VerificationCode GetVerificationCodeByPersonId(long personId);
}