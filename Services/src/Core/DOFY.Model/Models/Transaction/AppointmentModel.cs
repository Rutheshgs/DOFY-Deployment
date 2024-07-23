namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts.Interfaces;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class AppointmentModel : BaseModel<DBO.Appointment>, IPublicAppointmentModel, IAppointmentModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public AppointmentModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public Appointment Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Appointment, ViewEntities.Appointment>(result);
            return mapperResult;
        }

        return default;
    }

    public IEnumerable<Appointment> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.Appointment>, IEnumerable<ViewEntities.Appointment>>(results);

        return mapperResult;
    }

    public long Post(Appointment item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Post(Appointment item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.Appointment, DBO.Appointment>(item);
            mapperResult.Active = true;

            var result = this.AddItem(mapperResult);

            return result;
        }

        return default;
    }

    public long Put(Appointment item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Put(Appointment item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.Appointment, DBO.Appointment>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public bool Remove(long id)
    {
        var mapperResult = this.FindById(id);
        if (mapperResult is not null)
        {
            mapperResult.Active = false;
            this.UpdateItem(mapperResult);
            return true;
        }

        return false;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public PagedList<Appointment> GetAppointmentList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = this.GetPagedSProcResultWithCriteria<Appointment>(criteria, DOFYConstants.DataBase.SP_GetAppointmentList, param);

        return results;
    }

    public ViewEntities.Appointment GetAppointmentsByOrderId(long orderId)
    {
        var result = this.FindItem(item => item.OrderId == orderId && item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Appointment, ViewEntities.Appointment>(result);

            return mapperResult;
        }

        return default;
    }

    public long? AddOrUpdate(ViewEntities.Appointment item, long orderId)
    {
        if (item is not null)
        {
            this.RemoveOldAppointment(orderId);
            item.OrderId = orderId;
            item.Id = item.Id > 0 ? this.Put(item) : this.Post(item);

            return item.Id;
        }

        return default;
    }

    public void RemoveOldAppointment(long orderId)
    {
        var appointments = this.FindItems(x => x.OrderId == orderId && x.Active == true);

        foreach (var appointment in appointments)
        {
            appointment.Active = false;

            this.UpdateItem(appointment);
        }
    }

    public void UpdateAssignee(long orderId, long assigneeId)
    {
        var appointment = this.FindItem(x => x.OrderId == orderId && x.Active == true);

        appointment.AssigneeId = assigneeId;

        this.UpdateItem(appointment);
    }

    public long Reschedule(Appointment appointment, long orderId)
    {
        if (orderId > 0)
        {
            this.RemoveOldAppointment(orderId);

            var mapperResult = this.mapper.Map<ViewEntities.Appointment, DBO.Appointment>(appointment);
            mapperResult.Active = true;
            mapperResult.OrderId = orderId;
            mapperResult.Remarks = appointment.Remarks;

            return this.AddItem(mapperResult);
        }

        return default;
    }

    public void UpdateAppointmentAsync(long orderId, string remarks)
    {
        DBO.Appointment appointment = this.FindItem(appointmentItem => appointmentItem.OrderId == orderId && appointmentItem.Active == true);
        if (appointment is not null)
        {
            appointment.Remarks = remarks;
            this.Update(appointment);
        }
    }


    public void UpdateAppointmentAsyncCancel(long orderId, string remarks)
    {
        DBO.Appointment appointment = this.FindItem(appointmentItem => appointmentItem.OrderId == orderId && appointmentItem.Active == true);
        if (appointment is not null)
        {
            appointment.TechnicianComments = remarks;
            this.Update(appointment);
        }
    }

    public async Task<long> SaveAppointmentAsync(long orderId, decimal delayHours, string delayComments)
    {
        this.RemoveOldAppointment(orderId);
        DBO.Appointment? previousAppointment = this.FindItems(e => e.OrderId == orderId && e.Active == false).OrderByDescending(e => e.Id).FirstOrDefault();
        DBO.Appointment newAppointment = new DBO.Appointment();
        newAppointment.StartTime = previousAppointment?.StartTime;
        newAppointment.AssigneeId = previousAppointment?.AssigneeId;
        newAppointment.OrderId = orderId;
        newAppointment.Remarks = delayComments;
        newAppointment.IsReschedule = true;
        newAppointment.UserAddresId = previousAppointment?.UserAddresId;
        newAppointment.AppointmentDate = previousAppointment?.AppointmentDate;
        newAppointment.EndTime = previousAppointment?.EndTime?.AddHours((double)delayHours);

        long appointmentId = this.AddItem(newAppointment);

        var orderHistoryId = new OrderHistoryModel(this.config, this.mapper, this.iPrincipal, this.context).AddHistory(orderId, (long)STATUS_ENUM.DELAYED, previousAppointment?.AssigneeId, null);

        return await Task.FromResult(appointmentId);
    }
}
