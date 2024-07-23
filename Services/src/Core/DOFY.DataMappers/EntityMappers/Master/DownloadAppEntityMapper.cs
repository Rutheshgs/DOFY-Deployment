namespace DOFY.DataMappers;

using AutoMapper;

public class DownloadAppEntityMapper : ITypeConverter<DBO.DownloadApp, ViewEntities.DownloadApp>
{
    public ViewEntities.DownloadApp Convert(DBO.DownloadApp source, ViewEntities.DownloadApp destination, ResolutionContext context)
    {
        return new ViewEntities.DownloadApp
        {
            Id = source?.Id ?? 0,
            PhoneNumber = source?.PhoneNumber ?? null,
            Email = source?.Emaill ?? null,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
