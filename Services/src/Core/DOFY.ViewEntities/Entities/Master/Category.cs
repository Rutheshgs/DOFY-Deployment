namespace DOFY.ViewEntities;

public class Category : EntityBase
{
	public long? EntityTypeId { get; set; }

	public string Name { get; set; }

	public string? DisplayName { get; set; }

	public string? EnumName { get; set; }

	public string? Description { get; set; }

	public bool? DisplayInList { get; set; }

	public int? RowOrder { get; set; }
}
