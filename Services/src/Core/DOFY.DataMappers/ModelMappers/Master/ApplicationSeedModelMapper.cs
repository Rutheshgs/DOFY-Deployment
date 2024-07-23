namespace DOFY.DataMappers;

using AutoMapper;

public class ApplicationSeedModelMapper : ITypeConverter<ViewEntities.ApplicationSeed, DBO.ApplicationSeed>
{
    public DBO.ApplicationSeed Convert(ViewEntities.ApplicationSeed source, DBO.ApplicationSeed destination, ResolutionContext context)
    {
        return new DBO.ApplicationSeed
        {
            Id = source?.Id ?? 0,
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
