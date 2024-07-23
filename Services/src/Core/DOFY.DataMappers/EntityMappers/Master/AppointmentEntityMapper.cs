namespace DOFY.DataMappers;

using AutoMapper;

public class AppointmentEntityMapper : ITypeConverter<DBO.Appointment, ViewEntities.Appointment>
{
    public ViewEntities.Appointment Convert(DBO.Appointment source, ViewEntities.Appointment destination, ResolutionContext context)
    {
        return new ViewEntities.Appointment
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            AssigneeId = source?.AssigneeId ?? null,
            AppointmentDate = source?.AppointmentDate ?? null,
            StartTime = source?.StartTime ?? null,
            Remarks = source?.Remarks ?? string.Empty,
            TechnicianComments = source?.TechnicianComments ?? string.Empty,
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
