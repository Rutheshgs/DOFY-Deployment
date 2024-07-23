namespace DOFY.Contracts;

using DOFY.ViewEntities;

public interface IPaymentDetailsModel : IBaseModel<PaymentDetails>
{
    /// <summary>
    /// Submit Payment Datails.
    /// </summary>
    /// <param name="payment">request.</param>
    /// <returns>PaymentDetails id.</returns>
    Task<long> AddPaymentDetailsAsync(PaymentDetails payment);

    /// <summary>
    /// Update Payment Datails.
    /// </summary>
    /// <param name="payment">request.</param>
    /// <returns>PaymentDetails id.</returns>
    Task<long> UpdatePaymentDetailsAsync(PaymentDetails payment);
}
