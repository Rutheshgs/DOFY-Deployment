namespace DOFY.ViewEntities;

using System;
using DOFY.Helper;
using DOFY.Helper.Attributes;
using Helper.Extensions;

public class OrderCsv : ExportResult
{
    private readonly OrdersViewModel result;

    public OrderCsv(OrdersViewModel item)
    {
        this.result = item;
    }

    [Column(Name = "Order Id", Order = 1)]
    public string OrderCode
    {
        get { return string.IsNullOrEmpty(this.result.OrderCode) ? string.Empty : this.result.OrderCode; }
    }

    [Column(Name = "Order Placed Date", Order = 2)]
    public string OrderDate
    {
        get { return this.result.OrderDate.ConvertToCustomDate("dd-MM-yyyy"); }
    }

    [Column(Name = "Order Scheduled Date", Order = 3)]
    public string AppointmentDate
    {
        get { return this.result.AppointmentDate.ConvertToCustomDate("dd-MM-yyyy"); }
    }

    [Column(Name = "Time Slot", Order = 4)]
    public string TimeSlot
    {
        get { return this.result.StartTime.ConvertToCustomTime() + " - " + this.result.EndTime.ConvertToCustomTime(); }
    }

    [Column(Name = "Completed Date", Order = 5)]
    public string CompletedDate
    {
        get { return this.result?.CompletedDate != null ? this.result.CompletedDate.ConvertToCustomDate("dd-MM-yyyy") : string.Empty; }
    }

    [Column(Name = "Gadget Name", Order = 6)]
    public string ProductTypeName
    {
        get { return string.IsNullOrEmpty(this.result.ProductTypeName) ? string.Empty : this.result.ProductTypeName; }
    }

    [Column(Name = "Brand", Order = 7)]
    public string BrandMasterName
    {
        get { return string.IsNullOrEmpty(this.result.BrandMasterName) ? string.Empty : this.result.BrandMasterName; }
    }

    [Column(Name = "Model", Order = 8)]
    public string SeriesModelName
    {
        get { return string.IsNullOrEmpty(this.result.SeriesModelName) ? string.Empty : this.result.SeriesModelName; }
    }

    [Column(Name = "Variant", Order = 9)]
    public string ModelVariantName
    {
        get { return string.IsNullOrEmpty(this.result.ModelVariantName) ? string.Empty : this.result.ModelVariantName; }
    }

    [Column(Name = "IMEI/SerialNumber", Order = 10)]
    public string IMEI
    {
        get { return string.IsNullOrEmpty(this.result.IMEI) ? string.Empty : "\t" + this.result.IMEI.ToString() + " "; }
    }

    [Column(Name = "Amount", Order = 11)]
    public string Amount
    {
        get { return this.result?.Amount > 0 ? String.Format("{0:0.00}", this.result?.Amount) : "0.00"; }
    }

    [Column(Name = "Customer Name", Order = 12)]
    public string UserName
    {
        get { return string.IsNullOrEmpty(this.result.UserName) ? string.Empty : this.result.UserName; }
    }

    [Column(Name = "Customer Contact Number", Order = 13)]
    public string MobileNumber
    {
        get { return string.IsNullOrEmpty(this.result.UserMobile) ? string.Empty : this.result.UserMobile; }
    }

    [Column(Name = "Customer Address", Order = 14)]
    public string Address
    {
        get { return (string.IsNullOrEmpty(this.result.Address) ? string.Empty : this.result.Address) + (string.IsNullOrEmpty(this.result.Address1) ? string.Empty : ",  " + this.result.Address1); }
    }

    [Column(Name = "City", Order = 15)]
    public string City
    {
        get { return string.IsNullOrEmpty(this.result.AppointmentCity) ? string.Empty : this.result.AppointmentCity; }
    }

    [Column(Name = "Pincode", Order = 16)]
    public string Pincode
    {
        get { return string.IsNullOrEmpty(this.result.AppointmentPincode) ? string.Empty : this.result.AppointmentPincode; }
    }  

    [Column(Name = "Promo Code", Order = 17)]
    public string ReferralCode
    {
        get { return string.IsNullOrEmpty(this.result.ReferralCode) ? string.Empty : this.result.ReferralCode; }
    }

    [Column(Name = "Assignee", Order = 18)]
    public string Assignee
    {
        get { return string.IsNullOrEmpty(this.result.AssigneeName) ? string.Empty : this.result.AssigneeName; }
    }

    [Column(Name = "Order Status", Order = 19)]
    public string Status
    {
        get { return string.IsNullOrEmpty(this.result.StatusName) ? string.Empty : this.result.StatusName; }
    }

    [Column(Name = "UTM Reference", Order = 20)]
    public string UTMReference
    {
        get { return string.IsNullOrEmpty(this.result.UTMReference) ? string.Empty : this.result.UTMReference; }
    }
}
