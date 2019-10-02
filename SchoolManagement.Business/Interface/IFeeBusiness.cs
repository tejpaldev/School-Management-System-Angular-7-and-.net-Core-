using System;
using System.Collections.Generic;
using SchoolManagement.Model;

namespace SchoolManagement.Business.Interface
{
    public interface IFeeBusiness
    {
        List<FeeType> Types(Guid? classId);
        List<PaymentMode> PaymentMode();
        bool Pay(List<Fee> fees);
        FeeDetails FeeDetails(Guid studentId, Guid classId);
        bool AddTypes(FeeType feetype);
        bool DeleteTypes(Guid feetypeId);
        List<FeePeriod> Period();
        List<ClassFee> ClassFee(Guid? feetypeId, Guid? classId);
        bool AddClassFee(ClassFee classFee);
        bool EditClassFee(ClassFee classFee);
        bool DeleteClassFee(Guid id);
        ClassFee ClassFee(Guid classfeeId);
        IEnumerable<StudentProfile> FeeCollection(ReportFilter filter);
        IEnumerable<StudentProfile> FeeDefaulter(ReportFilter filter);
    }
}