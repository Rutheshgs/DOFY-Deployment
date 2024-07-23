namespace DOFY.Contracts;

using DOFY.ViewEntities;

public interface IOrderSpecificationsModel : IBaseModel<OrderSpecifications>
{
    /// <summary>
    /// Submit OrderSpecifications.
    /// </summary>
    /// <param name="specifications">request.</param>
    /// <returns>return Created Id.</returns>
    Task<long> AddOrderSpecifications(IEnumerable<OrderSpecifications> specifications);

    /// <summary>
    /// Submit OrderSpecifications.
    /// </summary>
    /// <param name="orderId">orderId.</param>
    /// <returns>return Created Id.</returns>
    IEnumerable<ViewEntities.OrderSpecifications> GetSpecificationsByOrderId(long orderId);

    /// <summary>
    /// Submit OrderSpecifications.
    /// </summary>
    /// <param name="specifications">request.</param>
    /// <returns>return Created Id.</returns>
    Task<long> UpdateOrderSpecifications(IEnumerable<ViewEntities.OrderSpecifications> specifications);
}
