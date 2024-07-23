namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

public class OrderPartsModel: BaseModel<DBO.OrderParts>, IEntityModel<ViewEntities.OrderParts>
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private readonly IMapper mapper;
    private readonly IPrincipal principal;
    private readonly CountryContext context;

    public OrderPartsModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.principal = iPrincipal;
        this.context = requestContext;
    }

    public ViewEntities.OrderParts Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.OrderParts, ViewEntities.OrderParts>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.OrderParts> GetList()
    {
        var result = this.FindItems(item => item.Active == true);

        if (result is not null)
        {
            var mapperResult = this.mapper.Map<IEnumerable<DBO.OrderParts>, IEnumerable<ViewEntities.OrderParts>>(result);

            return mapperResult;
        }

        return default;
    }

    public long Post(ViewEntities.OrderParts item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Post(ViewEntities.OrderParts item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.OrderParts, DBO.OrderParts>(item);
            mapperResult.Active = true;

            var result = this.AddItem(mapperResult);

            return result;
        }

        return default;
    }

    public long Put(ViewEntities.OrderParts item, IFormFileCollection postedFileCollection)
    {
        return default;
    }

    public long Put(ViewEntities.OrderParts item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.OrderParts, DBO.OrderParts>(item);

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

    public void AddOrUpdateItems(IEnumerable<ViewEntities.OrderParts> items, long orderId)
    {
        if (items?.Count() > 0)
        {
            foreach (var item in items)
            {
                item.OrderId = orderId;
                item.Id = item.Id > 0 ? this.Put(item) : this.Post(item);
            }
        }
    }

    public async void AddOrUpdateOrderParts(IEnumerable<ViewEntities.OrderParts> items, long orderId, long? seriesModelColorId)
    {
        var existingRecords = this.RemoveOldRecords(orderId);

        if (items?.Count() > 0)
        {
            var parts = this.GetPartList(items, seriesModelColorId);
            if (parts?.Count() > 0)
                {
                    foreach (var data in parts)
                    {
                        var orderPart = new DBO.OrderParts()
                        {
                            OrderId = orderId,
                            RepairTypeId = data.RepairTypeId ?? 0,
                            PartTypeId = data.Id,
                            RowOrder = data.RowOrder,
                        };

                        this.AddItem(orderPart);
                    }
                }
        }
    }

    public IEnumerable<DBO.PartType> GetPartList(IEnumerable<ViewEntities.OrderParts> items, long? seriesModelColorId)
    {
        var partList = new PartTypeModel(this.config, this.mapper, this.principal, this.context).FindItems(item => item.SeriesModelColorId == seriesModelColorId && item.Active == true);

        var result = new List<DBO.PartType>();

        foreach (var item in items)
        {
            var repairParts = partList?.Where(x => x.RepairTypeId == item.RepairTypeId);
            if (repairParts?.Count() > 0)
            {
                result.AddRange(repairParts);
            }
        }

        return result;
    }

    public long RemoveOldRecords(long orderId)
    {
        if (orderId > 0)
        {
            var orderParts = this.FindItems(item => item.OrderId == orderId && item.Active == true);

            if (orderParts?.Count() > 0)
            {
                foreach (var item in orderParts)
                {
                    item.Active = false;
                    this.UpdateItem(item);
                }
            }
        }

        return orderId;
    }
}
