namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts.Interfaces;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Principal;

public class UserAddressModel : BaseModel<DBO.UserAddress>, IPublicUserAddressModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly CountryContext context;

    public UserAddressModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.context = requestContext;
    }

    public UserAddress Get(long id)
    {
        var result = this.FindItem(item => item.Id == id && item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.UserAddress, ViewEntities.UserAddress>(result);
            return mapperResult;
        }

        return default;
    }

    public IEnumerable<UserAddress> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResult = this.mapper.Map<IEnumerable<DBO.UserAddress>, IEnumerable<ViewEntities.UserAddress>>(results);

        return mapperResult;
    }

    public long Post(UserAddress item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Post(UserAddress item)
    {
        if (item is not null)
        {
            if (item.IsDefault) { this.MarkAsDefault(item.PersonId); }

            var mapperResult = this.mapper.Map<ViewEntities.UserAddress, DBO.UserAddress>(item);
            mapperResult.Active = true;
            var result = this.AddItem(mapperResult);

            return result;
        }

        return default;
    }

    public long Put(UserAddress item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Put(UserAddress item)
    {
        if (item is not null)
        {
            if (item.IsDefault) { this.MarkAsDefault(item.PersonId); }
            var mapperResult = this.mapper.Map<ViewEntities.UserAddress, DBO.UserAddress>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public bool Remove(long id)
    {
        var mapperResult = this.FindById(id);
        if (mapperResult is not null)
        {
            mapperResult.Active = false;
            this.UpdateItem(mapperResult);
            return true;
        }

        return false;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public PagedList<UserAddressViewModel> GetPersonAddress( long personId)
    {
        var param = new
        {
            PersonId = personId,
        };

        var results = this.GetPagedSProcResult<UserAddressViewModel>( DOFYConstants.DataBase.SP_GetPersonAddress, param);

        return results;
    }

    public ViewEntities.UserAddress GetUserAddress(long personId)
    {
        var result = this.FindItems(x => x.PersonId == personId && x.Active == true && x.IsDefault == true)?.FirstOrDefault();

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.UserAddress, ViewEntities.UserAddress>(result);

            return mapperResult;
        }

        return default;
    }

    public long AddorUpdateUserAddress(ViewEntities.Users item, long personId)
    {
        var oldAddress = this.FindItems(x => x.PersonId == personId && x.Active == true && x.IsDefault == true);

        if (oldAddress?.Count() > 0)
        {
            var addressToUpdate = oldAddress.First();
            addressToUpdate.Address = item.Address;
            addressToUpdate.PinCode = item.PinCode;
            addressToUpdate.StateId = item.StateId;
            addressToUpdate.CityId = item.CityId;
            addressToUpdate.IsDefault = true;
            addressToUpdate.LocationId = item.LocationId;
            addressToUpdate.LocationPin = item.LocationPin;

            this.UpdateItem(addressToUpdate);
        }
        else
        {
            var addressToAdd = new DBO.UserAddress()
            {
                PersonId = personId,
                AddressTypeId = (long)ADDRESS_TYPE_ENUM.HOME,
                Address = item.Address,
                StateId = item.StateId,
                CityId = item.CityId,
                PinCode = item.PinCode,
                MobilePhone = item.Mobile,
                IsDefault = true,
                Active = true,
                EmailId = item.Email,
                RowOrder = 100,
                LocationId = item.LocationId,
                LocationPin = item.LocationPin,
            };

            this.AddItem(addressToAdd);
        }

        return personId;
    }

    private void MarkAsDefault(long personId)
    {
        DBO.UserAddress userAddress = this.FindItem(item => item.PersonId == personId && item.IsDefault == true && item.Active == true);
        if (userAddress is not null)
        {
            userAddress.IsDefault = false;
            this.UpdateItem(userAddress);
        }
    }
}
