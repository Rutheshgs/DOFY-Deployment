namespace DOFY.Contracts.Interfaces;

using DOFY.ViewEntities;

public interface IQuestionnaireTemplateModel : IBaseModel<QuestionnaireTemplate>
{
    /// <summary>
    /// Get All QuestionnaireTemplateList list.
    /// </summary>
    /// <param name="criteria">request.</param>
    /// <returns>List in QuestionnaireTemplateList creation</returns>
    OrderQuestionnaire GetQuestionnaireTemplate(QuestionnaireSearchCriteria criteria);

    /// <summary>
    /// Submit Or Update QuestionnaireTemplate list.
    /// </summary>
    /// <param name="questionnaireTemplates">request</param>
    /// <returns>Return True or False.</returns>
    Task<bool> SubmitOrUpdateTemplate(IEnumerable<ViewEntities.QuestionnaireTemplate> questionnaireTemplates);

    /// <summary>
    /// Get QuestionnaireTemplate list.
    /// </summary>
    /// <param name="variantId">request</param>
    /// <returns>Return QuestionnaireTemplate list.</returns>
    Task<IEnumerable<QuestionnaireTemplate>> GetQuestionaireTemplateByVariant(long variantId);

    /// <summary>
    /// Get QuestionnaireTemplate list.
    /// </summary>
    /// <param name="productTypeId">productTypeId.</param>
    /// <param name="osTypeId">osTypeId.</param>
    /// <param name="categoryId">categoryId.</param>
    /// <returns>Return QuestionnaireTemplate list.</returns>
    Task<IEnumerable<QuestionnaireTemplate>> GetQuestionaireTemplateByCategory(long productTypeId, long osTypeId, long categoryId);
}
