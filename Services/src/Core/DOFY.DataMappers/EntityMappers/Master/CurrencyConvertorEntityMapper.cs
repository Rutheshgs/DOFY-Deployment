using AutoMapper;

namespace DOFY.DataMappers
{
    public class CurrencyConvertorEntityMapper : ITypeConverter<DBO.CurrencyConvertor, ViewEntities.CurrencyConvertor>
    {
        public ViewEntities.CurrencyConvertor Convert(DBO.CurrencyConvertor source, ViewEntities.CurrencyConvertor destination, ResolutionContext context)
        {
            return new ViewEntities.CurrencyConvertor
            {
                Id = source?.Id ?? 0,
                Currency1Name = source?.Currency1Name ?? string.Empty,
                Currency2Name = source?.Currency2Name ?? string.Empty,
                Amount = source?.Amount ?? null,
        
            };
        }
    }
}