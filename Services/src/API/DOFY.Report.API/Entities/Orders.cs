namespace DOFY.ReportEntities
{
using System;
using System.Collections.Generic;


    public class Orders 
    {
        public long Id { get; set; }

        public string ServiceType { get; set; }

        public string ModelVariantName { get; set; }

        public string ThumbnailPath { get; set; }

        public string ProductTypeName { get; set; }

        public string BrandMasterName { get; set; }

        public string SeriesModelName { get; set; }

        public string UserMobile { get; set; }

        public string SecondaryMobile { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Address { get; set; }

        public string AppointmentCity { get; set; }

        public string AppointmentPincode { get; set; }

        public string UserName { get; set; }

        public DateTime AppointmentDate { get; set; }

        public string OrderCode { get; set; }

        public string AssigneeName { get; set; }

        public string StatusName { get; set; }

        public decimal SuggestedCost { get; set; }

        public decimal Adjustment { get; set; }

        public decimal ReferralAmount { get; set; }

        public decimal FinalPaid { get; set; }

        public string Remarks { get; set; }

        public string TechnicianComments { get; set; }

        public decimal CustomerExpectation { get; set; }

        public bool IsReschedule { get; set; }

        public DateTime OrderDate { get; set; }

        public string IMEINumber { get; set; }
    }
}