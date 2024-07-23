using AutoMapper;

namespace DOFY.DataMappers
{
    public class ReferralCodeModelMapper : ITypeConverter<ViewEntities.ReferralCode, DBO.ReferralCode>
    {
        public DBO.ReferralCode Convert(ViewEntities.ReferralCode source, DBO.ReferralCode destination, ResolutionContext context)
        {
            return new DBO.ReferralCode
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
