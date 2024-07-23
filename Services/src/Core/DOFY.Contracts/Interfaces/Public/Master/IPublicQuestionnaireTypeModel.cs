namespace DOFY.Contracts.Interfaces.Public;

using DOFY.Helper;
using DOFY.ViewEntities;

public interface IPublicQuestionnaireTypeModel : IBaseModel<QuestionnaireType>
{
    /// <summary>
    /// Get QuestionnaireType list.
    /// </summary>
    /// <param name="criteria">criteria.</param>
    /// <returns>List in QuestionnaireType creation.</returns>
    PagedList<QuestionnaireType> GetQuestionnaireTypeList(SearchBaseCriteria criteria);
}
