namespace DOFY.DataMappers;

using AutoMapper;

public class UserRoleScreenActivityModelMapper : ITypeConverter<ViewEntities.UserRoleScreenActivity, DBO.UserRoleScreenActivity>
{
    public DBO.UserRoleScreenActivity Convert(ViewEntities.UserRoleScreenActivity source, DBO.UserRoleScreenActivity destination, ResolutionContext context)
    {
        return new DBO.UserRoleScreenActivity
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
