namespace DOFY.ViewEntities
{
    public class PublicRequestOrder : EntityBase
    {

        public Orders Order { get; set; } = new Orders();

        public OrderPublicRequest OrderRequest { get; set; } = new OrderPublicRequest();
    }
}
