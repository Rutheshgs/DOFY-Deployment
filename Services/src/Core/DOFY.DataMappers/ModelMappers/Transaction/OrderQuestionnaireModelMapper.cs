namespace DOFY.DataMappers;

using AutoMapper;

public class OrderQuestionnaireModelMapper : ITypeConverter<ViewEntities.OrderQuestionnaire, DBO.OrderQuestionnaire>
{
    public DBO.OrderQuestionnaire Convert(ViewEntities.OrderQuestionnaire source, DBO.OrderQuestionnaire destination, ResolutionContext context)
    {
        var item = new DBO.OrderQuestionnaire();

        if (source?.Sections?.Count() > 0)
        {
            item.Response = this.GetResponse(source);
        }

        return item;
    }

    public IEnumerable<DBO.QuestionnaireResponses> GetResponse(ViewEntities.OrderQuestionnaire item)
    {
        var response = new List<DBO.QuestionnaireResponses>();

        foreach (var section in item?.Sections)
        {
            response.Add(this.ConvertQuestionnaire(section, item));

            foreach (var header in section?.Questions)
            {
                response.Add(this.ConvertQuestionnaire(header, item));

                foreach (var questions in header?.Questions)
                {
                    response.Add(this.ConvertQuestionnaire(questions, item));

                    foreach (var options in questions?.Questions)
                    {
                        response.Add(this.ConvertQuestionnaire(questions, item));
                    }
                }
            }
        }

        return response;
    }

    private DBO.QuestionnaireResponses ConvertQuestionnaire(ViewEntities.Questionnaire question, ViewEntities.OrderQuestionnaire item)
    {
        return new DBO.QuestionnaireResponses()
        {
            OrderId = item.OrderId,
            QuestionnaireTemplateId = question.Id,
            Selected = question.Response,
            Threshold = question.Threshold,
            RowOrder = question.RowOrder,
            Version = item.Version,
            Active = true,
        };
    }
}
