namespace DOFY.DataMappers;
using AutoMapper;
public class AppUpdateModelMapper : ITypeConverter<ViewEntities.AppUpdate, DBO.AppUpdate>
{
    public DBO.AppUpdate Convert(ViewEntities.AppUpdate source, DBO.AppUpdate destination, ResolutionContext context)
    {
        return new DBO.AppUpdate
        {
            Id = source?.Id ?? 0,
            Android_Version = source?.Android_Version ?? null,
            IOS_Version = source?.IOS_Version ?? null,
            Android_Forced_Update = source?.Android_Forced_Update ?? false,
            IOS_Forced_Update = source?.IOS_Forced_Update ?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}