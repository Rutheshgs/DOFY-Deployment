namespace DOFY.DataMappers;

using AutoMapper;

public class DownloadAppModelMapper : ITypeConverter<ViewEntities.DownloadApp, DBO.DownloadApp>
{
    public DBO.DownloadApp Convert(ViewEntities.DownloadApp source, DBO.DownloadApp destination, ResolutionContext context)
    {
        return new DBO.DownloadApp
        {
            Id = source?.Id ?? 0,
            PhoneNumber = source?.PhoneNumber ?? null,
            Emaill = source?.Email ?? null,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
