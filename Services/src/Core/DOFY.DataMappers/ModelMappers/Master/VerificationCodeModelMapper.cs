namespace DOFY.DataMappers;

using AutoMapper;
using DOFY.Helper.Extensions;

public class VerificationCodeModelMapper : ITypeConverter<ViewEntities.VerificationCode, DBO.VerificationCode>
{
    public DBO.VerificationCode Convert(ViewEntities.VerificationCode source, DBO.VerificationCode destination, ResolutionContext context)
    {
        return new DBO.VerificationCode
        {
            Id = source?.Id ?? 0,
            PersonId = source?.PersonId ?? 0,
            VerificationNumber = source?.VerificationNumber ?? 0,
            Verified = source?.Verified ?? false,
            ResendFlag = source?.ResendFlag ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
            ExpirationTime = source?.ExpirationTime ?? DateTimeExtensions.GetCurrentIST(),
            EmailTemplateId = source?.EmailTemplateId ?? null,
        };
    }
}