namespace DOFY.ViewEntities
{
    using DOFY.Helper;

    public class RepairOrder : Orders
    {
        public RepairOrder()
        {
            this.ServiceTypeId = (long)SERVICE_TYPE_ENUM.REPAIR;
        }
    }
}
