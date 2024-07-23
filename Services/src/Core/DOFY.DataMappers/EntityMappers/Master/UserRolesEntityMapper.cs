namespace DOFY.DataMappers;

using AutoMapper;

public class UserRolesEntityMapper : ITypeConverter<DBO.UserRoles, ViewEntities.UserRoles>
{
    public ViewEntities.UserRoles Convert(DBO.UserRoles source, ViewEntities.UserRoles destination, ResolutionContext context)
    {
        return new ViewEntities.UserRoles
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
