namespace DOFY.DataMappers;

using AutoMapper;

public class UserRoleScreenActivityEntityMapper : ITypeConverter<DBO.UserRoleScreenActivity, ViewEntities.UserRoleScreenActivity>
{
    public ViewEntities.UserRoleScreenActivity Convert(DBO.UserRoleScreenActivity source, ViewEntities.UserRoleScreenActivity destination, ResolutionContext context)
    {
        return new ViewEntities.UserRoleScreenActivity
        {
            Id = source?.Id ?? 0,
            UserRoleId = source?.UserRoleId ?? 0,
            ScreenActivityMasterId = source?.ScreenActivityMasterId ?? 0,
            IsSelected = source?.Active ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
        };
    }
}
