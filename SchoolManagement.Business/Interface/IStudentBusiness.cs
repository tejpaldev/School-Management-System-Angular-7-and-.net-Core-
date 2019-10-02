using SchoolManagement.Model;
using System;
using System.Collections.Generic;

namespace SchoolManagement.Business.Interface
{
    public interface IStudentBusiness
    {
        Student Register(Student student);
        Student ReAdmission(Student student);
        List<Student> Search(SearchForm searchForm);
        List<StudentType> StudentType();
        IEnumerable<StudentType> DeleteStudentType(StudentType studentType);
        IEnumerable<StudentType> EditStudentType(StudentType studentType);
        IEnumerable<StudentType> AddStudentType(StudentType studentType);
        IEnumerable<StudentFeeDiscount> StudentFeeDiscount();
        IEnumerable<StudentFeeDiscount> AddStudentFeeDiscount(StudentFeeDiscount stuFeeDiscount);
        IEnumerable<StudentFeeDiscount> EditStudentFeeDiscount(StudentFeeDiscount stuFeeDiscount);
        IEnumerable<StudentFeeDiscount> DeleteStudentFeeDiscount(StudentFeeDiscount stuFeeDiscount);
        IEnumerable<StudentProfile> StudentProfile(ReportFilter filter);
    }
}