namespace DOFY.DataMappers;

using AutoMapper;

public class ScreenMasterModelMapper : ITypeConverter<ViewEntities.ScreenMaster, DBO.ScreenMaster>
{
    public DBO.ScreenMaster Convert(ViewEntities.ScreenMaster source, DBO.ScreenMaster destination, ResolutionContext context)
    {
        return new DBO.ScreenMaster
        {
            Id = source?.Id ?? 0,
            ScreenTypeId = source?.ScreenTypeId ?? 0,
            Name = source?.Name,
            Description = source?.Description,
            EnumName = source?.EnumName,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
        };
    }
}
