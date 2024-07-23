using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using DOFY.ViewEntities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Security.Principal;

namespace DOFY.Model
{
    public class CurrencyConvertorModel : BaseModel<DBO.CurrencyConvertor>, ICurrencyConvertorModel
    {
        private readonly IOptionsSnapshot<AppConfiguration> config;
        private new readonly IMapper mapper;
        private readonly IPrincipal iPrincipal;
        private readonly CountryContext context;

        public CurrencyConvertorModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
            : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
        {
            this.config = iConfig;
            this.mapper = iMapper;
            this.iPrincipal = iPrincipal;
            this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
            this.context = requestContext;
        }

        public ViewEntities.CurrencyConvertor Get(long id)
        {
            var result = this.FindItem(item => item.Id == id);

            if (result is not null)
            {
                var mapperResult = this.mapper.Map<DBO.CurrencyConvertor, ViewEntities.CurrencyConvertor>(result);

                return mapperResult;
            }

            return default;
        }

        public IEnumerable<ViewEntities.CurrencyConvertor> GetList()
        {
            var result = this.FindItems(item => item.Active == true);

            if (result is not null)
            {
                var mapperResult = this.mapper.Map<IEnumerable<DBO.CurrencyConvertor>, IEnumerable<ViewEntities.CurrencyConvertor>>(result);

                return mapperResult;
            }

            return default;
        }

        public ViewEntities.CurrencyConvertor GetCurrency()
        {
            var result = this.FindItem(item => item.Active == true);

            if (result is not null)
            {
                var mapperResult = this.mapper.Map<DBO.CurrencyConvertor, ViewEntities.CurrencyConvertor>(result);

                return mapperResult;
            }

            return default;
        }

        public long Post(ViewEntities.CurrencyConvertor item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.CurrencyConvertor, DBO.CurrencyConvertor>(item);
            var result = this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ViewEntities.CurrencyConvertor item)
        {
            var mapperResult = this.mapper.Map<ViewEntities.CurrencyConvertor, DBO.CurrencyConvertor>(item);
            var existingResult = this.FindItems(x => x.Active == true);

            if (existingResult.Count() > 0)
            {
                foreach (var result in existingResult)
                {
                    result.Active = false;
                    this.UpdateItem(result);
                }
            }

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public bool Remove(long id)
        {
            var CurrencyConverter = this.FindById(id);

            if (CurrencyConverter is not null)
            {
                CurrencyConverter.Active = false;
                this.UpdateItem(CurrencyConverter);

                return true;
            }

            return false;
        }

        public long Post(ViewEntities.CurrencyConvertor item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.CurrencyConvertor, DBO.CurrencyConvertor>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        public long Put(ViewEntities.CurrencyConvertor item, IFormFileCollection postedFileCollection)
        {
            var mapperResult = this.mapper.Map<ViewEntities.CurrencyConvertor, DBO.CurrencyConvertor>(item);

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
        {
            throw new NotImplementedException();
        }

        public PagedList<ViewEntities.CurrencyConvertor> GetPagedList(IDataTablesRequest request)
        {
            throw new NotImplementedException();
        }

        //    public long AddOrUpdateItems(CurrencyConvertor item)
        //    {
        //        if (item is not null)
        //        {
        //            long id = item.Amount.Value().Id ?? 0;
        //            var variants = this.FindItems(item => item.Id == id && item.Active == true);

        //            foreach (var item in item.Amount)
        //            {
        //                var result = variants?.Where(x => x.Id == item.Id)?.FirstOrDefault();
        //                if (result is not null)
        //                {
        //                    result.Amount = item.Amount;

        //                    this.UpdateItem(result);
        //                }

        //            }
        //        }

        //        return default;
        //    }
    }
}
