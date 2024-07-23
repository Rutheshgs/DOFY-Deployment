namespace DOFY.Contracts;

using DataTables.AspNet.Core;
using DOFY.Helper;
using DOFY.ViewEntities;

public interface IQuestionnaireTypeModel : IEntityModel<QuestionnaireType>
{
    /// <summary>
    /// Get All QuestionnaireType list.
    /// </summary>
    /// <param name="request">request</param>
    /// <returns>List in QuestionnaireType creation</returns>
    PagedList<QuestionnaireType> GetPagedList(IDataTablesRequest request);
}
