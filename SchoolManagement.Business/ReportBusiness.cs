using SchoolManagement.Business.Interface;
using SchoolManagement.DataAccess.Interface;
using SchoolManagement.Model;
using System;
using System.Collections.Generic;

namespace SchoolManagement.Business
{
    public class ReportBusiness : IReportBusiness
    {
        private IReportDataAccess _reportDataAccess;
        public ReportBusiness(IReportDataAccess reportDataAccess)
        {
            _reportDataAccess = reportDataAccess;
        }

        public List<FeeReport> FeeReports(ReportFilter filter)
        {
            try
            {
                DateTime start = DateTime.MinValue;
                DateTime end = DateTime.MinValue;
                if (filter.Session == 0)
                {
                    var currentFinancialYear = DateTime.Now.Month >= 4 ? DateTime.Now.Year + 1 : DateTime.Now.Year;
                    start = new DateTime(currentFinancialYear - 1, 4, 1);
                    end = new DateTime(currentFinancialYear, 3, 31);
                }
                if (filter.Session == 1)
                {
                    var currentFinancialYear = DateTime.Now.Month >= 4 ? DateTime.Now.Year + 1 : DateTime.Now.Year;
                    var previousFinancialYear = currentFinancialYear - 1;
                    start = new DateTime(previousFinancialYear - 1, 4, 1);
                    end = new DateTime(previousFinancialYear, 3, 31);
                }

                var report = _reportDataAccess.FeeReports(start, end, filter.FeeTypeIds, filter.ClassIds);
                return report;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
