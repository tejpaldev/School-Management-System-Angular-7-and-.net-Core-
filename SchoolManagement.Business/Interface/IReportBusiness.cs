using SchoolManagement.Model;
using System.Collections.Generic;

namespace SchoolManagement.Business.Interface
{
    public interface IReportBusiness
    {
        List<FeeReport> FeeReports(ReportFilter filter);
    }
}