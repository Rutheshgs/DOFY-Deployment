namespace DOFY.DataMappers;

using AutoMapper;

public class ActivityMasterEntityMapper : ITypeConverter<DBO.ActivityMaster, ViewEntities.ActivityMaster>
{
    public ViewEntities.ActivityMaster Convert(DBO.ActivityMaster source, ViewEntities.ActivityMaster destination, ResolutionContext context)
    {
        return new ViewEntities.ActivityMaster
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
