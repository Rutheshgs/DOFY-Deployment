namespace DOFY.DataMappers;

using AutoMapper;

public class AppointmentSlotsModelMapper : ITypeConverter<ViewEntities.AppointmentSlots, DBO.AppointmentSlots>
{
    public DBO.AppointmentSlots Convert(ViewEntities.AppointmentSlots source, DBO.AppointmentSlots destination, ResolutionContext context)
    {
        return new DBO.AppointmentSlots
        {
            Id = source?.Id ?? 0,
            StartTime = source?.StartTime ?? null,
            EndTime = source?.EndTime ?? null,
            EventDate = source?.EventDate ?? null,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
