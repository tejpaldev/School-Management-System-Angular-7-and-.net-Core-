using SchoolManagement.DataAccess.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using SchoolManagement.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagement.DataAccess
{
    public class FeeDataAccess : IFeeDataAccess
    {
        private SchoolEntities _dbContext;
        private readonly Guid _activeStatus = Guid.Parse("10000000-0000-0000-0000-000000000000");
        public FeeDataAccess(SchoolEntities schoolEntites)
        {
            _dbContext = schoolEntites;
        }

        public IEnumerable<FeeType> Types()
        {
            try
            {
                var typeList = _dbContext.FeeType.Where(x => x.StatusId == _activeStatus);
                return typeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddType(FeeType feetype)
        {
            try
            {
                _dbContext.FeeType.Add(feetype);
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<PaymentMode> PayMode()
        {
            try
            {
                var paymentList = _dbContext.PaymentMode.Select(x => x);
                return paymentList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Pay(IEnumerable<Fee> feeList)
        {
            try
            {
                _dbContext.Fee.AddRange(feeList);
                var result = _dbContext.SaveChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Fee> FeeDetails(Guid studentId, DateTime startDate, DateTime endDate)
        {
            try
            {
                var studentList = _dbContext.Fee.Where(x => x.StudentId == studentId &&
                    x.CreatedDate >= startDate &&
                    x.CreatedDate <= endDate);
                return studentList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public FeeType SearchTypeById(Guid feetypeId)
        {
            try
            {
                var type = _dbContext.FeeType.Where(x => x.Id == feetypeId && x.StatusId == _activeStatus)
                    .SingleOrDefault();
                return type;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteType(FeeType feetype)
        {
            try
            {
                _dbContext.FeeType.Add(feetype);
                _dbContext.Entry(feetype).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<FeePeriod> Period()
        {
            try
            {
                var periodList = _dbContext.FeePeriod;
                return periodList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddClassFee(ClassFee classFees)
        {
            try
            {
                _dbContext.ClassFee.Add(classFees);
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ClassFee ClassFeeById(Guid classfeeId)
        {
            try
            {
                var type = _dbContext.ClassFee.Where(x => x.Id == classfeeId && x.StatusId == _activeStatus)
                    .SingleOrDefault();
                return type;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteClassFee(ClassFee classfee)
        {
            try
            {
                _dbContext.ClassFee.Add(classfee);
                _dbContext.Entry(classfee).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int EditClassFee(ClassFee classfee)
        {
            try
            {
                _dbContext.ClassFee.Add(classfee);
                _dbContext.Entry(classfee).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassFee> SearchTypeByClassId(Guid classId)
        {
            try
            {
                var classfee = _dbContext.ClassFee.Where(x => x.ClassId == classId && x.StatusId == _activeStatus);
                return classfee;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassFee> ClassFee()
        {
            try
            {
                var classfee = _dbContext.ClassFee.Where(x => x.StatusId == _activeStatus);
                return classfee;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassFee> SearchTypeByFeeTypeId(Guid feetypeId)
        {
            try
            {
                var classfee = _dbContext.ClassFee.Where(x => x.FeeTypeId == feetypeId && x.StatusId == _activeStatus);
                return classfee;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<FeeType> TypesByClass(Guid classId)
        {
            try
            {
                var typeList = _dbContext.FeeType.Where(x => x.StatusId == _activeStatus)
                    .Join(_dbContext.ClassFee.Where(y => y.StatusId == _activeStatus), ft => ft.Id, cf => cf.FeeTypeId, (ft, cf) => ft);
                return typeList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Dictionary<Guid, StudentFeeDiscount> StudentTypeFeeDiscount(Guid studentId)
        {
            try
            {
                var result = _dbContext.Student.Where(x => x.Id == studentId).
                    Join(_dbContext.StudentFeeDiscount.Where(x => x.StatusId == _activeStatus).Distinct(),
                    s => s.StudentTypeId, sfd => sfd.StudentTypeId, (s, sfd) => new
                    {
                        FeeType = sfd.FeeTypeId,
                        StudentFeeDiscount = sfd
                    }).ToDictionary(k => k.FeeType, v => v.StudentFeeDiscount);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentFeeDiscount> StudentFeeDiscount()
        {
            try
            {
                var result = _dbContext.StudentFeeDiscount.Where(x => x.StatusId == _activeStatus);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Dictionary<Student, IEnumerable<Fee>> FeeCollection(Expression<Func<Fee, bool>> feePredicate, Expression<Func<Student, bool>> studentPredicate)
        {
            try
            {
                var result = _dbContext.Student.Where(studentPredicate).Where(x => x.StatusId == _activeStatus)
                    .Join(_dbContext.Fee.Where(feePredicate), s => s.Id, f => f.StudentId, (s, f) => new { Student = s, Fees = f })
                    .GroupBy(x => x.Student).Select(x => new { Student = x.Key, Fees = x.Select(y => y.Fees) }).ToDictionary(x => x.Student, y => y.Fees);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Dictionary<Student, IEnumerable<Fee>> FeeDefaulter(Expression<Func<Fee, bool>> feePredicate, Expression<Func<Student, bool>> studentPredicate)
        {
            try
            {
                var result = _dbContext.Student.Where(studentPredicate).Where(x => x.StatusId == _activeStatus)
                    .GroupJoin(_dbContext.Fee.Where(feePredicate), s => s.Id, f => f.StudentId, (s, f) => new { Student = s, Fees = f })
                    .GroupBy(x => x.Student).ToDictionary(x => x.Key, y => y.Select(z => z.Fees).FirstOrDefault());
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}