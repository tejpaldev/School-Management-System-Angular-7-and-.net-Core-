using SchoolManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace SchoolManagement.DataAccess.Interface
{
    public interface IFeeDataAccess
    {
        IEnumerable<FeeType> Types();
        int Pay(IEnumerable<Fee> feeList);
        int AddType(FeeType feetype);
        IEnumerable<PaymentMode> PayMode();
        IEnumerable<Fee> FeeDetails(Guid studentId, DateTime start, DateTime end);
        FeeType SearchTypeById(Guid feetypeId);
        int DeleteType(FeeType feetype);
        IEnumerable<FeePeriod> Period();
        int AddClassFee(ClassFee classFees);
        ClassFee ClassFeeById(Guid classfeeId);
        int DeleteClassFee(ClassFee classfee);
        int EditClassFee(ClassFee classfee);
        IEnumerable<ClassFee> SearchTypeByClassId(Guid classId);
        IEnumerable<ClassFee> ClassFee();
        IEnumerable<ClassFee> SearchTypeByFeeTypeId(Guid feetypeId);
        IEnumerable<FeeType> TypesByClass(Guid classId);
        Dictionary<Guid, StudentFeeDiscount> StudentTypeFeeDiscount(Guid studentId);
        IEnumerable<StudentFeeDiscount> StudentFeeDiscount();
        Dictionary<Student, IEnumerable<Fee>> FeeCollection(Expression<Func<Fee, bool>> feePredicate, Expression<Func<Student, bool>> studentPredicate);
        Dictionary<Student, IEnumerable<Fee>> FeeDefaulter(Expression<Func<Fee, bool>> feePredicate, Expression<Func<Student, bool>> studentPredicate);
    }
}