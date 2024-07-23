namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts.Interfaces;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class PersonRatingModel : BaseModel<DBO.PersonRating>, IPublicPersonRatingModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public PersonRatingModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
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

    public ViewEntities.PersonRating Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.PersonRating, ViewEntities.PersonRating>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.PersonRating> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.PersonRating>, IEnumerable<ViewEntities.PersonRating>>(results);

        return mapperResults;
    }

    public  PersonRating GetPersonRating(long PersonId)
    {
        var result = this.FindItem(item => item.PersonId == PersonId);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.PersonRating, ViewEntities.PersonRating>(result);

            return mapperResult;
        }

        return default;
    }

    public long Post(PersonRating item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Post(PersonRating item)
    {
        throw new NotImplementedException();
    }

    public long Put(PersonRating item, IFormFileCollection postedFileCollection)
    {
        throw new NotImplementedException();
    }

    public long Put(PersonRating item)
    {
        throw new NotImplementedException();
    }

    public bool Remove(long id)
    {
        throw new NotImplementedException();
    }
}
