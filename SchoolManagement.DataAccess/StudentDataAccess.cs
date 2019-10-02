using Microsoft.EntityFrameworkCore;
using SchoolManagement.DataAccess.Interface;
using SchoolManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace SchoolManagement.DataAccess
{
    public class StudentDataAccess : IStudentDataAccess
    {
        private SchoolEntities _dbContext;
        private readonly Guid _activeStatus = Guid.Parse("10000000-0000-0000-0000-000000000000");
        public StudentDataAccess(SchoolEntities schoolEntites)
        {
            _dbContext = schoolEntites;
        }

        public int Register(Student student)
        {
            var returnValue = 0;
            try
            {
                _dbContext.Student.Add(student);
                var result = _dbContext.SaveChanges();
                returnValue = result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return returnValue;
        }

        public List<SchoolManagement.Model.Student> Search(Expression<Func<Student, bool>> predicate)
        {
            try
            {
                var studentList = _dbContext.Student.Where(x => x.StatusId == _activeStatus).Where(predicate)
                    .Select(x => new SchoolManagement.Model.Student
                    {
                        Id = x.Id,
                        AadharNumber = x.AadharNumber,
                        RegistrationNo = x.RegistrationNo,
                        AdmissionNo = x.AdmissionNo,
                        Firstname = x.Firstname,
                        Middlename = x.Middlename,
                        Lastname = x.Lastname,
                        RollNumber = x.RollNumber,
                        Class = x.Class.Name,
                        ClassId = x.ClassId,
                        Section = x.Section.Name,
                        Stream = x.Stream.Name,
                        Dateofbirth = x.Dateofbirth,
                        IsNew = x.IsNew
                    });
                return studentList.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int StudentCount()
        {
            try
            {
                var totalStudent = _dbContext.Student.Count();
                return totalStudent;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Student SearchById(Guid id)
        {
            try
            {
                var student = _dbContext.Student.Where(x => x.Id == id).SingleOrDefault();
                return student;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int ReAdmission(Student student)
        {
            try
            {
                _dbContext.Student.Add(student);
                _dbContext.Entry(student).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentType> StudentType()
        {
            try
            {
                var result = _dbContext.StudentType.Where(x => x.StatusId == _activeStatus);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Guid StudentIdByParentContact(long contact)
        {
            try
            {
                var parent = _dbContext.Parent.Where(x => x.Contact == contact && x.StatusId == _activeStatus).Distinct().SingleOrDefault();
                if (parent != null)
                    return parent.StudentId;
                else
                    return Guid.Empty;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public StudentType StudentTypeById(Guid studentTypeId)
        {
            try
            {
                var result = _dbContext.StudentType.Where(x => x.Id == studentTypeId).SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddStudentType(StudentType studentType)
        {
            try
            {
                _dbContext.StudentType.Add(studentType);
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int EditStudentType(StudentType studentType)
        {
            try
            {
                _dbContext.StudentType.Add(studentType);
                _dbContext.Entry(studentType).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteStudentType(StudentType studentType)
        {
            try
            {
                _dbContext.StudentType.Add(studentType);
                _dbContext.Entry(studentType).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentFeeDiscount> StudentFeeDiscount(bool egar)
        {
            try
            {
                if (egar)
                {
                    var result = _dbContext.StudentFeeDiscount.Where(x => x.StatusId == _activeStatus).Include(x => x.FeeType).Include(x => x.StudentType);
                    return result;
                }
                else
                {
                    var result = _dbContext.StudentFeeDiscount.Where(x => x.StatusId == _activeStatus);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddStudentFeeDiscount(StudentFeeDiscount studentFeeDiscount)
        {
            try
            {
                _dbContext.StudentFeeDiscount.Add(studentFeeDiscount);
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public StudentFeeDiscount StudentFeeDiscountById(Guid studentFeeDiscountId)
        {
            try
            {
                var result = _dbContext.StudentFeeDiscount.Where(x => x.Id == studentFeeDiscountId).SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int EditStudentFeeDiscount(StudentFeeDiscount studentFeeDiscount)
        {
            try
            {
                _dbContext.StudentFeeDiscount.Add(studentFeeDiscount);
                _dbContext.Entry(studentFeeDiscount).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteStudentFeeDiscount(StudentFeeDiscount studentFeeDiscount)
        {
            try
            {
                _dbContext.StudentFeeDiscount.Add(studentFeeDiscount);
                _dbContext.Entry(studentFeeDiscount).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Student> StudentDetails(Expression<Func<Student, bool>> predicate)
        {
            try
            {
                var result = _dbContext.Student.Where(predicate).Where(x => x.StatusId == _activeStatus);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}