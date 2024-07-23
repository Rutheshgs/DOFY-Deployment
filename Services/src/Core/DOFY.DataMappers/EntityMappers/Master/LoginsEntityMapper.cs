namespace DOFY.DataMappers;

using AutoMapper;

public class LoginsEntityMapper : ITypeConverter<DBO.Logins, ViewEntities.Logins>
{
    public ViewEntities.Logins Convert(DBO.Logins source, ViewEntities.Logins destination, ResolutionContext context)
    {
        return new ViewEntities.Logins
        {
            Id = source?.Id ?? 0,
            CompanyId = source?.CompanyId ?? 0,
            UserName = source?.UserName,
            PassWord = source?.PassWord,
            Salt = source?.Salt,
            IVKey = source?.IVKey,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
