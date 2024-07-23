using DOFY.Helper.Attributes;

namespace DOFY.DBO;

public class Orders : EntityBase
{
    public long? PersonId { get; set; }

    public long? ServiceTypeId { get; set; }

    public long? ModelVariantId { get; set; }

    public long? StatusId { get; set; }

    public long? CancellationTypeId { get; set; }

    public string OrderCode { get; set; }

    public string? OrderLanguage { get; set; }

    public long? RowOrder { get; set; } = 0;

    public DateTime? OrderDate { get; set; }

    public DateTime? CompletedDate { get; set; }

    public long? SeriesModelId { get; set; }

    public string? ReferralCode { get; set; }

    public long? ReferralCodeId { get; set; }

    [DBIgnore]
    public string? Remarks { get; set; }

    [DBIgnore]
    public long? SeriesModelColorId { get; set; }

    [DBIgnore]
    public Appointment? Appointment { get; set; } = new Appointment();

    [DBIgnore]
    public Person? AssigneeDetails { get; set; } = new Person();

    [DBIgnore]
    public IEnumerable<OrderDocuments>? OrderDocuments { get; set; } = new List<OrderDocuments>();

    [DBIgnore]
    public IEnumerable<QuestionnaireResponses>? QuestionaireResponse { get; set; } = new List<QuestionnaireResponses>();

    [DBIgnore]
    public OrderQuestionnaire? Questionaire { get; set; } = new OrderQuestionnaire();

    [DBIgnore]
    public IEnumerable<OrderParts>? RepairParts { get; set; } = new List<OrderParts>();

    [DBIgnore]
    public OrderPayout? Payout { get; set; } = new OrderPayout();

    public string? UTMReference { get; set; }
}