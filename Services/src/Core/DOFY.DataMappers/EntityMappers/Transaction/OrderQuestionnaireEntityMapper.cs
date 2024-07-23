namespace DOFY.DataMappers;

using AutoMapper;
using DOFY.Helper;

public class OrderQuestionnaireEntityMapper : ITypeConverter<DBO.OrderQuestionnaire, ViewEntities.OrderQuestionnaire>
{
    public ViewEntities.OrderQuestionnaire Convert(DBO.OrderQuestionnaire source, ViewEntities.OrderQuestionnaire destination, ResolutionContext context)
    {
        var item = new ViewEntities.OrderQuestionnaire();

        if (source?.Sections?.Count() > 0)
        {
            item.Sections = this.GetHeaders(source.Sections);
        }

        return item;
    }

    public IEnumerable<ViewEntities.Questionnaire> GetHeaders(IEnumerable<DBO.Questionnaire> items)
    {
        var result = items.GroupBy(x => x.QuestionnaireTypeId).Select(sections =>
        {
            var header = sections?.Where(x => x.Type?.ToUpper() == DOFYConstants.QUESTIONTYPE.HEADING.ToString())?.FirstOrDefault();
            var data = this.ConvertQuestionnaire(header);

            var itemsToProcess = sections?.Where(x => x.Type?.ToUpper() != DOFYConstants.QUESTIONTYPE.HEADING.ToString());

            if (itemsToProcess?.Count() > 0)
            {
                // data.Questions = this.GetQuestions(itemsToProcess, data.Identifier); -- To do add grouping after the release
                var questions = itemsToProcess?.Select(questionData =>
                {
                    return this.ConvertQuestionnaire(questionData);
                });

                data.Questions = questions;
            }

            return data;
        });

        return result?.OrderBy(x => x.RowOrder);
    }

    public IEnumerable<ViewEntities.Questionnaire> GetQuestions (IEnumerable<DBO.Questionnaire> items, int? headerId)
    {
        var itemsToGroup = this.GetChildEntity(items, headerId);

        var questions = itemsToGroup?.Where(x => x.IsChild == false)?
                                    .OrderBy(x => x.RowOrder)?
                                    .Select(item =>
                                    {
                                        var subQuestions = itemsToGroup.Where(x => x.ParentId == item.Identifier)?.OrderBy(x => x.RowOrder);
                                        item.Questions = this.GetOptions(itemsToGroup, item.Identifier);

                                        return item;
                                    });

        return questions;
    }

    private IEnumerable<ViewEntities.Questionnaire> GetOptions(IEnumerable<ViewEntities.Questionnaire> items, int? parentId)
    {
        var options = items?.Where(x => x.ParentId == parentId)?
                                    .OrderBy(x => x.RowOrder)?
                                    .Select(item =>
                                    {
                                        var subQuestions = items.Where(x => x.ParentId == item.Identifier)?.OrderBy(x => x.RowOrder);
                                        item.Questions = subQuestions;

                                        return item;
                                    });

        return options;
    }

    private IEnumerable<ViewEntities.Questionnaire> GetChildEntity (IEnumerable<DBO.Questionnaire> items, int? headerId)
    {
        var result = items.Select(item =>
        {
            if (item.ParentId == headerId)
            {
                item.IsChild = false;
            }
            else
            {
                item.IsChild = true;
            }

            return this.ConvertQuestionnaire(item);
        });

        return result;
    }

    private ViewEntities.Questionnaire ConvertQuestionnaire(DBO.Questionnaire question)
    {
        return new ViewEntities.Questionnaire()
        {
            Id = question.Id,
            ProductTypeId = question.ProductTypeId,
            QuestionnaireTypeId = question.QuestionnaireTypeId,
            OSTypeId = question.OSTypeId,
            ModelVariantId = question.ModelVariantId,
            Identifier = question.Identifier,
            ParentId = question.ParentId,
            Name = question.Name,
            DisplayName = question.DisplayName,
            EnumName = question.EnumName,
            SubHeading = question.SubHeading,
            Type = question.Type,
            AnswerType = question.AnswerType,
            Threshold = question.Threshold,
            RowOrder = question.RowOrder,
            DisplayInList = question.DisplayInList,
            ThresholdLevel = question.ThresholdLevel,
            Enabled = question.Enabled,
            ThumbnailPath = question.ThumbnailPath,
            QuestionnaireTypeName = question.QuestionnaireTypeName,
            QuestionnaireTypeDisplayName = question.QuestionnaireTypeDisplayName,
            QuestionnaireTypeEnumName = question.QuestionnaireTypeEnumName,
            Response = question.Response,
            ResponseText = question.ResponseText,
            IsChild = question.IsChild,
            IsEditable = question.IsEditable,
            ResponseYes = question.ResponseYes,
            ResponseNo = question.ResponseNo,
            DepreciateCalculation = question.DepreciateCalculation,
            AppreciateCalculation = question.AppreciateCalculation,
            NextQuestionYes = question.NextQuestionYes,
            NextQuestionNo = question.NextQuestionNo,
            Required = question.Required,
            CategoryId = question.CategoryId,
            DisableWarranty = question.DisableWarranty,
            Icons = question.Icons,
            IgnoreResponseIds = question.IgnoreResponseIds,
        };
    }
}
