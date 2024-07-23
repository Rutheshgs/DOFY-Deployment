using AutoMapper;

namespace DOFY.DataMappers
{
    public class ReferralCodeEntityMapper : ITypeConverter<DBO.ReferralCode, ViewEntities.ReferralCode>
    {
        public ViewEntities.ReferralCode Convert(DBO.ReferralCode source, ViewEntities.ReferralCode destination, ResolutionContext context)
        {
            return new ViewEntities.ReferralCode
            {
                Id = source?.Id ?? 0,
                Name = source?.Name,
                DisplayName = source?.DisplayName,
                EnumName = source?.EnumName,
                RowOrder = source?.RowOrder ?? 0,
                Created = source?.Created ?? null,
                CreatedBy = source?.CreatedBy ?? 0,
                Modified = source?.Created ?? null,
                ModifiedBy = source?.ModifiedBy ?? 0,
                Active = source?.Active ?? false,
                Code = source?.Code,
                UrlData = source?.UrlData,
                Amount = source?.Amount ?? null,
                SecondLanguage = source?.SecondLanguage
            };
        }
    }
}
