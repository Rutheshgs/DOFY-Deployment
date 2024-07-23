namespace DOFY.DataMappers;

using AutoMapper;

public class UserSettingModelMapper : ITypeConverter<ViewEntities.UserSetting, DBO.UserSetting>
{
    public DBO.UserSetting Convert(ViewEntities.UserSetting source, DBO.UserSetting destination, ResolutionContext context)
    {
        return new DBO.UserSetting
        {
            Id = source?.Id ?? 0,
            PersonId = source?.PersonId ?? 0,
            TimeZoneId = source?.TimeZoneId ?? 0,
            DisplayInList = source?.Active ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
        };
    }
}
