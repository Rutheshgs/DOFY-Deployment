namespace DOFY.DataMappers;

using AutoMapper;

public class UserSettingEntityMapper : ITypeConverter<DBO.UserSetting, ViewEntities.UserSetting>
{
    public ViewEntities.UserSetting Convert(DBO.UserSetting source, ViewEntities.UserSetting destination, ResolutionContext context)
    {
        return new ViewEntities.UserSetting
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
