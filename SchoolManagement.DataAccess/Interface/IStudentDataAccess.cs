using System;
using System.Collections.Generic;
using Model = SchoolManagement.Model;
using System.Linq.Expressions;
using SchoolManagement.DataAccess.Models;

namespace SchoolManagement.DataAccess.Interface
{
    public interface IStudentDataAccess
    {
        int Register(Student student);
        Student SearchById(Guid id);
        int StudentCount();
        int ReAdmission(Student student);
        IEnumerable<StudentType> StudentType();
        List<Model.Student> Search(Expression<Func<Student, bool>> predicate);
        Guid StudentIdByParentContact(long contact);
        int AddStudentType(StudentType studentType);
        int EditStudentType(StudentType studentType);
        int DeleteStudentType(StudentType studentType);
        StudentType StudentTypeById(Guid studentTypeId);
        IEnumerable<StudentFeeDiscount> StudentFeeDiscount(bool egar);
        int AddStudentFeeDiscount(StudentFeeDiscount addObj);
        StudentFeeDiscount StudentFeeDiscountById(Guid id);
        int EditStudentFeeDiscount(StudentFeeDiscount editObj);
        int DeleteStudentFeeDiscount(StudentFeeDiscount deleteObj);
        IEnumerable<Student> StudentDetails(Expression<Func<Student, bool>> predicate);
    }
}