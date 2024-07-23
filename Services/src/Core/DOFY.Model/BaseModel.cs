namespace DOFY.Model;

using AutoMapper;
using Cache;
using DAL;
using DataTables.AspNet.Core;
using DBO;
using DOFY.Helper.Extensions;
using Helper;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Security.Principal;

public class BaseModel<T> : Repository<T>
                                      where T : EntityBase
{
    protected readonly IMapper mapper;
    private readonly IOptionsSnapshot<AppConfiguration> config;
    protected readonly IPrincipal? principle;
    private readonly CountryContext context;

    public BaseModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal? principle = null, string connectionString = null, CountryContext requestContext = null)
                            : base(typeof(T).Name, iConfig, connectionString)
    {
        this.mapper = iMapper;
        this.principle = principle;
        this.config = iConfig;
        this.context = requestContext;
        this.UserId = GetUserId(principle as ClaimsPrincipal);
    }

    public static long GetUserId(ClaimsPrincipal? claims)
    {
        var dict = new Dictionary<string, string>();
        long userId = 0;

        if (claims != null)
        {
            claims.Claims.ToList().ForEach(item => dict.Add(item.Type, item.Value));

            if (dict != null && dict.Count() > 0)
            {
                try
                {
                    var tokens = new JwtSecurityToken(jwtEncodedString: dict["token"]);
                    userId = Convert.ToInt32(tokens.Claims.First(c => c.Type == "PersonId").Value);
                }
                catch (Exception ex)
                {
                    return userId;
                }
            }
        }
        return userId;
    }

    public static string GetConnectionString(CountryContext context, DatabaseConfiguration database)
    {
        var result = database.ConnectionStringIndia;

        if (context != null)
        {
            var countryCode = context.CountryCode;

            if (countryCode != null && countryCode == DOFYConstants.UAE)
            {
                result = database.ConnectionStringUAE;
            }
        }

        return result;
    }

    public string GetS3FolderName (string countryCode)
    {
        var result = string.Empty;
        switch (countryCode)
        {
            case "ae":
                result = "UAE";
                break;
        }

        return result;
    }

    public bool ActiveStatus { get; set; }

    public bool LoadFromCache { get; set; }

    public long? UserId { get; set; }

    public virtual IEnumerable<T> GetAllItems()
    {
        IEnumerable<T> items = this.LoadFromCache ? DOFYCache<T>.GetAllEntities() : default(IEnumerable<T>);
        items = items?.Where(x => x.CountryCode == this.context.CountryCode);

        if (items == null || items.Count() == 0)
        {
            items = this.GetAll();
            if (this.LoadFromCache)
            {
                DOFYCache<T>.AddUpdateEntities(items);
            }
        }

        return items;
    }

    public virtual PagedList<T> GetAllItems(
                                            Expression<Func<T, bool>> predicate,
                                            SortExpression<T>[] sortExpressions,
                                            IEnumerable<string> searchColumns,
                                            string searchValue,
                                            int startIndex = 1,
                                            int itemsCount = 10,
                                            bool paging = true)
    {
        return this.GetAll(predicate, sortExpressions, searchColumns, searchValue, startIndex, itemsCount, paging);
    }

    public virtual T GetItem(long id)
    {
        T item = this.LoadFromCache ? DOFYCache<T>.GetEntity(id) : default(T);
        if (item == null)
        {
            item = this.FindById(id);
            if (this.LoadFromCache)
            {
                DOFYCache<T>.AddUpdateEntities(this.GetAllItems());
            }
        }

        return item;
    }

    public virtual T FindItemById(long id)
    {
        var item = this.LoadFromCache ? DOFYCache<T>.GetAllEntities()?.Where(x => x.CountryCode == this.context?.CountryCode).FirstOrDefault(entity => entity.Id == id) : default(T);
        if (item == null)
        {
            item = this.FindById(id);
            if (this.LoadFromCache)
            {
                DOFYCache<T>.AddUpdateEntities(this.GetAllItems());
            }
        }

        return item;
    }

    public virtual IEnumerable<T> FindItemsById(IEnumerable<long> ids)
    {
        var items = this.LoadFromCache ? DOFYCache<T>.GetAllEntities()?.Where(entity => ids.Contains(entity.Id)) : default(IEnumerable<T>);
        items = items?.Where(x => x.CountryCode == this.context?.CountryCode);
        if (items == null || items.Count() == 0)
        {
            items = this.FindByIds(ids);
            if (this.LoadFromCache)
            {
                DOFYCache<T>.AddUpdateEntities(this.GetAllItems());
            }
        }

        return items;
    }

    public virtual T FindItem(Expression<Func<T, bool>> predicate)
    {
        var items = this.LoadFromCache ? DOFYCache<T>.GetAllEntities()?.Where(predicate.Compile()) : default(IEnumerable<T>);
        items = items?.Where(x => x.CountryCode == this.context?.CountryCode);
        if (items == null || items?.Count() <= 0)
        {
            items = this.Find(predicate);
            if (this.LoadFromCache)
            {
                DOFYCache<T>.AddUpdateEntities(this.GetAllItems());
            }
        }

        return items?.FirstOrDefault();
    }

    public virtual IEnumerable<T> FindItems(Expression<Func<T, bool>> predicate)
    {
        var items = this.LoadFromCache ? DOFYCache<T>.GetAllEntities()?.Where(predicate.Compile()) : default(IEnumerable<T>);
        items = items?.Where(x => x.CountryCode == this.context?.CountryCode);
        if (items == null || items.Count() == 0)
        {
            var allItems = this.GetAllItems();
            items = this.LoadFromCache ? allItems?.Where(predicate.Compile()) : this.Find(predicate);
            if (this.LoadFromCache)
            {
                DOFYCache<T>.AddUpdateEntities(allItems);
            }
        }

        return items;
    }

    public virtual long AddItem(T item)
    {
        if (item.IsValid)
        {
            item.Created = DateTimeExtensions.GetCurrentIST();
            item.Modified = DateTimeExtensions.GetCurrentIST();
            item.CreatedBy = this.AddUpdateModifiedBy();
            item.ModifiedBy = this.AddUpdateModifiedBy();
            item.Id = this.Add(item);

            if (this.LoadFromCache)
            {
                DOFYCache<T>.AddUpdateEntity(this.FindById(item.Id));
            }
        }

        return item.Id;
    }

    public virtual IEnumerable<long> AddItems(List<T> items)
    {
        var isValid = true;
        IEnumerable<long> result = new List<long>();
        if (items?.Count > 0)
        {
            foreach (T item in items)
            {
                item.Created = DateTimeExtensions.GetCurrentIST();
                item.Modified = DateTimeExtensions.GetCurrentIST();
                item.CreatedBy = this.AddUpdateModifiedBy();
                item.ModifiedBy = this.AddUpdateModifiedBy();
                if (!item.IsValid)
                {
                    isValid = false;
                }
            }

            if (isValid)
            {
                result = this.AddBulk(items);

                if (this.LoadFromCache)
                {
                    DOFYCache<T>.AddUpdateEntities(items);
                }
            }
        }

        return result;
    }

    public virtual void UpdateItem(T item)
    {
        if (item.IsValid)
        {
            item.Created = item?.Created is not null ? item.Created : DateTimeExtensions.GetCurrentIST();
            item.Modified = DateTimeExtensions.GetCurrentIST();
            item.ModifiedBy = this.AddUpdateModifiedBy();
            this.Update(item);
            if (this.LoadFromCache)
            {
                DOFYCache<T>.AddUpdateEntity(this.FindById(item.Id));
            }
        }
    }

    public virtual void UpdateItems(List<T> items)
    {
        var isValid = true;
        foreach (T item in items)
        {
            item.Created = item?.Created is not null ? item.Created : DateTimeExtensions.GetCurrentIST();
            item.Modified = DateTimeExtensions.GetCurrentIST();
            item.ModifiedBy = this.AddUpdateModifiedBy();
            if (!item.IsValid)
            {
                isValid = false;
            }
        }

        if (isValid)
        {
            this.UpdateBulk(items);
            if (this.LoadFromCache)
            {
                DOFYCache<T>.AddUpdateEntities(items);
            }
        }
    }

    public virtual void DeleteItem(long id)
    {
        this.Delete(id);

        if (this.LoadFromCache)
        {
            DOFYCache<T>.RemoveEntity(id);
        }
    }

    public virtual void RemoveItem(T item)
    {
        this.Remove(item);

        if (this.LoadFromCache)
        {
            DOFYCache<T>.RemoveEntity(item.Id);
        }
    }

    public long AddUpdateModifiedBy()
    {
        return this.UserId ?? 0;
    }

    protected internal PagedList<TOut> GetPagedViewResult<TOut>(
                                                         IDataTablesRequest request,
                                                         Expression<Func<TOut, bool>> predicate,
                                                         string entityName,
                                                         bool paging = true)
                                                         where TOut : new()
    {
        var searchableColumns = request.Columns.Where(item => item.IsSearchable).Select(item => item.Field);
        var sortedColumns = request.Columns.GetSortedColumns();
        var sortExpressions = sortedColumns.ConstructSortExpressions<TOut>();

        var results = this.ExecPagedViewResult<TOut>(entityName, predicate, sortExpressions.ToArray(), searchableColumns, request.Search.Value, request.Start, request.Length, paging);

        return new PagedList<TOut>(results, request.Start, results.RecordsCount, results.Count);
    }

    protected internal PagedList<TOut> GetPagedSProcResult<TOut>(IDataTablesRequest request, string entityName, dynamic param, bool paging = true)
                                                                                                                                where TOut : new()
    {
        var results = this.ExecPagedStoredProcedure<TOut>(entityName, param);
        return new PagedList<TOut>(results, request?.Start ?? 0, results?.RecordsCount ?? 0, results?.Count ?? 0);
    }

    protected internal PagedList<TOut> GetPagedSProcResultWithCriteria<TOut>(ViewEntities.SearchBaseCriteria criteria, string entityName, dynamic param, bool paging = true)
                                                                                                                               where TOut : new()
    {
        var results = this.ExecPagedStoredProcedure<TOut>(entityName, param);
        return new PagedList<TOut>(results, criteria?.OffsetStart ?? 0, results?.RecordsCount ?? 0, results?.Count ?? 0);
    }

    protected internal List<TOut> GetListStoredProcResult<TOut>(string entityName, dynamic param, bool paging = true)
                                                                                                                where TOut : new()
    {
        var results = this.ExecStoredProcedure<TOut>(entityName, param);
        return results;
    }

    protected internal PagedList<TOut> GetPagedSProcResult<TOut>(string entityName, dynamic param, bool paging = true)
                                                                                                    where TOut : new()
    {
        var results = this.ExecPagedStoredProcedure<TOut>(entityName, param);
        return new PagedList<TOut>(results, 0, results?.RecordsCount ?? 0, results?.Count ?? 0);
    }
}
