namespace DOFY.Contracts;

public interface IPublicContactUSModel : IBaseModel<ViewEntities.ContactUS>
{
    /// <summary>
    /// Post ContactUS.
    /// </summary>
    /// <param name="contactUS">request.</param>
    /// <returns> ContactUS creation.</returns>
    Task<long> SubmitContactUS(ViewEntities.ContactUS contactUS);


    /// <summary>
    /// Post ContactUS.
    /// </summary>
    /// <param name="contactUS">request.</param>
    /// <returns> ContactUS creation.</returns>
    DOFY.Helper.ContactUsAddress GetAddress();

}
