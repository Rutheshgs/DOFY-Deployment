namespace DOFY.ViewEntities;

public class Orders : EntityBase
{
    public long? PersonId { get; set; }

    public long? ServiceTypeId { get; set; }

    public long? ModelVariantId { get; set; }

    public long? StatusId { get; set; }

    public long? CancellationTypeId { get; set; }

    public string? CancellationType { get; set; }

    public string? OrderCode { get; set; }

    public decimal? SuggestedCost { get; set; }

    public decimal? RequoteAmount { get; set; }

    public decimal? FinalPaid { get; set; }

    public long? RowOrder { get; set; }

    public DateTime? OrderDate { get; set; }

    public DateTime? CompletedDate { get; set; }

    public long? ProductTypeId { get; set; }

    public string? ServiceType { get; set; }

    public string? ModelVariantName { get; set; }

    public string? ThumbnailPath { get; set; }

    public string? ProductTypeName { get; set; }

    public string? BrandMasterName { get; set; }

    public string? SeriesModelName { get; set; }

    public string? UserName { get; set; }

    public string? UserMobile { get; set; }

    public string? SecondaryMobile { get; set; }

    public string? StatusName { get; set; }

    public string? ExternalStatus { get; set; }

    public long? SeriesModelId { get; set; }

    public long? SeriesModelColorId { get; set; }

    public string? Remarks { get; set; }

    public string? ReferralCode { get; set; }

    public long? ReferralCodeId { get; set; }

    public decimal? ReferralAmount { get; set; }

    public decimal? TotalAmount { get; set; }

    public decimal? CustomerExpectation { get; set; }

    public string? SeriesModelColor { get; set; }

    public string? BrandThumbnailPath { get; set; }

    public string? OrderLanguage { get; set; }

    public Appointment? Appointment { get; set; } = new Appointment();

    public AssigneeDetailsViewModel? AssigneeDetails { get; set; } = new AssigneeDetailsViewModel();

    public IEnumerable<OrderDocuments>? OrderDocuments { get; set; } = new List<OrderDocuments>();

    public IEnumerable<QuestionnaireResponses>? QuestionnaireResponse { get; set; } = new List<QuestionnaireResponses>();

    public OrderQuestionnaire? Questionnaire { get; set; } = new OrderQuestionnaire();

    public IEnumerable<OrderParts>? RepairParts { get; set; } = new List<OrderParts>();

    public IEnumerable<OrderSpecifications>? OrderSpecificationsList { get; set; } = new List<OrderSpecifications>();

    public IEnumerable<OrderHistory>? OrderHistoryList { get; set; } = new List<OrderHistory>();

    public OrderPayout? Payout { get; set; } = new OrderPayout();

    public string? UTMReference { get; set; }
}