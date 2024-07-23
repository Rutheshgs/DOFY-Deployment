namespace DOFY.ViewEntities;

public class PaymentDetails : EntityBase
{
	public long OrderId { get; set; }

	public long PersonId { get; set; }

	public long PaymentTypeId { get; set; }

	public long StatusId { get; set; }

	public long? Notes { get; set; }

	public Guid PaymentReferenceNumber { get; set; }

	public string PaymentGatewayStatus { get; set; }

	public decimal DebitAmount { get; set; }

	public DateTime? PaymentDateTime { get; set; }

	public long? RowOrder { get; set; }
}
