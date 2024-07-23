using AutoMapper;

namespace DOFY.DataMappers
{
    public class ReportParameterEntityMapper : ITypeConverter<DBO.ReportParameter, ViewEntities.ReportParameter>
    {
        public ViewEntities.ReportParameter Convert(DBO.ReportParameter source, ViewEntities.ReportParameter destination, ResolutionContext context)
        {
            return new ViewEntities.ReportParameter
            {
                Id = source?.Id ?? 0,
                Name = source?.Name,
                Address = source?.Address,
                CurrencyCode = source?.CurrencyCode?? 0,
                CurrencyName = source?.CurrencyName?? 0,
                RowOrder = source?.RowOrder ?? 0,
                Created = source?.Created ?? null,
                CreatedBy = source?.CreatedBy ?? 0,
                Modified = source?.Created ?? null,
                ModifiedBy = source?.ModifiedBy ?? 0,
                Active = source?.Active?? 0,
            };
        }
    }
}
