namespace DOFY.ViewEntities
{
    using DOFY.Helper;

    public class SellOrder: Orders
    {
        public SellOrder()
        {
            this.ServiceTypeId = (long)SERVICE_TYPE_ENUM.SELL;
        }
    }
}
