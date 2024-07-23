namespace DOFY.DataMappers;

using AutoMapper;

public class AppointmentModelMapper : ITypeConverter<ViewEntities.Appointment, DBO.Appointment>
{
    public DBO.Appointment Convert(ViewEntities.Appointment source, DBO.Appointment destination, ResolutionContext context)
    {
        return new DBO.Appointment
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            AssigneeId = source?.AssigneeId ?? null,
            AppointmentDate = (DateTime)(source?.AppointmentDate ?? null),
            StartTime = (DateTime)(source?.StartTime ?? null),
            Remarks = source?.Remarks,
            TechnicianComments = source?.TechnicianComments,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            IsReschedule = source?.IsReschedule ?? false,
            Active = source?.Active ?? false,
            UserAddresId = source?.UserAddresId ?? null,
            EndTime = source?.EndTime ?? null,
        };
    }
}
