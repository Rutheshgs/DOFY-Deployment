using AutoMapper;

namespace DOFY.DataMappers
{
    public class CurrencyConvertorModelMapper : ITypeConverter<ViewEntities.CurrencyConvertor, DBO.CurrencyConvertor>
    {
        public DBO.CurrencyConvertor Convert(ViewEntities.CurrencyConvertor source, DBO.CurrencyConvertor destination, ResolutionContext context)
        {
            return new DBO.CurrencyConvertor
            {
                Id = source?.Id ?? 0,
                Currency1Name = source?.Currency1Name ?? string.Empty,
                Currency2Name = source?.Currency2Name ?? string.Empty,
                Amount = source?.Amount ?? null,
               

            };
        }
    }
}
