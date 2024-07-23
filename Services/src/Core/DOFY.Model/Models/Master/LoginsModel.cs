namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Contracts.Interfaces.Public;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;
using System.Security.Cryptography;
using DOFY.Helper.Extensions;

public class LoginsModel : BaseModel<DBO.Logins>, ILoginsModel, IPublicLoginsModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public LoginsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.Logins Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.Logins, ViewEntities.Logins>(result);
            if (!string.IsNullOrEmpty(result?.PassWord) && (!string.IsNullOrEmpty(result?.Salt)) && (!string.IsNullOrEmpty(result?.IVKey)))
            {
                mapperResult.PassWord = RijndaelSecurityEncryption.DecryptwithRijndael(result.PassWord, result.Salt, result.IVKey);
            }

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.Logins> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.Logins>, IEnumerable<ViewEntities.Logins>>(results);

        return mapperResults;
    }

    public long Post(ViewEntities.Logins item)
    {
        var encryptedPasswrd = this.CreateEncryptionPasswords(item.PassWord);

        var mapperResult = this.mapper.Map<ViewEntities.Logins, DBO.Logins>(item);
        if (!encryptedPasswrd.Equals(default(ValueTuple<string, string, string>)))
        {
            mapperResult.PassWord = encryptedPasswrd.Item3.ToString();
            mapperResult.Salt = encryptedPasswrd.Item1.ToString();
            mapperResult.IVKey = encryptedPasswrd.Item2.ToString();
        }

        mapperResult.Active = true;
        mapperResult.RowOrder = mapperResult.RowOrder + 100;
        mapperResult.CompanyId = 1;

        var result = this.AddItem(mapperResult);

        return result;
    }

    public long Put(ViewEntities.Logins item)
    {
        var encryptedPasswrd = this.CreateEncryptionPasswords(item.PassWord);
        var mapperResult = this.mapper.Map<ViewEntities.Logins, DBO.Logins>(item);
        mapperResult.CompanyId = 1;
        mapperResult.Active = true;
        if (!encryptedPasswrd.Equals(default(ValueTuple<string, string, string>)))
        {
            mapperResult.PassWord = encryptedPasswrd.Item3.ToString();
            mapperResult.Salt = encryptedPasswrd.Item1.ToString();
            mapperResult.IVKey = encryptedPasswrd.Item2.ToString();
        }

        this.UpdateItem(mapperResult);

        return mapperResult.Id;
    }

    public long Post(ViewEntities.Logins item, IFormFileCollection postedFileCollection)
    {
        return this.Post(item);
    }

    public long Put(ViewEntities.Logins item, IFormFileCollection postedFileCollection)
    {
        return this.Put(item);
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

            return true;
        }

        return false;
    }

    public long AddOrUpdate(ViewEntities.Logins item)
    {
        if (item is not null)
        {
            item.Id = item.Id > 0 ? this.Put(item) : this.Post(item);
        }

        return item.Id;
    }

    public PagedList<Logins> GetLoginsList(SearchBaseCriteria criteria)
    {
        var param = new
        {
            SortOrder = criteria.SortOrderColumn + "," + criteria.SortOrder,
            WhereClause = criteria.SearchText,
            OffsetStart = criteria.OffsetStart,
            RowsPerPage = criteria.RowsPerPage,
        };

        var results = this.GetPagedSProcResultWithCriteria<Logins>(criteria, DOFYConstants.DataBase.SP_GetLoginsList, param);

        return results;
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
}
