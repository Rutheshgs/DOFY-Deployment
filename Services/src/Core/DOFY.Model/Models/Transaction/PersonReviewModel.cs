namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts.Interfaces;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Security.Principal;

public class PersonReviewModel : BaseModel<DBO.PersonReview>, IPublicPersonReviewModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public PersonReviewModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public ViewEntities.PersonReview Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.PersonReview, ViewEntities.PersonReview>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.PersonReview> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.PersonReview>, IEnumerable<ViewEntities.PersonReview>>(results);

        return mapperResults;
    }

    public PersonReview GetPersonReview(long OrderId)
    {
        var result = this.FindItem(item => item.OrderId == OrderId);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.PersonReview, ViewEntities.PersonReview>(result);

            return mapperResult;
        }

        return default;
    }

    public long Post(PersonReview item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Post(PersonReview item)
    {
        var mapperResult = this.mapper.Map<ViewEntities.PersonReview, DBO.PersonReview>(item);
        var result = this.AddItem(mapperResult);

        return mapperResult.Id;
    }

    public long Put(PersonReview item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Put(PersonReview item)
    {
        throw new NotImplementedException();
    }

    public bool Remove(long id)
    {
        throw new NotImplementedException();
    }
}
