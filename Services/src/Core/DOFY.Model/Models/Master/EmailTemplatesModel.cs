namespace DOFY.Model;

using AutoMapper;
using DataTables.AspNet.Core;
using DOFY.Contracts;
using DOFY.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Security.Principal;

public class EmailTemplatesModel : BaseModel<DBO.EmailTemplates>, IEmailTemplatesModel
{
    private readonly IOptionsSnapshot<AppConfiguration> config;
    private new readonly IMapper mapper;
    private readonly IPrincipal iPrincipal;
    private readonly string emailImagePath = string.Empty;
    private readonly CountryContext context;

    public EmailTemplatesModel(IOptionsSnapshot<AppConfiguration> iConfig, IMapper iMapper, IPrincipal iPrincipal = null, CountryContext requestContext = null)
        : base(iConfig, iMapper, iPrincipal, GetConnectionString(requestContext, iConfig?.Value.DatabaseConfiguration), requestContext)
    {
        this.config = iConfig;
        this.mapper = iMapper;
        this.iPrincipal = iPrincipal;
        this.LoadFromCache = iConfig?.Value?.ApplicationConfiguration?.MasterDataFromCache ?? false;
        this.emailImagePath = iConfig?.Value?.ApplicationConfiguration?.EmailImagePath ?? string.Empty;
        this.context = requestContext;
    }

    public ViewEntities.EmailTemplates Get(long id)
    {
        var result = this.FindItem(item => item.Id == id);
        if (result is not null)
        {
            var mapperResult = this.mapper.Map<DBO.EmailTemplates, ViewEntities.EmailTemplates>(result);

            return mapperResult;
        }

        return default;
    }

    public IEnumerable<ViewEntities.EmailTemplates> GetList()
    {
        var results = this.FindItems(item => item.Active == true);
        var mapperResults = this.mapper.Map<IEnumerable<DBO.EmailTemplates>, IEnumerable<ViewEntities.EmailTemplates>>(results);

        return mapperResults;
    }

    public long Post(ViewEntities.EmailTemplates item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.EmailTemplates, DBO.EmailTemplates>(item);

            this.AddItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Post(ViewEntities.EmailTemplates item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.EmailTemplates, DBO.EmailTemplates>(item);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.EmailTemplates item, IFormFileCollection postedFileCollection)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.EmailTemplates, DBO.EmailTemplates>(item);
            mapperResult.Created = DateTime.Now;

            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public long Put(ViewEntities.EmailTemplates item)
    {
        if (item is not null)
        {
            var mapperResult = this.mapper.Map<ViewEntities.EmailTemplates, DBO.EmailTemplates>(item);
            this.UpdateItem(mapperResult);

            return mapperResult.Id;
        }

        return default;
    }

    public bool Remove(long id)
    {
        var series = this.FindById(id);
        if (series is not null)
        {
            series.Active = false;
            this.UpdateItem(series);
            return true;
        }

        return false;
    }

    public byte[] Export(IDataTablesRequest request, string gridType, string fileHeader, long userId, long periodId)
    {
        throw new NotImplementedException();
    }

    public override IEnumerable<DBO.EmailTemplates> GetAllItems()
    {
        var results = this.ExecStoredProcedure<DBO.EmailTemplates>(DOFYConstants.DataBase.SP_GetEmailTemplatesList, null);

        return results;
    }

    public override IEnumerable<DBO.EmailTemplates> GetAll()
    {
        var results = base.GetAll().OrderBy(emailTemplate => emailTemplate.Modified).Where(e => e.Active == true);

        return results;
    }

    public long OrderPending(long personId, long variantId, string orderCode, long serviceTypeId)
    {
        string appUrl = this.config.Value?.ApplicationConfiguration?.ApplicationURL ?? string.Empty;
        string variant = string.Empty;
        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
        {
            var result = new ModelVariantModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(variantId);
            var seriesName = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context).Get(result?.SeriesModelId ?? 0)?.DisplayName;
            variant = seriesName + " (" + result?.DisplayName + ")";
        }

        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
        {
            variant = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(variantId)?.DisplayName ?? string.Empty;
        }

        var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.ORDER_PENDING);

        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",Variant=""{1}"",OrderNo=""{2}"",ApplicationURL=""{3}"", Imagepath=""{4}""", customerName, variant, orderCode, appUrl, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal,this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",Variant=""{1}"",OrderNo=""{2}"",ApplicationURL=""{3}""", customerName, variant, orderCode, appUrl);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long OrderCancelled(long personId, string orderCode)
    {
        string dofyContctNo = this.config.Value?.ApplicationConfiguration?.DofyContactNo ?? string.Empty;
        var person = new PersonModel(this.config, this.mapper, this.iPrincipal,this.context).Get(personId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal,this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.ORDER_CANCELED);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}"", Imagepath=""{3}""", customerName, orderCode, dofyContctNo, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}""", customerName, orderCode, dofyContctNo);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long OrderResheduled(long personId, string orderCode, long orderId)
    {
        string dofyContctNo = this.config.Value?.ApplicationConfiguration?.DofyContactNo ?? string.Empty;
        var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        var appointment = new AppointmentModel(this.config, this.mapper, this.iPrincipal, this.context).GetAppointmentsByOrderId(orderId);
        string appointmentDate = $"{appointment?.AppointmentDate:ddd d MMM yyyy} {appointment?.StartTime:t} - {appointment?.EndTime:t}";
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.ORDER_RESHEDULED);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",AppointmentDate=""{2}"",DOFYUContactNo=""{3}"", Imagepath=""{4}""", customerName, orderCode, appointmentDate, dofyContctNo, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",AppointmentDate=""{2}"",DOFYUContactNo=""{3}""", customerName, orderCode, appointmentDate, dofyContctNo);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long OrderPlaced(long personId, long variantId, long serviceTypeId, ViewEntities.Appointment appointment, string orderCode)
    {
        string dofyContctNo = this.config.Value?.ApplicationConfiguration?.DofyContactNo ?? string.Empty;
        string variant = string.Empty;
        string appointmentDate = $"{appointment.AppointmentDate:ddd d MMM yyyy} {appointment.StartTime:t} - {appointment.EndTime:t}";
        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
        {
            var result = new ModelVariantModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(variantId);
            var seriesName = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context).Get(result?.SeriesModelId ?? 0)?.DisplayName;
            variant = seriesName + " (" + result?.DisplayName + ")";
        }

        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
        {
            variant = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(variantId)?.DisplayName ?? string.Empty;
        }

        var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal,this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.ORDER_PLACED);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",Variant=""{1}"",DOFYUContactNo=""{2}"", Imagepath=""{3}"", AppointmentDate=""{4}""", customerName, variant, dofyContctNo, this.emailImagePath, appointmentDate);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",Variant=""{1}"",DOFYUContactNo=""{2}"",AppointmentDate=""{3}"",OrderNo=""{4}""", customerName, variant, dofyContctNo, appointmentDate, orderCode);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long LogOTP(long loginId, string password)
    {
        var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).GetPersonsByLoginId(loginId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.LOGIN_OTP);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"", OTP=""{1}"", Imagepath=""{2}""", customerName, password, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"", OTP=""{1}""", customerName, password);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long AccountDeletionOTP(long loginId, string password)
    {
        var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).GetPersonsByLoginId(loginId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.ACCOUNT_DELETION_OTP);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"", OTP=""{1}"", Imagepath=""{2}""", customerName, password, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"", OTP=""{1}""", customerName, password);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long PaymentOTP(long personId, string password, string orderCode)
    {
        var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.PAYMENTPROCESS_OTP);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"", OTP=""{1}"", Imagepath=""{2}""", customerName, password, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"", OTP=""{1}"", OrderNo=""{2}""", customerName, password, orderCode);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long ContactUSEmail(string name, string mobile, string email, string description)
    {
        name = string.IsNullOrEmpty(name) ? "Customer" : name;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.CONTACT_US);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",MOBILE=""{1}"",EMAIL=""{2}"",DESCRIPTION=""{3}"", Imagepath=""{4}""", name, mobile, email, description, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",MOBILE=""{1}"",EMAIL=""{2}"",DESCRIPTION=""{3}""", name, mobile, email, description);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(mobile, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long CancelOrderRequest(long personId, string orderCode)
    {
        string dofyContctNo = this.config.Value?.ApplicationConfiguration?.DofyContactNo ?? string.Empty;
        var person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.ORDERCANCEL_REQUEST);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}"", Imagepath=""{3}""", customerName, orderCode, dofyContctNo, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}""", customerName, orderCode, dofyContctNo);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long ReportDelayEmail(long personId, string orderCode, string timeInterval, long modelVariantId, long serviceTypeId)
    {
        string dofyContctNo = this.config.Value?.ApplicationConfiguration?.DofyContactNo ?? string.Empty;
        string variant = string.Empty;
        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
        {
            var result = new ModelVariantModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(modelVariantId);
            var seriesName = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context).Get(result?.SeriesModelId ?? 0)?.DisplayName;
            variant = seriesName + " (" + result?.DisplayName + ")";
        }

        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
        {
            variant = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(modelVariantId)?.DisplayName ?? string.Empty;
        }

        ViewEntities.Person person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.REPORT_DELAY);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}"",ModelVariant=""{3}"",TimeInterval=""{4}"", Imagepath=""{5}""", customerName, orderCode, dofyContctNo, variant, timeInterval, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}"",ModelVariant=""{3}"",TimeInterval=""{4}""", customerName, orderCode, dofyContctNo, variant, timeInterval);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long RequoteAmount(long personId, string orderCode, string requoteAmount, long modelVariantId, string originalAmount, long serviceTypeId)
    {
        ViewEntities.Person person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string variant = string.Empty;
        requoteAmount = this.formatAmount(requoteAmount);
        originalAmount = this.formatAmount(originalAmount);
        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
        {
            var result = new ModelVariantModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(modelVariantId);
            var seriesName = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context).Get(result?.SeriesModelId ?? 0)?.DisplayName;
            variant = seriesName + " (" + result?.DisplayName + ")";
        }

        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
        {
            variant = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(modelVariantId)?.DisplayName ?? string.Empty;
        }

        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.AMOUNT_REQUOTE);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",RequotedAmount=""{2}"",ModelVariant=""{3}"",OriginalAmount=""{4}"", Imagepath=""{5}""", customerName, orderCode, requoteAmount, variant, originalAmount, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",Amount=""{2}"",ModelVariant=""{3}"",OriginalAmount=""{4}""", customerName, orderCode, requoteAmount, variant, originalAmount);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long PaymentSuccessful(long orderId, long personId, string orderCode, string finalAmount, long modelVariantId, long serviceTypeId)
    {
        ViewEntities.Person person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string variant = string.Empty;
        finalAmount = this.formatAmount(finalAmount);

        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.SELL)
        {
            var result = new ModelVariantModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(modelVariantId);
            var seriesName = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context).Get(result?.SeriesModelId ?? 0)?.DisplayName;
            variant = seriesName + " (" + result?.DisplayName + ")";
        }

        if (serviceTypeId == (long)SERVICE_TYPE_ENUM.REPAIR)
        {
            variant = new SeriesModelModel(this.config, this.mapper, this.iPrincipal, this.context)?.Get(modelVariantId)?.DisplayName ?? string.Empty;
        }

        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.PAYMENT_SUCCESSFULL);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string reportURL = item.AdditionalInformation + orderId;
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",Amount=""{2}"",ModelVariant=""{3}"", Imagepath=""{4}""", customerName, orderCode, finalAmount, variant, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters, true, reportURL);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",Amount=""{2}"",ModelVariant=""{3}""", customerName, orderCode, finalAmount, variant);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long RejectOrderEmail(long personId, string orderCode)
    {
        string dofyContctNo = this.config.Value?.ApplicationConfiguration?.DofyContactNo ?? string.Empty;
        ViewEntities.Person person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.ORDER_FAILED);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}"", Imagepath=""{3}""", customerName, orderCode, dofyContctNo, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}""", customerName, orderCode, dofyContctNo);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long CallWasNotPickedEmail(long personId, string orderCode)
    {
        string dofyContctNo = this.config.Value?.ApplicationConfiguration?.DofyContactNo ?? string.Empty;
        ViewEntities.Person person = new PersonModel(this.config, this.mapper, this.iPrincipal, this.context).Get(personId);
        string contactNumber = new LoginsModel(this.config, this.mapper, this.iPrincipal, this.context).Get(person?.LoginId ?? 0)?.UserName ?? string.Empty;
        string customerName = person?.FirstName + ' ' + person?.LastName;
        customerName = string.IsNullOrEmpty(customerName) ? "Customer" : customerName;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.CALLWASNOT_PICKED);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}"", Imagepath=""{3}""", customerName, orderCode, dofyContctNo, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(person?.Email, item.EmailGroupId, null, parameters);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE)
                {
                    string parameters = string.Format(@"CustomerName=""{0}"",OrderNo=""{1}"",DOFYUContactNo=""{2}""", customerName, orderCode, dofyContctNo);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(contactNumber, item.EmailGroupId, null, parameters);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public long DownloadAppEmail(string phoneNumber, string emailId)
    {
        string playStoreURL = this.config.Value.ApplicationConfiguration.PlaystoreURL;
        string appStoreURL = this.config.Value.ApplicationConfiguration.AppstoreURL;
        IEnumerable<DBO.EmailTemplates> emailTemplates = this.FindItems(item => item.EnumName == DOFYConstants.EmailTemplatesInfo.DOWNLOAD_APP);
        if (emailTemplates?.Count() > 0)
        {
            long emailTemplateId = default;
            foreach (var item in emailTemplates)
            {
                if (item.EntityTypeId == DOFYConstants.EMAIL_ENTITY_TYPE && !string.IsNullOrEmpty(emailId))
                {
                    string parameter = string.Format(@"EMAIL = ""{0}"", AppstoreURL =""{1}"" PlaystoreURL = ""{2}"", Imagepath=""{3}""", emailId, appStoreURL, playStoreURL, this.emailImagePath);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(emailId, item.EmailGroupId, null, parameter);
                }

                if (item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE && !string.IsNullOrEmpty(phoneNumber))
                {
                    string parameter = string.Format(@"AppstoreURL =""{0}"" PlaystoreURL = ""{1}""", appStoreURL, playStoreURL);
                    emailTemplateId = new PendingEmailModel(this.config, this.mapper, this.iPrincipal, this.context).AddItem(phoneNumber, item.EmailGroupId, null, parameter);
                }
            }

            return emailTemplateId;
        }

        return default;
    }

    public async Task<long> GetEmailTemplateId(string enumName)
    {
        long emailTemplateId = this.FindItem(item => item.EnumName == enumName && item.EntityTypeId == DOFYConstants.SMS_ENTITY_TYPE && item.Active == true)?.Id ?? 0;

        return await Task.FromResult(emailTemplateId);
    }

    private string formatAmount(string amount)
    {
        var result = "Rs." + (amount?.EndsWith(".00") ?? false ? amount : string.Concat(amount, ".00"));

        return result ?? " ";
    }
}
