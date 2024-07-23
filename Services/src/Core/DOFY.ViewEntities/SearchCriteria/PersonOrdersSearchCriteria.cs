namespace DOFY.ViewEntities
{
    public class PersonOrdersSearchCriteria : SearchBaseCriteria
    {
        public long? PersonId { get; set; }

        public string? StatusIds { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

    }
}
