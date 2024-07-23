namespace DOFY.Contracts;

using DOFY.ViewEntities;

public interface IRepairTypeModel : IBaseModel<RepairType>
{
    /// <summary>
    /// Get ServiceType list.
    /// </summary>     
    /// <returns>List in ServiceType creation.</returns>
    IEnumerable<RepairType> GetRepairTypeList();

    /// <summary>
    /// Get ServiceType list.
    /// </summary>
    /// <param name="seriesModelColorId">seriesId.</param>
    /// <returns>List in ServiceType creation.</returns>
    IEnumerable<RepairType> GetAllRepairTypes(long seriesModelColorId);
}
