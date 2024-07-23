using AutoMapper;

namespace DOFY.DataMappers
{
    public class ReportParameterModelMapper : ITypeConverter<ViewEntities.ReportParameter, DBO.ReportParameter>
    {
        public DBO.ReportParameter Convert(ViewEntities.ReportParameter source, DBO.ReportParameter destination, ResolutionContext context)
        {
            return new DBO.ReportParameter
            {
                Id = source?.Id ?? 0,
                Name = source?.Name,
                Address = source?.Address,
                CurrencyCode = source?.CurrencyCode ?? 0,
                CurrencyName = source?.CurrencyName ?? 0,
                RowOrder = source?.RowOrder ?? 0,
                Created = source?.Created ?? null,
                CreatedBy = source?.CreatedBy ?? 0,
                Modified = source?.Created ?? null,
                ModifiedBy = source?.ModifiedBy ?? 0,
                Active = source?.Active ?? 0,
            };
        }
    }
}
