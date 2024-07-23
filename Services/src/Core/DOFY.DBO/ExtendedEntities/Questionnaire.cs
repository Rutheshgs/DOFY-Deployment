namespace DOFY.DBO
{
    public class Questionnaire : QuestionnaireTemplate
    {
		public long? OrderId { get; set; }

		public string QuestionnaireTypeName { get; set; }

		public string QuestionnaireTypeDisplayName { get; set; }

		public string QuestionnaireTypeEnumName { get; set; }

		public bool? Response { get; set; }

		public string ResponseText { get; set; }

		public bool? IsChild { get; set; }

		public IEnumerable<Questionnaire> Questions { get; set; }
	}
}
