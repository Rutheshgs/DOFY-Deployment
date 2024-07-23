namespace DOFY.Contracts.Interfaces.Public;

using DOFY.ViewEntities;

public interface IPublicOrderWishListModel : IEntityModel<OrderWishList>
{
    long AddOrUpdate(OrderWishList wishList);

    IEnumerable<OrderWishListViewModel> GetOrderWishList(long PersonId);

}
