namespace DOFY.DataMappers;

using AutoMapper;

public class UserRolesModelMapper : ITypeConverter<ViewEntities.UserRoles, DBO.UserRoles>
{
    public DBO.UserRoles Convert(ViewEntities.UserRoles source, DBO.UserRoles destination, ResolutionContext context)
    {
        return new DBO.UserRoles
        {
            Id = source?.Id ?? 0,
            LoginId = source?.LoginId ?? 0,
            RoleId = source?.RoleId ?? 0,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
        };
    }
}
