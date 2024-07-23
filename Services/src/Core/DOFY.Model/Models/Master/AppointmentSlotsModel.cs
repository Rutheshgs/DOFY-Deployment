namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts.Interfaces;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class AppointmentSlotsModel : BaseModel<DBO.AppointmentSlots>, IAppointmentSlotsModel, IPublicAppointmentSlotsModel
{
    private readonly IMapper mapper;
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IPrincipal? iPrincipal;
    private readonly CountryContext context;

    public AppointmentSlotsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.context = requestContext;
    }

    public AppointmentSlots Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.AppointmentSlots, ViewEntities.AppointmentSlots>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<AppointmentSlots> GetList()
    {
        var result = this.FindItems(item => item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.AppointmentSlots>, IEnumerable<ViewEntities.AppointmentSlots>>(result);

            return mapperResult;
        }

        return default;
    }

    public PagedList<AppointmentSlots> GetAppointmentSlotsList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = this.GetPagedSProcResultWithCriteria<AppointmentSlots>(criteria, DOFYConstants.DataBase.SP_GetAppointmentSlotsList, param);

        return results;
    }

    public IEnumerable<AppointmentSlots> GetSlotsForDate(string date)
    {
        var dateForSlot = DateTime.Parse(date);
        var result = this.FindItems(x => x.EventDate == dateForSlot && x.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.AppointmentSlots>, IEnumerable<ViewEntities.AppointmentSlots>>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<AppointmentSlots> GetAppointmentSlots(string date, long productTypeId, long serviceTypeId, bool isExpressPickup, long userAddressId)
    {
        var param = new
        {
            AppointmentType = isExpressPickup ? "ExpressPickup_Threshold" : "Appointment_Threshold",
            ServiceTypeId = serviceTypeId,
            ProductTypeId = productTypeId,
            CurDateTime = Helper.Extensions.DateTimeExtensions.GetCurrentIST(),
            RowsPerPage = 0,
            UserAddressId = userAddressId,
        };

        var results = this.ExecStoredProcedure<AppointmentSlots>(DOFYConstants.DataBase.SP_GetAppointments, param);

        return results;
    }

    public override IEnumerable<DBO.AppointmentSlots> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.AppointmentSlots>(DOFYConstants.DataBase.SP_GetAppointmentSlotsList, null);

        return results;
    }

    public long Post(AppointmentSlots item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Put(AppointmentSlots item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Post(AppointmentSlots item)
    {
        throw new NotImplementedException();
    }

    public long Put(AppointmentSlots item)
    {
        throw new NotImplementedException();
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public bool Remove(long id)
    {
        throw new NotImplementedException();
    }
}
