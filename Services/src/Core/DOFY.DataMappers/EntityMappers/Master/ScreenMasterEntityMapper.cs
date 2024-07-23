namespace DOFY.DataMappers;

using AutoMapper;

public class ScreenMasterEntityMapper : ITypeConverter<DBO.ScreenMaster, ViewEntities.ScreenMaster>
{
    public ViewEntities.ScreenMaster Convert(DBO.ScreenMaster source, ViewEntities.ScreenMaster destination, ResolutionContext context)
    {
        return new ViewEntities.ScreenMaster
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
