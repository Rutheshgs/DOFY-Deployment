namespace DOFY.DataMappers;

using AutoMapper;

public class AppointmentSlotsEntityMapper : ITypeConverter<DBO.AppointmentSlots, ViewEntities.AppointmentSlots>
{
    public ViewEntities.AppointmentSlots Convert(DBO.AppointmentSlots source, ViewEntities.AppointmentSlots destination, ResolutionContext context)
    {
        return new ViewEntities.AppointmentSlots
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
        };
    }
}
