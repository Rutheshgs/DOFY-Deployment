namespace DOFY.ViewEntities;

public class PersonRating : EntityBase
{
    public long PersonId { get; set; }

    public long OrderId { get; set; }

    public long Rating { get; set; }

    public long Recomendation { get; set; }

    public string RecomendationItems { get; set; }

    public long? RowOrder { get; set; }

}
