namespace DOFY.DataMappers;

using AutoMapper;

public class DashboardElementsModelMapper : ITypeConverter<ViewEntities.DashboardElements, DBO.DashboardElements>
{
    public DBO.DashboardElements Convert(ViewEntities.DashboardElements source, DBO.DashboardElements destination, ResolutionContext context)
    {
        return new DBO.DashboardElements
        {
            Id = source?.Id ?? 0,
            ModelVariantId = source?.ModelVariantId ?? 0,
            EntityTypeId = source?.EntityTypeId ?? 0,
            Title = source?.Title ?? null,
            AuthorName = source?.AuthorName ?? null,
            Content = source?.Content ?? null,
            DisplayInList = source?.DisplayInList ?? false,
            Enabled = source?.Enabled ?? false,
            ThumbnailPath = source?.ThumbnailPath ?? null,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}