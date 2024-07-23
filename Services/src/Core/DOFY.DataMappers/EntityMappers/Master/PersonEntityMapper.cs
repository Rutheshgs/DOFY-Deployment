namespace DOFY.DataMappers;

using AutoMapper;

public class PersonEntityMapper : ITypeConverter<DBO.Person, ViewEntities.Person>
{
    public ViewEntities.Person Convert(DBO.Person source, ViewEntities.Person destination, ResolutionContext context)
    {
        return new ViewEntities.Person
        {
            Id = source?.Id ?? 0,
            LoginId = source?.LoginId ?? 0,
            FirstName = source?.FirstName ?? string.Empty,
            MiddleName = source?.MiddleName ?? string.Empty,
            LastName = source?.LastName ?? string.Empty,
            Email = source?.Email ?? string.Empty,
            UserRoleId = source?.UserRoleId ?? 0,
            Prefix = source?.Prefix,
            Suffix = source?.Suffix,
            DateOfBirth = source?.DateOfBirth ?? null,
            UploadImagePath = source?.UploadImagePath,
            UploadImageName = source?.UploadImageName,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            Mobile = source.Mobile,
            SecondaryMobile = source.SecondaryMobile,
        };
    }
}
