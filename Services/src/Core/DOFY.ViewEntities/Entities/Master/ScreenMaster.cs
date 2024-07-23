namespace DOFY.ViewEntities;

public class ScreenMaster : EntityBase
{
	public long ScreenTypeId { get; set; }

	public string Name { get; set; }

	public string Description { get; set; }

	public string EnumName { get; set; }

	public long? RowOrder { get; set; }
}
