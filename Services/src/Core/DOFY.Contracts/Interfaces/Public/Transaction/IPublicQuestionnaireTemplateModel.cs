namespace DOFY.Contracts.Interfaces.Public;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IPublicQuestionnaireTemplateModel : IBaseModel<QuestionnaireTemplate>
{
    /// <summary>
    /// Get All QuestionnaireTemplateList list.
    /// </summary>
    /// <param name="criteria">request</param>
    /// <returns>List in QuestionnaireTemplateList creation</returns>
    OrderQuestionnaire GetQuestionnaireTemplate (QuestionnaireSearchCriteria criteria);
}
