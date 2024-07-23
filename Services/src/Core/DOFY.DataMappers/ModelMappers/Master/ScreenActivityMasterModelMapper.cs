namespace DOFY.DataMappers;

using AutoMapper;

public class ScreenActivityMasterModelMapper : ITypeConverter<ViewEntities.ScreenActivityMaster, DBO.ScreenActivityMaster>
{
    public DBO.ScreenActivityMaster Convert(ViewEntities.ScreenActivityMaster source, DBO.ScreenActivityMaster destination, ResolutionContext context)
    {
        return new DBO.ScreenActivityMaster
        {
            Id = source?.Id ?? 0,
            ScreenMasterId = source?.ScreenMasterId ?? 0,
            ActivityMasterId = source?.ActivityMasterId ?? 0,
            ScreenURL = source?.ScreenURL,
            HasAccess = source?.HasAccess ?? false,
            IsMenuLink = source?.IsMenuLink ?? false,
            IsSelected = source?.IsSelected ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
        };
    }
}
