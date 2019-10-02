using System;
using System.Collections.Generic;

namespace SchoolManagement.Model
{
    public class ReportFilter
    {
        public List<Guid> ClassIds { get; set; }
        public List<Guid> FeeTypeIds { get; set; }
        public List<Guid> SectionIds { get; set; }
        public int Session { get; set; }
        public string AdmissionNo { get; set; }
        public string StudentName { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public Guid? FeeTypeId { get; set; }
        public Guid? ClassId { get; set; }
        public Guid? SectionId { get; set; }
    }
}