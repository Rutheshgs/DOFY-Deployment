namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class RepairTypeModel : BaseModel<DBO.RepairType>, IRepairTypeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public RepairTypeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal _iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, _iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = _iPrincipal;
        this.context = requestContext;
    }

    public RepairType Get(long id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<RepairType> GetList()
    {
        throw new NotImplementedException();
    }

    public IEnumerable<DBO.RepairType> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.RepairType>(DOFYConstants.DataBase.SP_GetRepairTypeList, null);

        return results;
    }

    public IEnumerable<RepairType> GetRepairTypeList()
    {
        var results = this.ExecStoredProcedure<RepairType>(DOFYConstants.DataBase.SP_GetRepairTypeList, null);

        return results;
    }

    public IEnumerable<RepairType> GetAllRepairTypes(long seriesModelColorId)
    {
        var param = new
        {
            SeriesModelColorId = seriesModelColorId,
        };

        var result = this.ExecStoredProcedure<RepairType>(DOFYConstants.DataBase.SP_GetRepairTypeList, param);

        return result;
    }
}
