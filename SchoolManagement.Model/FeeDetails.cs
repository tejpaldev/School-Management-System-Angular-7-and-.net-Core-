using System;
using System.Collections.Generic;

namespace SchoolManagement.Model
{
    public class FeeDetails
    {
        public List<Fee> Previous { get; set; }
        public Dictionary<Guid, IEnumerable<Fee>> PreviousFee { get; set; }
        public List<Fee> Current { get; set; }
        public List<Fee> BaseList { get; set; }
        public Dictionary<Guid, IEnumerable<Fee>> CurrentFee { get; set; }
    }
}