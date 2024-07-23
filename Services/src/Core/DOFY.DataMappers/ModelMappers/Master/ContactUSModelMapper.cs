namespace DOFY.DataMappers;

using AutoMapper;

public class ContactUSModelMapper : ITypeConverter<ViewEntities.ContactUS, DBO.ContactUS>
{
    public DBO.ContactUS Convert(ViewEntities.ContactUS source, DBO.ContactUS destination, ResolutionContext context)
    {
        return new DBO.ContactUS
        {
            Id = source?.Id ?? 0,
            Name = source?.Name ?? string.Empty,
            Mobile = source?.Mobile ?? string.Empty,
            Email = source?.Email ?? string.Empty,
            Description = source?.Description ?? string.Empty,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
