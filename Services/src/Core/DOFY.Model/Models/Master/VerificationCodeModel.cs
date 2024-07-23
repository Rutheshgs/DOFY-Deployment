namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class VerificationCodeModel : BaseModel<DBO.VerificationCode>, IVerificationCodeModel, IPublicVerificationCodeModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public VerificationCodeModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.VerificationCode Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.VerificationCode, ViewEntities.VerificationCode>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.VerificationCode> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.VerificationCode>, IEnumerable<ViewEntities.VerificationCode>>(results);

        return mapperResult;
    }

    public long Post(ViewEntities.VerificationCode item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.VerificationCode, DBO.VerificationCode>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.VerificationCode item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.VerificationCode, DBO.VerificationCode>(item);
        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public bool Remove(long id)
    {
        var VerificationCode = this.FindById(id);
        if (VerificationCode is not null)
        {
            VerificationCode.Active = false;
            this.UpdateItem(VerificationCode);

            return true;
        }

        return false;
    }

    public long Post(ViewEntities.VerificationCode item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.VerificationCode, DBO.VerificationCode>(item);

        this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(ViewEntities.VerificationCode item, IFormFileCollection postedFileCollection)
    {
        var mapperResult = this.mapper.Map<ViewEntities.VerificationCode, DBO.VerificationCode>(item);

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public long RegisterVerficationCode(long loginId, string verificationCode)
    {
        var personModel = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context);
        var person = personModel.GetPersonsByLoginId(loginId);
        if (person is null)
        {
            return default;
        }

        this.InactivateOldOTP(person.Id);

        var currentDate = Helper.Extensions.DateTimeExtensions.GetCurrentIST();
        var verification = new DBO.VerificationCode();
        verification.PersonId = person.Id;
        verification.VerificationNumber = int.Parse(verificationCode);
        verification.RowOrder = 100;
        verification.Active = true;
        verification.ExpirationTime = currentDate.AddMinutes(this.config?.Value?.EncryptionConfiguration?.OTPExpirationInMinutes ?? 5);
        var result = this.AddItem(verification);

        return result;
    }

    public ViewEntities.VerificationCode GetVerificationCodeByPersonId(long personId)
    {
        DBO.VerificationCode? verificationCode = this.FindItems(verificationItem => verificationItem.PersonId == personId && verificationItem.Active == true && verificationItem.Verified == false).OrderByDescending(e => e.Modified).FirstOrDefault();

        if (verificationCode is not null)
        {
            ViewEntities.VerificationCode mappedResult = this.mapper.Map<DBO.VerificationCode, ViewEntities.VerificationCode>(verificationCode);

            return mappedResult;
        }

        return default;
    }

    public async Task<bool> SubmitVerficationCodeAsync(long personId)
    {
        ViewEntities.VerificationCode verification = this.GetVerificationCodeByPersonId(personId);

        if (verification is not null)
        {
            DBO.VerificationCode mappedCode = this.mapper.Map<ViewEntities.VerificationCode, DBO.VerificationCode>(verification);
            mappedCode.Active = false;
            mappedCode.Verified = true;
            this.Update(mappedCode);

            return await Task.FromResult(true);
        }

        return default;
    }

    public async void InactivateOldOrderOTP(long orderId, long personId)
    {
        var otps = this.FindItems(x => x.OrderId == orderId && x.PersonId == personId && x.Active == true);
        if (otps?.Count() > 0)
        {
            foreach (var otp in otps)
            {
                otp.Active = false;
                this.UpdateItem(otp);
            }
        }
    }

    public async void InactivateOldOTP(long personId)
    {
        var otps = this.FindItems(x => x.PersonId == personId && x.Active == true && x.Verified == false)?.Where(x => x.OrderId == null);
        if (otps?.Count() > 0)
        {
            foreach (var otp in otps)
            {
                otp.Active = false;
                this.UpdateItem(otp);
            }
        }
    }

    public async Task<long> OrderOTPRegisterProcessAsync(long orderId, long personId, string code, long emailTemplateId)
    {
        var currentDate = Helper.Extensions.DateTimeExtensions.GetCurrentIST();

        InactivateOldOrderOTP(orderId, personId);
        var verification = new DBO.VerificationCode();
        verification.PersonId = personId;
        verification.VerificationNumber = int.Parse(code);
        verification.OrderId = orderId;
        verification.EmailTemplateId = emailTemplateId;
        verification.RowOrder = 100;
        verification.Active = true;
        verification.ExpirationTime = currentDate.AddMinutes(this.config?.Value?.EncryptionConfiguration?.OTPExpirationInMinutes ?? 5);
        var verificationId = this.AddItem(verification);

        return await Task.FromResult(verificationId);
    }
}