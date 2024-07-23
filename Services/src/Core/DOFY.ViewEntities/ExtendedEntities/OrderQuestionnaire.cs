namespace DOFY.ViewEntities
{
    public class OrderQuestionnaire : EntityBase
    {
        public long OrderId { get; set; }

        public long? Version { get; set; }

        public IEnumerable<Questionnaire>? Sections { get; set; }
    }
}
