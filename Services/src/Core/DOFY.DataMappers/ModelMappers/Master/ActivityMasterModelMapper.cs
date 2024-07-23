namespace DOFY.DataMappers;

using AutoMapper;

public class ActivityMasterModelMapper : ITypeConverter<ViewEntities.ActivityMaster, DBO.ActivityMaster>
{
    public DBO.ActivityMaster Convert(ViewEntities.ActivityMaster source, DBO.ActivityMaster destination, ResolutionContext context)
    {
        return new DBO.ActivityMaster
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            Description = source?.Description,
            EnumName = source?.EnumName,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
