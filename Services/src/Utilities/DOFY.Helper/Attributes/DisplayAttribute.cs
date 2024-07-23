using System;

namespace DOFY.Helper.Attributes
{
    public class DisplayAttribute : Attribute
    {
        public DisplayAttribute()
        {
            this.IgnoreMember = true;
        }

        public string Name { get; set; }

        public bool IgnoreMember { get; set; }
    }
}
