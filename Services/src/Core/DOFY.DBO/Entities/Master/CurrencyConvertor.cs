

namespace DOFY.DBO
{
    public class CurrencyConvertor : EntityBase
    {
        public string Currency1Name { get; set; }

        public string Currency2Name { get; set; }

        public decimal? Amount { get; set; }

    }
}