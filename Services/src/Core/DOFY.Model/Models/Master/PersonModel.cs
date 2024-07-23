namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.Helper.Extensions;
using DOFY.UploadHelper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Security.Principal;

public class PersonModel : BaseModel<DBO.Person>, IPersonModel, IPublicPersonModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly string filePath;
    private readonly CountryContext context;

    public PersonModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.filePath = "user";
        this.context = requestContext;
    }

    public ViewEntities.Person Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Person, ViewEntities.Person>(result);
            mapperResult.UserLogin = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(result.LoginId);
            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.Person> GetList()
    {
        var results = this.ExecStoredProcedure<ViewEntities.Person>(DOFYConstants.DataBase.SP_GetPersonList, null);

        return results;
    }

    public long Post(ViewEntities.Person item, IFormFileCollection postedFileCollection)
    {
        return this.Post(item);
    }

    public long Put(ViewEntities.Person item, IFormFileCollection postedFileCollection)
    {
        return this.Put(item);
    }

    public long Post(ViewEntities.Person item)
    {
        if (item is not null && item?.UserLogin is not null)
        {
            var existingResult = new AuthModel(this.config, this.mapper, this.iPrincipal, this.context).GetLoginsDetailsbyUserName(item.UserLogin.UserName);
            if (existingResult is not null)
            {
                return -1;
            }

            var loginMapperResultId = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Post(item.UserLogin);
            var userMapperResult = new UserRolesModel(this.config, this.mapper, this.iPrincipal, this.context).RegisterUserRoles(loginMapperResultId, item.UserRoleId);

            item.Active = true;
            item.LoginId = loginMapperResultId;
            item.UserRoleId = userMapperResult;
            var personMappedResult = this.mapper.Map<ViewEntities.Person, DBO.Person>(item);

            var result = this.AddItem(personMappedResult);

            new AuthModel(this.config, this.mapper, this.iPrincipal, this.context)?.Login(item.UserLogin.UserName);

            return result;
        }

        return default;
    }

    public long Put(ViewEntities.Person item)
    {
        if (item is not null && item?.UserLogin is not null)
        {
            var results = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).AddOrUpdate(item.UserLogin);

            var personMappedResult = this.mapper.Map<ViewEntities.Person, DBO.Person>(item);
            personMappedResult.Active = true;
            this.UpdateItem(personMappedResult);

            return personMappedResult.Id;
        }

        return default;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public bool Remove(long id)
    {
        var result = this.FindItem(item => item.Id == id && item.Active == true);

        if (result is not null)
        {
            result.Active = false;
            this.Update(result);
            new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context)?.Remove(result.LoginId);
            new UserRolesModel(this.config, this.mapper, this.iPrincipal, this.context)?.Remove(result.LoginId);

            return true;
        }

        return false;
    }

    public IEnumerable<ViewEntities.Person> GetPersonsByRoleId(long roleId)
    {
        var param = new
        {
            RoleId = roleId,
        };

        var results = this.ExecStoredProcedure<Person>(DOFYConstants.DataBase.SP_GetUsersByRoleId, param);

        return results;
    }

    public ViewEntities.Person GetPersonsByLoginId(long loginId)
    {
        var result = this.FindItem(item => item.LoginId == loginId);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Person, ViewEntities.Person>(result);
            mapperResult.UserLogin = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(mapperResult.LoginId);

            mapperResult.RoleId = new UserRolesModel(this.config, this.mapper, this.principle, this.context).FindById(result.UserRoleId)?.RoleId;

            return mapperResult;
        }

        return default;
    }

    public long AddOrUpdate(ViewEntities.Person item)
    {
        if (item is not null)
        {
            item.Id = item.Id > 0 ? this.Put(item) : this.Post(item);
        }

        return item.Id;
    }

    public Task<PagedList<Person>> GetPersonList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
            IsPublic = criteria.IsPublic ?? null,
        };

        var results = base.GetPagedSProcResultWithCriteria<Person>(criteria, DOFYConstants.DataBase.SP_GetPersonList, param);

        return Task.FromResult(results);
    }

    public IEnumerable<Person> GetAssigneeList()
    {
        var results = this.ExecStoredProcedure<Person>(DOFYConstants.DataBase.SP_GetAssigneeList, null);

        return results;
    }

    public ViewEntities.AssigneeDetailsViewModel GetAssigneeDetail(long id)
    {
        var param = new
        {
            PersonId = id,
        };

        var results = this.ExecStoredProcedure<AssigneeDetailsViewModel>(DOFYConstants.DataBase.SP_GetAssigneeDetails, param);

        return results?.FirstOrDefault();
    }

    public async Task<long> PostUser(ViewEntities.Users item)
    {
        if (item is not null && item?.UserLogin is not null)
        {
            var existingResult = new AuthModel(this.config, this.mapper, this.iPrincipal, this.context).GetLoginsDetailsbyUserName(item.UserLogin.UserName);
            if (existingResult is not null)
            {
                return -1;
            }

            var loginMapperResultId = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Post(item.UserLogin);
            var userMapperResult = new UserRolesModel(this.config, this.mapper, this.iPrincipal, this.context).RegisterUserRoles(loginMapperResultId, item?.RoleId ?? 0);

            item.Active = true;
            item.LoginId = loginMapperResultId;
            item.UserRoleId = userMapperResult;
            var personMappedResult = this.mapper.Map<ViewEntities.Users, DBO.Person>(item);
            personMappedResult.UploadImagePath = this.filePath;

            var result = this.AddItem(personMappedResult);

            if (item?.UploadFiles?.Count() > 0)
            {
                if (this.config?.Value.AWSConfiguration?.EnableS3 == true)
                {
                    string filePath = string.Concat(this.filePath, "/", result);
                    IEnumerable<string>? filePathList = await new S3ClientHelperService(this.config, this.GetS3FolderName(this.context.CountryCode)).SaveAttachmentsToS3(item?.UploadFiles, filePath);
                }
                else
                {
                    string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                    $"{this.filePath}", $"{result}");
                    IEnumerable<string>? filePathList = await item?.UploadFiles.SaveAttachments(filePath);
                }
            }

            if (!string.IsNullOrEmpty(item.Address))
            {
                var addressId = new UserAddressModel(this.config, this.mapper, this.iPrincipal, this.context).AddorUpdateUserAddress(item, result);
            }

            return result;
        }

        return default;
    }

    public async Task<long> PutUser(ViewEntities.Users item)
    {
        if (item is not null && item?.UserLogin is not null)
        {
            var results = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).AddOrUpdate(item.UserLogin);

            var userMapperResult = new UserRolesModel(this.config, this.mapper, this.iPrincipal, this.context).UpdateUserRole(item.LoginId, item?.RoleId ?? 0);

            var personMappedResult = this.mapper.Map<ViewEntities.Users, DBO.Person>(item);
            personMappedResult.Active = true;
            personMappedResult.UploadImagePath = this.filePath;
            this.UpdateItem(personMappedResult);

            if (item?.UploadFiles?.Count() > 0)
            {
                if (this.config?.Value.AWSConfiguration?.EnableS3 == true)
                {
                    string filePath = string.Concat(this.filePath, "/", personMappedResult?.Id);
                    IEnumerable<string>? filePathList = await new S3ClientHelperService(this.config, this.GetS3FolderName(this.context.CountryCode)).SaveAttachmentsToS3(item?.UploadFiles, filePath);
                }
                else
                {
                    string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                        $"{this.filePath}", $"{personMappedResult?.Id}");
                    IEnumerable<string>? filePathList = await item?.UploadFiles.SaveAttachments(filePath);
                }
            }

            if (!string.IsNullOrEmpty(item.Address))
            {
                var addressId = new UserAddressModel(this.config, this.mapper, this.iPrincipal, this.context).AddorUpdateUserAddress(item, item.Id);
            }

            return personMappedResult.Id;
        }

        return default;
    }

    public ViewEntities.Users GetUserByPersonId(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var userRole = new UserRolesModel(this.config, this.mapper, this.iPrincipal, this.context).FindItem(x => x.LoginId == result.LoginId && x.Active == true);

            var data = JsonConvert.SerializeObject(result);
            var mapperResult = JsonConvert.DeserializeObject<ViewEntities.Users>(data);

            mapperResult.UserLogin = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(mapperResult.LoginId);

            var address = new UserAddressModel(this.config, this.mapper, this.iPrincipal, this.context).GetUserAddress(result.Id);

            if (address is not null)
            {
                mapperResult.Address = address.Address;
                mapperResult.StateId = address.StateId;
                mapperResult.CityId = address.CityId;
                mapperResult.PinCode = address.PinCode;
                mapperResult.RoleId = userRole?.RoleId;
                mapperResult.LocationId = address.LocationId;
            }

            return mapperResult;
        }

        return default;
    }

    public async Task<Person> GetPersonByOrderId(long orderId)
    {
        DBO.Person person = this.FindItem(item => item.Id == orderId && item.Active == true);
        if (person is not null)
        {
            ViewEntities.Person mappedResult = this.mapper.Map<DBO.Person, ViewEntities.Person>(person);

            return await Task.FromResult(mappedResult);
        }

        return default;
    }

    public async Task<(byte[] fileContent, string fileName)> GetUserProfileImage(long personId)
    {
        DBO.Person userProfile = this.FindItem(item => item.Id == personId && item.Active == true);
        if (userProfile is not null)
        {
            string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                            userProfile?.UploadImagePath, userProfile?.Id.ToString(), userProfile?.UploadImageName);

            byte[] fileContent = await File.ReadAllBytesAsync(filePath);

            return (fileContent: fileContent, fileName: userProfile.UploadImageName);
        }

        return default;
    }

    public async Task<string> GetBase64ProfileImage(long personId)
    {
        DBO.Person userProfile = this.FindItem(item => item.Id == personId && item.Active == true);
        string base64String = null;

        if (userProfile is not null)
        {
            if (this.config?.Value.AWSConfiguration?.EnableS3 == true)
            {
                string filePath = string.Concat(this.filePath, "/", userProfile.Id, "/", userProfile?.UploadImageName);
                var resultByte = await new S3ClientHelperService(this.config, this.GetS3FolderName(this.context.CountryCode)).FileDownloadAsync(filePath);
                base64String = Convert.ToBase64String(resultByte);

                return base64String;
            }
            else
            {
                string filePath = Path.Combine(this.config.Value.ApplicationConfiguration.AttachmentFilePath,
                          userProfile?.UploadImagePath, userProfile?.Id.ToString(), userProfile?.UploadImageName);

                using (System.Drawing.Image image = System.Drawing.Image.FromFile(filePath))
                {
                    using (MemoryStream m = new MemoryStream())
                    {
                        image.Save(m, image.RawFormat);
                        byte[] imageBytes = m.ToArray();
                        base64String = Convert.ToBase64String(imageBytes);
                        return base64String;
                    }
                }
            }
        }

        return base64String;
    }

    public bool DeleteUser(long PersonId)
    {
        var mapperResult = new OrdersModel(this.config, this.mapper, this.iPrincipal, this.context).FindItems(x => x.Active == true && x.PersonId == PersonId);
        var personResult = this.FindItem(x => x.Active == true && x.Id == PersonId);

        if (mapperResult?.Count() > 0)
        {
            foreach (var res in mapperResult)
            {
                if (res.StatusId == (long)STATUS_ENUM.SCHEDULED || res.StatusId == (long)STATUS_ENUM.INPROGRESS || res.StatusId == (long)STATUS_ENUM.ASSINGED || res.StatusId == (long)STATUS_ENUM.RESCHEDULED || res.StatusId == (long)STATUS_ENUM.REQUOTE)
                {
                    return false;
                }
            }
        }

        if (personResult is not null)
        {
            Person result = this.CreateOTP(personResult);
        }

        return true;
    }

    private Person CreateOTP(DBO.Person personResult)
    {
        string randomNumber = new AuthModel(this.config, this.mapper, this.iPrincipal, this.context).GenerateRandomKey();

        var verficationCodeModel = new VerificationCodeModel(this.config, this.mapper, this.iPrincipal, this.context);
        var result = verficationCodeModel.RegisterVerficationCode(personResult.LoginId, randomNumber);

        var template = new EmailTemplatesModel(this.config, this.mapper, this.iPrincipal, this.context);
        long pendingemailId = template.AccountDeletionOTP(personResult.LoginId, randomNumber);

        return this.mapper.Map<Person>(personResult);
    }

    public bool VerifyUser(long PersonId, string Password)
    {
        var verificationCodeModel = new VerificationCodeModel(this.config, this.mapper, this.iPrincipal, this.context);
        var Login = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context);

        var person = this.FindItem(x => x.Active == true && x.Id == PersonId);
        var loginData = Login.FindItem(x => x.Active == true && x.Id == person.LoginId);
        var code = verificationCodeModel.FindItems(x => x.PersonId == person.Id && x.Active == true)?.Where(x => x.OrderId == null)?.OrderByDescending(x => x.Id)?.FirstOrDefault();

        if (code != null && code.Verified == false && code.VerificationNumber.ToString() == Password && code.ExpirationTime > Helper.Extensions.DateTimeExtensions.GetCurrentIST())
        {
            code.Verified = true;
            person.Active = false;
            loginData.Active = false;

            this.UpdateItem(person);
            Login.UpdateItem(loginData);
            verificationCodeModel.UpdateItem(code);

            return true;
        }

        return false;
    }
}
