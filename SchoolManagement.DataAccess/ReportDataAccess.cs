using SchoolManagement.DataAccess.Helper;
using SchoolManagement.DataAccess.Interface;
using SchoolManagement.DataAccess.Models;
using SchoolManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SchoolManagement.DataAccess
{
    public class ReportDataAccess : IReportDataAccess
    {
        private SchoolEntities _dbContext;
        private Guid _active = Guid.Parse(Constants.ACTIVESTATUS);
        public ReportDataAccess(SchoolEntities schoolEntites)
        {
            _dbContext = schoolEntites;
        }

        public List<FeeReport> FeeReports(DateTime start, DateTime end, List<Guid> feeType, List<Guid> classes)
        {
            try
            {
                var report = _dbContext.Fee.Where(x => x.CreatedDate >= start && x.CreatedDate <= end && feeType.Contains(x.FeeTypeId))
                .Join(_dbContext.Student.Where(x => x.StatusId == _active && classes.Contains(x.ClassId)),
                fee => fee.StudentId, stu => stu.Id, (fee, stu) => new FeeReport
                {
                    AdmissionNo = stu.AdmissionNo,
                    FirstName = stu.Firstname,
                    MiddleName = stu.Middlename,
                    LastName = stu.Lastname,
                    Class = stu.Class.Name,
                    FeeType = fee.FeeType.Name,
                    Date = fee.FeeDate,
                    Amount = fee.Amount,
                    Discount = fee.Discount,
                    Fine = fee.Fine,
                    Comment = fee.Comment,
                    PaymentMode = fee.PaymentMode.Name
                }).ToList();
                return report;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
