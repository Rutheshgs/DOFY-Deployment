namespace DOFY.ViewEntities
{
    public class AssigneeDetailsViewModel : EntityBase
    {
        public long LoginId { get; set; }

        public long UserRoleId { get; set; }

        public string AssigneeName { get; set; }

        public string Email { get; set; }

        public string Mobile { get; set; }

        public string SecondaryMobile { get; set; }

        public string UploadImagePath { get; set; }

        public string UploadImageName { get; set; }

        public string UserRating { get; set; }

        public string Address { get; set; }

        public string? Pincode { get; set; }

        public long CityId { get; set; }

        public long? AppointmentCount { get; set; }

        public string? City { get; set; }
    }
}
