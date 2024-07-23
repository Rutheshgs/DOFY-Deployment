namespace DOFY.DataMappers;

using AutoMapper;

public class ApplicationSeedEntityMapper : ITypeConverter<DBO.ApplicationSeed, ViewEntities.ApplicationSeed>
{
    public ViewEntities.ApplicationSeed Convert(DBO.ApplicationSeed source, ViewEntities.ApplicationSeed destination, ResolutionContext context)
    {
        return new ViewEntities.ApplicationSeed
        {
            Id = source?.Id ?? 0,
            ServiceTypeId = source?.ServiceTypeId ?? 0,
            CurrentSeed = source?.CurrentSeed ?? 0,
            SeedAbbreviation = source?.SeedAbbreviation,
            YearDigits = source?.YearDigits ?? 0,
            NumberOfDigits = source?.NumberOfDigits ?? 0,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
