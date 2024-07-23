namespace DOFY.Model;

using AutoMapper;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.Helper.Extensions;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Connections;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.ComponentModel;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Threading.Tasks;

public class AuthModel : BaseModel<DBO.Logins>, IAuthModel, IPublicAuthModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private new readonly IMapper mapper;
    private readonly IPrincipal? iPrincipal;
    private readonly CountryContext context;

    public AuthModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal? iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public void Dispose()
    { }

    public Logins Get(long id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Logins> GetList()
    {
        throw new NotImplementedException();
    }

    public async Task<Logins> Login(string phoneNumber)
    {
        var loginData = this.FindItem(item => item.Active == true && item.UserName.Trim() == phoneNumber.Trim());
        if (loginData is not null)
        {
            Logins result = this.CreateOTP(loginData);

            return await Task.FromResult(result);
        }

        return default;
    }

    public async Task<Logins> ForgetPassword(string email)
    {
        var personModel = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context);
        var personData = personModel.FindItem(item => item.Active == true && item.Email == email);
        if (personData != null)
        {
            var loginData = this.FindItem(item => item.Active == true && item.UserName.Trim() == personData.Mobile.Trim());
            if (loginData is not null)
            {
                Logins result = this.CreateOTPMail(loginData);

                return await Task.FromResult(result);
            }
        }

        return default;
    }

    public async Task<ViewEntities.Logins> AuthenticateWithOTP(string userName, string passWord)
    {
        var loginData = this.FindItem(item => item.UserName.Trim() == userName.Trim() && item.Active == true);
        if (loginData is not null)
        {
            Logins result = this.mapper.Map<DBO.Logins, ViewEntities.Logins>(loginData);

            if (this.config.Value.EncryptionConfiguration.IsDefaultPassword)
            {
                if (passWord.Equals(this.config.Value.EncryptionConfiguration.DefaultPassword))
                {
                    return await Task.FromResult(result);
                }
            }

            return await this.GetCredentialsWithOTP(result, passWord);
        }

        return default;
    }

    public async Task<ViewEntities.Logins> AuthenticateWithPassword(string userName, string passWord)
    {
        var logins = this.FindItems(item => item.UserName.Trim() == userName.Trim() && item.Active == true);
        if (logins?.Count() > 0)
        {
            foreach (var loginData in logins)
            {
                var encryptedPassword = this.EncryptPassword(passWord, loginData.Salt, loginData.IVKey);
                if (loginData.PassWord.Equals(encryptedPassword))
                {
                    Logins result = this.mapper.Map<DBO.Logins, ViewEntities.Logins>(loginData);
                    return result;
                }
            }
        }

        return default;
    }

    public async Task<ViewEntities.Logins> IsAuthenticate(string userName, string passWord)
    {
        var loginData = this.FindItem(item => item.UserName.Trim() == userName.Trim() && item.Active == true);
        if (loginData is not null)
        {
            Logins result = this.mapper.Map<DBO.Logins, ViewEntities.Logins>(loginData);

            if (this.config.Value.EncryptionConfiguration.IsDefaultPassword)
            {
                if (passWord.Equals(this.config.Value.EncryptionConfiguration.DefaultPassword))
                {
                    return await Task.FromResult(result);
                }
            }

            return await this.CredentialGatewayAsync(result, passWord);
        }

        return default;
    }

    private (string, string, string) CreateEncryptionPasswords(string passWord)
    {
        if (!string.IsNullOrEmpty(passWord))
        {
            string salt = string.Empty;
            string ivKey = string.Empty;
            string encryptPassword = string.Empty;

            using (Rijndael myRijndael = Rijndael.Create())
            {
                salt = RijndaelSecurityEncryption.ByteArrayToHexaString(myRijndael.Key);
                ivKey = RijndaelSecurityEncryption.ByteArrayToHexaString(myRijndael.IV);
                encryptPassword = RijndaelSecurityEncryption.EncryptwithRijndael(passWord, salt, ivKey);
            }

            return (salt, ivKey, encryptPassword);
        }

        return default;
    }

    public string GenerateRandomKey()
    {
        Random rnd = new Random();
        int digits = this.config?.Value?.EncryptionConfiguration?.RandomDigitsCount ?? 0;
        string randomNumber = rnd.Next((int)Math.Pow(10, digits - 1), (int)Math.Pow(10, digits) - 1).ToString();

        return randomNumber;
    }

    private bool UpdateVerificationCode(long id, string passWord)
    {
        var verficationCodeModel = new VerificationCodeModel(this.config, this.mapper, this.iPrincipal, this.context);
        var verficationCode = verficationCodeModel.FindItem(item => item.PersonId == id && item.Verified == false && item.Active == true && item.VerificationNumber.ToString() == passWord);
        if (verficationCode is not null)
        {
            verficationCode.Verified = true;
            verficationCodeModel.Update(verficationCode);

            return true;
        }

        return false;
    }

    public Logins GetLoginsDetailsbyUserName(string username)
    {
        var result = this.FindItem(item => item.UserName == username && item.Active == true);

        if (result is null)
        {
            return default;
        }

        var mapperResult = this.mapper.Map<DBO.Logins, ViewEntities.Logins>(result);

        return mapperResult;
    }

    public string DecryptPassword(string encrytedPassword)
    {
        var result = this.FindItem(item => item.PassWord == encrytedPassword);
        if (result is null)
        {
            return default;
        }

        string decrptedPassword = RijndaelSecurityEncryption.DecryptwithRijndael(result.PassWord, result.Salt, result.IVKey);

        return decrptedPassword;
    }

    private string EncryptPassword(string passWord, string salt, string ivKey)
    {
        if (!string.IsNullOrWhiteSpace(passWord) && !string.IsNullOrWhiteSpace(salt) && !string.IsNullOrWhiteSpace(ivKey))
        {
            using (Rijndael myRijndael = Rijndael.Create())
            {
                // Decrypt the bytes to a string.
                string encyPassword = RijndaelSecurityEncryption.EncryptwithRijndael(passWord, salt, ivKey);
                return encyPassword;
            }
        }



        return default;
    }
    public Person GetPersonByLoginId(long loginId)
    {
        var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).
                                     GetPersonsByLoginId(loginId);
        if (person is null)
        {
            return default;
        }

        return person;
    }

    private Logins CreateOTP(DBO.Logins loginData)
    {
        string randomNumber = this.GenerateRandomKey();

        var verficationCodeModel = new VerificationCodeModel(this.config, this.mapper, this.iPrincipal, this.context);
        var result = verficationCodeModel.RegisterVerficationCode(loginData.Id, randomNumber);

        var template = new EmailTemplatesModel(this.config, this.mapper, this.iPrincipal, this.context);
        long pendingemailId = template.LogOTP(loginData.Id, randomNumber);

        return this.mapper.Map<Logins>(loginData);
    }

    private Logins CreateOTPMail(DBO.Logins loginData)
    {
        string randomNumber = this.GenerateRandomKey();

        var verficationCodeModel = new VerificationCodeModel(this.config, this.mapper, this.iPrincipal, this.context);
        var result = verficationCodeModel.RegisterVerficationCode(loginData.Id, randomNumber);

        var template = new EmailTemplatesModel(this.config, this.mapper, this.iPrincipal, this.context);
        long pendingemailId = template.LogOTP(loginData.Id, randomNumber);

        return this.mapper.Map<Logins>(loginData);
    }

    public async Task<Logins> AdminLogin(string userName, string passWord)
    {
        var users = this.ExecViewResult<Logins>(DOFYConstants.DataBase.VW_LoginDetail, item => item.UserName == userName);

        users = users?.Where(item => item.RoleId != (long)ROLES_ENUM.PUBLIC);

        Logins? mapperResult = null;

        if (users?.Count() > 0)
        {
            foreach (var item in users)
            {
                string decrptedPassword = RijndaelSecurityEncryption.DecryptwithRijndael(item.PassWord, item.Salt, item.IVKey);

                if ((this.config.Value.EncryptionConfiguration.IsDefaultPassword && passWord.Equals(this.config.Value.EncryptionConfiguration.DefaultPassword)) || passWord.Equals(decrptedPassword))
                {
                    mapperResult = item;
                }
            }
        }

        return await Task.FromResult(mapperResult);
    }

    public async Task<Logins> ResetPassword(string username, string password, string updatedPassword)
    {
        if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password) && !string.IsNullOrEmpty(updatedPassword))
        {
            var result = this.FindItem(item => item.UserName == username && item.Active == true);
            if (result is not null)
            {
                string decrptedPassword = RijndaelSecurityEncryption.DecryptwithRijndael(result.PassWord, result.Salt, result.IVKey);

                if ((this.config.Value.EncryptionConfiguration.IsDefaultPassword && password.Equals(this.config.Value.EncryptionConfiguration.DefaultPassword)) || password.Equals(decrptedPassword))
                {
                    return await this.UpdateCredential(updatedPassword, result);
                }

                return default;
            }
        }

        return default;
    }

    public async Task<Logins> ResetPasswordUae(string username, string updatedPassword)
    {
        if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(updatedPassword))
        {
            var result = this.FindItem(item => item.UserName == username && item.Active == true);
            if (result is not null)
            {
                return await this.UpdateCredential(updatedPassword, result);
            }
        }

        return default;
    }

    public async Task<Logins> ResendOTP(string phoneNumber)
    {
        DBO.Logins logins = this.FindItem(loginItem => loginItem.UserName == phoneNumber && loginItem.Active == true);
        ViewEntities.Person personData = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).GetPersonsByLoginId(logins?.Id ?? 0);
        var verificationDataModel = new VerificationCodeModel(this.config, this.mapper, this.iPrincipal, this.context);
        verificationDataModel.InactivateOldOTP(personData.Id);

        return await this.Login(phoneNumber);
    }

    public async Task<bool> ValidateUserAsync(string phoneNumber)
    {
        var users = this.ExecViewResult<Logins>(DOFYConstants.DataBase.VW_LoginDetail, item => item.UserName == phoneNumber);

        if (users?.Count() > 0)
        {
            var result = users?.Where(x => x.RoleId != (long)ROLES_ENUM.PUBLIC);
            bool isValid = result?.Count() > 0 ? true : false;

            return await Task.FromResult(isValid);
        }

        return default;
    }

    private async Task<Logins> GetCredentialsWithOTP(Logins loginData, string passWord)
    {
        var verificationCodeModel = new VerificationCodeModel(this.config, this.mapper, this.iPrincipal, this.context);
        var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).GetPersonsByLoginId(loginData.Id);

        var code = verificationCodeModel.FindItems(x => x.PersonId == person.Id && x.Active == true)?.Where(x => x.OrderId == null)?.OrderByDescending(x => x.Id)?.FirstOrDefault();

        if (code != null && code.Verified == false && code.VerificationNumber.ToString() == passWord && code.ExpirationTime > Helper.Extensions.DateTimeExtensions.GetCurrentIST())
        {
            code.Verified = true;
            verificationCodeModel.UpdateItem(code);

            return await Task.FromResult(loginData);
        }

        return default;
    }

    private async Task<Logins> CredentialGatewayAsync(Logins loginData, string passWord)
    {
        string decrptedPassword = RijndaelSecurityEncryption.DecryptwithRijndael(loginData.PassWord, loginData.Salt, loginData.IVKey);
        if (passWord.Equals(decrptedPassword))
        {
            Logins result = this.mapper.Map<ViewEntities.Logins>(loginData);

            var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).GetPersonsByLoginId(loginData.Id);
            var verificationCode = new VerificationCodeModel(this.config, this.mapper, this.iPrincipal, this.context);
            if (await verificationCode.SubmitVerficationCodeAsync(person?.Id ?? 0))
            {
                return await Task.FromResult(result);
            }
        }

        return default;
    }

    private async Task<Logins> UpdateCredential(string updatedPassword, DBO.Logins result)
    {
        var cryptoCredentials = this.CreateEncryptionPasswords(updatedPassword);
        result.PassWord = Convert.ToString(cryptoCredentials.Item3);
        result.Salt = Convert.ToString(cryptoCredentials.Item1);
        result.IVKey = Convert.ToString(cryptoCredentials.Item2);
        this.Update(result);

        return await Task.FromResult(this.mapper.Map<DBO.Logins, ViewEntities.Logins>(result));
    }

    public async Task<Logins> AuthenticateWithEmail(string userName, string passWord)
    {
        var loginData = this.FindItem(item => item.UserName.Trim() == userName.Trim() && item.Active == true);
        if (loginData is not null)
        {
            var encryptedPassword = this.EncryptPassword(passWord, loginData.Salt, loginData.IVKey);
            if (loginData.PassWord.Equals(encryptedPassword))
            {
                Logins result = this.mapper.Map<DBO.Logins, ViewEntities.Logins>(loginData);
                return await Task.FromResult(result);
            }
        }

        return default;
    }
}
