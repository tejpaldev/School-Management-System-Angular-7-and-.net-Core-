using SchoolManagement.Model;
using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Interface
{
    public interface IReportDataAccess
    {
        List<FeeReport> FeeReports(DateTime start, DateTime end, List<Guid> feeType, List<Guid> classes);
    }
}