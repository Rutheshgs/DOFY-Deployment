namespace DOFY.DBO;

public class PaymentType : EntityBase
{
	public string Name { get; set; }

	public string DisplayName { get; set; }

	public string EnumName { get; set; }

	public bool DisplayInList { get; set; }

	public long? RowOrder { get; set; }
}
