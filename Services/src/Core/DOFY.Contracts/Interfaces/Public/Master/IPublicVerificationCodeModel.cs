namespace DOFY.Contracts.Interfaces.Public
{
    using DOFY.ViewEntities;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public interface IPublicVerificationCodeModel : IBaseModel<VerificationCode>
    {

        /// <summary>
        /// Get VerificationCode Details.
        /// </summary>
        /// <param name="personId">request.</param>
        /// <returns>Created Id.</returns>
        Task<bool> SubmitVerficationCodeAsync(long personId);

        /// <summary>
        /// Get VerificationCode Details.
        /// </summary>
        /// <param name="personId">request.</param>
        /// <returns>Created Id.</returns>
        ViewEntities.VerificationCode GetVerificationCodeByPersonId(long personId);
    }
}
