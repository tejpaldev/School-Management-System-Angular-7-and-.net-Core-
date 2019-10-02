using System;
using System.Collections.Generic;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using SchoolManagement.DataAccess.Interface;
using System.Linq;
using DataModel = SchoolManagement.DataAccess.Models;
using SchoolManagement.Business.Helper;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace SchoolManagement.Business
{
    public class FeeBusiness : IFeeBusiness
    {
        private IFeeDataAccess _feeDataAccess;
        private string _username;
        private DateTime _schoolFeeDueDate = new DateTime(DateTime.Now.Year, 4, 5);
        private IHttpContextAccessor _httpContextAccessor;
        public FeeBusiness(IFeeDataAccess feeDataAccess, IHttpContextAccessor httpContextAccessor)
        {
            _feeDataAccess = feeDataAccess;
            _httpContextAccessor = httpContextAccessor;
            var result = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            _username = result == null ? "SYSTEM" : result.Value;

        }

        public bool AddClassFee(ClassFee classFee)
        {
            try
            {
                var classFees = new DataModel.ClassFee
                {
                    Id = Guid.NewGuid(),
                    ClassId = classFee.ClassId,
                    FeeTypeId = classFee.FeeTypeId,
                    FeeAmount = classFee.FeeAmount,
                    FineAmount = classFee.FineAmount,
                    DiscountAmount = classFee.DiscountAmount,
                    FeeDueDate = _schoolFeeDueDate,
                    Description = classFee.Description,
                    StatusId = classFee.StatusId,
                    CreatedBy = _username,
                    CreatedDate = DateTime.UtcNow
                };
                var result = _feeDataAccess.AddClassFee(classFees);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddTypes(FeeType feetype)
        {
            try
            {
                var feeType = new DataModel.FeeType
                {
                    Id = Guid.NewGuid(),
                    Name = feetype.Name,
                    Description = feetype.Description,
                    FeePeriodId = feetype.FeePeriodId,
                    StatusId = feetype.StatusId,
                    CreatedBy = _username,
                    CreatedDate = DateTime.UtcNow
                };
                var result = _feeDataAccess.AddType(feeType);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ClassFee ClassFee(Guid classfeeId)
        {
            try
            {
                var classfee = _feeDataAccess.ClassFeeById(classfeeId);
                if (classfee != null)
                {
                    var classFee = new ClassFee
                    {
                        Id = classfee.Id,
                        FeeAmount = classfee.FeeAmount,
                        FineAmount = classfee.FineAmount,
                        DiscountAmount = classfee.DiscountAmount,
                        FeeDueDate = classfee.FeeDueDate,
                        ClassId = classfee.ClassId,
                        Class = classfee.Class.Name,
                        FeeTypeId = classfee.FeeTypeId,
                        FeeType = classfee.FeeType.Name,
                        StatusId = classfee.StatusId,
                        Status = classfee.Status.Name,
                        Description = classfee.Description
                    };
                    return classFee;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ClassFee> ClassFee(Guid? feetypeId, Guid? classId)
        {
            try
            {
                var returnValue = new List<ClassFee>();
                IEnumerable<DataModel.ClassFee> classfee = new List<DataModel.ClassFee>();
                if (feetypeId.HasValue && feetypeId != Guid.Empty)
                {
                    classfee = _feeDataAccess.SearchTypeByFeeTypeId(feetypeId.Value);
                }
                else if (classId.HasValue)
                {
                    classfee = _feeDataAccess.SearchTypeByClassId(classId.Value);
                }
                else
                {
                    classfee = _feeDataAccess.ClassFee();
                }
                if (classfee != null)
                {
                    foreach (var item in classfee)
                    {
                        var classFee = new ClassFee
                        {
                            Id = item.Id,
                            FeeAmount = item.FeeAmount,
                            FineAmount = item.FineAmount,
                            DiscountAmount = item.DiscountAmount,
                            FeeDueDate = item.FeeDueDate,
                            ClassId = item.ClassId,
                            Class = item.Class.Name,
                            FeeTypeId = item.FeeTypeId,
                            FeeType = item.FeeType.Name,
                            StatusId = item.StatusId,
                            Status = item.Status.Name,
                            Description = item.Description,
                            FeePeriodName = item.FeeType.FeePeriod.Name,
                            FeeOccurence = item.FeeType.FeePeriod.Occurence
                        };
                        returnValue.Add(classFee);
                    }
                }
                if (returnValue.Count > 0)
                {
                    return returnValue;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteClassFee(Guid classfeeId)
        {
            try
            {
                DataModel.ClassFee classfee = _feeDataAccess.ClassFeeById(classfeeId);
                if (classfee != null)
                {
                    classfee.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                    classfee.ModifiedBy = _username;
                    classfee.ModifiedDate = DateTime.UtcNow;
                }
                var result = _feeDataAccess.DeleteClassFee(classfee);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteTypes(Guid feetypeId)
        {
            try
            {
                var feetype = _feeDataAccess.SearchTypeById(feetypeId);
                if (feetype != null)
                {
                    feetype.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                    feetype.ModifiedBy = _username;
                    feetype.ModifiedDate = DateTime.UtcNow;
                }
                var result = _feeDataAccess.DeleteType(feetype);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool EditClassFee(ClassFee classFee)
        {
            try
            {
                DataModel.ClassFee classfee = _feeDataAccess.ClassFeeById(classFee.Id);
                if (classfee != null)
                {
                    classfee.ClassId = classFee.ClassId;
                    classfee.FeeTypeId = classFee.FeeTypeId;
                    classfee.FeeAmount = classFee.FeeAmount;
                    classfee.FineAmount = classFee.FineAmount;
                    classfee.DiscountAmount = classFee.DiscountAmount;
                    classfee.FeeDueDate = _schoolFeeDueDate;
                    classfee.Description = classFee.Description;
                    classfee.StatusId = classFee.StatusId;
                    classfee.ModifiedBy = _username;
                    classfee.ModifiedDate = DateTime.UtcNow;
                }
                var result = _feeDataAccess.EditClassFee(classfee);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public FeeDetails FeeDetails(Guid studentId, Guid classId)
        {
            try
            {
                var feeDetails = new FeeDetails();
                var currentFinancialYear = DateTime.Now.Month >= 4 ? DateTime.Now.Year + 1 : DateTime.Now.Year;
                var currentFinacialStartDate = new DateTime(currentFinancialYear - 1, 4, 1);
                var currentFinacialEndDate = new DateTime(currentFinancialYear, 3, 31);
                var currentList = _feeDataAccess.FeeDetails(studentId, currentFinacialStartDate, currentFinacialEndDate);
                if (currentList != null)
                {
                    feeDetails.Current = currentList.Select(x => new Fee
                    {
                        Id = x.Id,
                        StudentId = x.StudentId,
                        Amount = x.Amount,
                        CheckNumber = x.CheckNumber,
                        ClearenceDate = x.ClearanceDate,
                        Comment = x.Comment,
                        Discount = x.Discount,
                        FeeDate = x.FeeDate,
                        FeeType = x.FeeType.Name,
                        Fine = x.Fine,
                        PaymentMode = x.PaymentMode.Name,
                        TransactionNo = x.TransactionNo,
                        FeeTypeId = x.FeeTypeId,
                    }).ToList();
                }

                //var previousFinancialYear = currentFinancialYear - 1;
                //var previousFinacialStartDate = new DateTime(previousFinancialYear - 1, 4, 1);
                //var previousFinacialEndDate = new DateTime(previousFinancialYear, 3, 31);
                //var previousList = _feeDataAccess.FeeDetails(studentId, previousFinacialStartDate, previousFinacialEndDate);
                //if (previousList != null)
                //{
                //    feeDetails.Previous = previousList.Select(x => new Fee
                //    {
                //        Id = x.Id,
                //        StudentId = x.StudentId,
                //        Amount = x.Amount,
                //        CheckNumber = x.CheckNumber,
                //        ClearenceDate = x.ClearanceDate,
                //        Comment = x.Comment,
                //        Discount = x.Discount,
                //        FeeDate = x.FeeDate,
                //        FeeType = x.FeeType.Name,
                //        Fine = x.Fine,
                //        PaymentMode = x.PaymentMode.Name,
                //        TransactionNo = x.TransactionNo,
                //        FeeTypeId = x.FeeTypeId,
                //    }).ToList();
                //}

                var baseList = FeeBaseList(studentId, classId);
                feeDetails.Current = FeeDetailList(feeDetails.Current, baseList);
                return feeDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private List<Fee> FeeDetailList(IEnumerable<Fee> feeDetails, IEnumerable<Fee> baseList)
        {
            try
            {
                var feeDetail = baseList;
                foreach (var baseItem in feeDetail)
                {
                    int remender = (12 / baseItem.FeeOccurence) - 1;
                    var feeItem = feeDetails
                        .Where(x => x.FeeDate.Month >= baseItem.FeeDate.Month
                        && x.FeeDate.Month <= baseItem.FeeDate.AddMonths(remender).Month
                        && x.FeeTypeId == baseItem.FeeTypeId)
                        .FirstOrDefault();
                    if (feeItem != null)
                    {
                        baseItem.Id = feeItem.Id;
                        baseItem.StudentId = feeItem.StudentId;
                        baseItem.Amount = feeItem.Amount;
                        baseItem.CheckNumber = feeItem.CheckNumber;
                        baseItem.ClearenceDate = feeItem.ClearenceDate;
                        baseItem.Comment = feeItem.Comment;
                        baseItem.Discount = feeItem.Discount;
                        baseItem.FeeDate = feeItem.FeeDate;
                        baseItem.FeeType = feeItem.FeeType;
                        baseItem.Fine = feeItem.Fine;
                        baseItem.PaymentMode = feeItem.PaymentMode;
                        baseItem.TransactionNo = feeItem.TransactionNo;
                        baseItem.FeeTypeId = feeItem.FeeTypeId;
                        baseItem.IsPaid = true;
                    }
                }
                return feeDetail.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private List<Fee> FeeBaseList(Guid studentId, Guid classId)
        {
            try
            {
                var currentFinancialYear = DateTime.Now.Month >= 4 ? DateTime.Now.Year + 1 : DateTime.Now.Year;
                var currentFinacialStartDate = new DateTime(currentFinancialYear - 1, 4, 1);
                var currentFinacialEndDate = new DateTime(currentFinancialYear, 3, 31);

                var baseList = new List<Fee>();
                var classFee = ClassFee(null, classId);
                var studentDiscount = _feeDataAccess.StudentTypeFeeDiscount(studentId);
                foreach (var item in classFee)
                {
                    var amount = 0;
                    var discount = studentDiscount.Where(x => x.Key == item.FeeTypeId).Select(x => x.Value).FirstOrDefault();
                    if (discount != null)
                        amount = discount.Amount;

                    int remender = (12 / item.FeeOccurence);
                    for (int i = 0; i < item.FeeOccurence; i++)
                    {
                        var fee = new Fee
                        {
                            StudentId = studentId,
                            FeeDate = currentFinacialStartDate.AddMonths(i * remender),
                            FeeType = item.FeeType,
                            FeeTypeId = item.FeeTypeId,
                            Amount = item.FeeAmount - amount,
                            Fine = DateTime.Now.Date > item.FeeDueDate.Date ? item.FineAmount : 0,
                            Discount = item.DiscountAmount,
                            FeeOccurence = item.FeeOccurence,
                            IsPaid = false
                        };
                        baseList.Add(fee);
                    }
                }
                return baseList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Pay(List<Fee> fees)
        {
            try
            {
                var payStatus = false;
                var feeList = new List<DataModel.Fee>();
                foreach (Fee item in fees)
                {
                    var fee = new DataModel.Fee
                    {
                        Id = Guid.NewGuid(),
                        StudentId = item.StudentId,
                        FeeTypeId = item.FeeTypeId,
                        Amount = item.Amount,
                        Fine = item.Fine,
                        Discount = item.Discount,
                        FeeDate = item.FeeDate,
                        Comment = item.Comment,
                        PaymentModeId = item.PaymentModeId,
                        TransactionNo = item.TransactionNo,
                        CheckNumber = item.CheckNumber,
                        ClearanceDate = item.ClearenceDate,
                        CreatedBy = _username,
                        CreatedDate = DateTime.Now
                    };
                    feeList.Add(fee);
                }
                var result = _feeDataAccess.Pay(feeList);
                if (result == feeList.Count)
                    payStatus = true;
                else
                    payStatus = false;
                return payStatus;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<PaymentMode> PaymentMode()
        {
            try
            {
                var paymentModes = new List<PaymentMode>();
                paymentModes = _feeDataAccess.PayMode().Select(x => new PaymentMode
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                }).ToList();
                return paymentModes;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<FeePeriod> Period()
        {
            try
            {
                var feeTypes = new List<FeePeriod>();
                feeTypes = _feeDataAccess.Period().Select(x => new FeePeriod
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                }).ToList();
                return feeTypes;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<FeeType> Types(Guid? classId)
        {
            try
            {
                var feeTypes = new List<FeeType>();
                if (classId.HasValue)
                {
                    feeTypes = _feeDataAccess.TypesByClass(classId.Value).Select(x => new FeeType
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        FeePeriod = x.FeePeriod.Name,
                        FeePeriodId = x.FeePeriodId
                    }).ToList();
                }
                else
                {
                    feeTypes = _feeDataAccess.Types().Select(x => new FeeType
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        FeePeriod = x.FeePeriod.Name,
                        FeePeriodId = x.FeePeriodId
                    }).ToList();
                }
                return feeTypes;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentProfile> FeeCollection(ReportFilter filter)
        {
            try
            {
                IEnumerable<StudentProfile> result = new List<StudentProfile>();
                var feePredicate = PredicateBuilder.True<DataModel.Fee>();
                if (filter.FromDate.HasValue && filter.ToDate.HasValue)
                {
                    var fromDate = filter.FromDate.Value.Date;
                    var toDate = filter.ToDate.Value.Date;
                    feePredicate = feePredicate.And(x => x.FeeDate >= fromDate);
                    feePredicate = feePredicate.And(x => x.FeeDate <= toDate);
                }
                var studentPredicate = PredicateBuilder.True<DataModel.Student>();
                if (filter.ClassIds != null && filter.ClassIds.Count > 0)
                {
                    studentPredicate = studentPredicate.And(x => filter.ClassIds.Contains(x.ClassId));
                }
                if (filter.SectionIds != null && filter.SectionIds.Count > 0)
                {
                    studentPredicate = studentPredicate.And(x => x.SectionId.HasValue);
                    studentPredicate = studentPredicate.And(x => filter.SectionIds.Contains(x.SectionId.Value));
                }
                var feeDetail = _feeDataAccess.FeeCollection(feePredicate, studentPredicate);
                if (feeDetail != null)
                {
                    result = feeDetail.Select(x => new StudentProfile
                    {
                        Student = new Student
                        {
                            Id = x.Key.Id,
                            AadharNumber = x.Key.AadharNumber,
                            RegistrationNo = x.Key.RegistrationNo,
                            AdmissionNo = x.Key.AdmissionNo,
                            Firstname = x.Key.Firstname,
                            Middlename = x.Key.Middlename,
                            Lastname = x.Key.Lastname,
                            RollNumber = x.Key.RollNumber,
                            Class = x.Key.Class.Name,
                            Section = x.Key.SectionId.HasValue ? x.Key.Section.Name : "",
                            Stream = x.Key.StreamId.HasValue ? x.Key.Stream.Name : "",
                            Dateofbirth = x.Key.Dateofbirth,
                            BloodGroup = x.Key.BloodGroup.Name,
                            Religion = x.Key.Religion.Name,
                            Category = x.Key.Category.Name,
                            Cast = x.Key.Cast,
                            StudentType = x.Key.StudentType.Name,
                            Gender = x.Key.Gender.Name,
                            BusRouteId = x.Key.BusRouteId,
                        },
                        Parents = x.Key.Parent.Select(y => new Parent
                        {
                            Name = y.Name,
                            Contact = y.Contact,
                            Email = y.Email,
                            Occupation = y.Occupation,
                            Address = y.Address,
                            IsPrimaryContact = y.IsPrimary,
                            ParentType = y.ParentType.Name
                        }),
                        Fees = x.Value.Select(z => new Fee
                        {
                            FeeDate = z.FeeDate,
                            FeeType = z.FeeType.Name,
                            Amount = z.Amount,
                            Discount = z.Discount,
                            Fine = z.Fine,
                            Comment = z.Comment,
                            CheckNumber = z.CheckNumber,
                            ClearenceDate = z.ClearanceDate,
                            TransactionNo = z.TransactionNo,
                            PaymentMode = z.PaymentMode.Name
                        })
                    });
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentProfile> FeeDefaulter(ReportFilter filter)
        {
            try
            {
                var now = DateTime.Now;
                var currentFinancialYear = now.Month >= 4 ? now.Year + 1 : now.Year;
                var start = new DateTime(currentFinancialYear - 1, 4, 1);
                var end = now;
                var classFees = _feeDataAccess.ClassFee();
                var studentFeeDiscount = _feeDataAccess.StudentFeeDiscount();

                var result = new List<StudentProfile>();
                var feePredicate = PredicateBuilder.True<DataModel.Fee>();

                feePredicate = feePredicate.And(x => x.FeeDate >= start);
                feePredicate = feePredicate.And(x => x.FeeDate <= end);

                if (filter.FeeTypeIds != null && filter.FeeTypeIds.Count > 0)
                {
                    feePredicate = feePredicate.And(x => filter.FeeTypeIds.Contains(x.FeeTypeId));
                    classFees = classFees.Where(x => filter.FeeTypeIds.Contains(x.FeeTypeId));
                    studentFeeDiscount = studentFeeDiscount.Where(x => filter.FeeTypeIds.Contains(x.FeeTypeId));
                }

                var studentPredicate = PredicateBuilder.True<DataModel.Student>();
                if (filter.ClassIds != null && filter.ClassIds.Count > 0)
                {
                    studentPredicate = studentPredicate.And(x => filter.ClassIds.Contains(x.ClassId));
                    classFees = classFees.Where(x => filter.ClassIds.Contains(x.ClassId)).ToList();
                }

                if (filter.SectionIds != null && filter.SectionIds.Count > 0)
                {
                    studentPredicate = studentPredicate.And(x => x.SectionId.HasValue);
                    studentPredicate = studentPredicate.And(x => filter.SectionIds.Contains(x.SectionId.Value));
                }

                var feeDetail = _feeDataAccess.FeeDefaulter(feePredicate, studentPredicate);
                foreach (var fee in feeDetail)
                {
                    var studentProfile = new StudentProfile();
                    var filteredClassFee = classFees.Where(x => x.ClassId == fee.Key.ClassId);
                    var baseFeeList = FeeBaseListTillDate(fee.Key.Id, start, end, filteredClassFee, studentFeeDiscount);
                    var feeRemaining = new List<Fee>();
                    if (fee.Value != null)
                    {
                        var feeDetails = fee.Value.Select(z => new Fee
                        {
                            FeeDate = z.FeeDate,
                            FeeType = z.FeeType.Name,
                            Amount = z.Amount,
                            Discount = z.Discount,
                            Fine = z.Fine
                        });
                        feeRemaining = FeeDetailList(feeDetails, baseFeeList)
                            .Where(x => !x.IsPaid).ToList();
                    }
                    else
                    {
                        feeRemaining = baseFeeList;
                    }
                    if (feeRemaining.Count > 0)
                    {
                        studentProfile.Student = new Student
                        {
                            Id = fee.Key.Id,
                            AadharNumber = fee.Key.AadharNumber,
                            RegistrationNo = fee.Key.RegistrationNo,
                            AdmissionNo = fee.Key.AdmissionNo,
                            Firstname = fee.Key.Firstname,
                            Middlename = fee.Key.Middlename,
                            Lastname = fee.Key.Lastname,
                            RollNumber = fee.Key.RollNumber,
                            Class = fee.Key.Class.Name,
                            Section = fee.Key.SectionId.HasValue ? fee.Key.Section.Name : "",
                            Stream = fee.Key.StreamId.HasValue ? fee.Key.Stream.Name : "",
                            Dateofbirth = fee.Key.Dateofbirth,
                            BloodGroup = fee.Key.BloodGroup.Name,
                            Religion = fee.Key.Religion.Name,
                            Category = fee.Key.Category.Name,
                            Cast = fee.Key.Cast,
                            StudentType = fee.Key.StudentType.Name,
                            Gender = fee.Key.Gender.Name,
                            BusRouteId = fee.Key.BusRouteId,
                        };
                        studentProfile.Parents = fee.Key.Parent.Select(y => new Parent
                        {
                            Name = y.Name,
                            Contact = y.Contact,
                            Email = y.Email,
                            Occupation = y.Occupation,
                            Address = y.Address,
                            IsPrimaryContact = y.IsPrimary,
                            ParentType = y.ParentType.Name
                        });
                        studentProfile.Fees = feeRemaining;
                        result.Add(studentProfile);
                    }
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private List<Fee> FeeBaseListTillDate(Guid studentId, DateTime start, DateTime end,
            IEnumerable<DataModel.ClassFee> filteredClassFee, IEnumerable<DataModel.StudentFeeDiscount> studentDiscount)
        {
            try
            {
                var baseList = new List<Fee>();
                var monthDiff = (12 * (end.Year - start.Year)) + end.Month - start.Month;
                foreach (var item in filteredClassFee)
                {
                    var feeOcuurence = item.FeeType.FeePeriod.Occurence;
                    var amount = 0;
                    var discount = studentDiscount.Where(x => x.FeeTypeId == item.FeeTypeId).FirstOrDefault();
                    if (discount != null)
                        amount = discount.Amount;

                    int remender = (12 / feeOcuurence);
                    for (int i = 0; i < feeOcuurence; i++)
                    {
                        var fee = new Fee
                        {
                            StudentId = studentId,
                            FeeDate = start.AddMonths(i * remender),
                            FeeType = item.FeeType.Name,
                            FeeTypeId = item.FeeTypeId,
                            Amount = item.FeeAmount - amount,
                            Fine = DateTime.Now.Date > item.FeeDueDate.Date ? item.FineAmount : 0,
                            Discount = item.DiscountAmount,
                            FeeOccurence = feeOcuurence,
                            IsPaid = false
                        };
                        var localMothDiff = (12 * (end.Year - fee.FeeDate.Year)) + end.Month - fee.FeeDate.Month;
                        if (localMothDiff >= 0 && monthDiff >= localMothDiff)
                            baseList.Add(fee);
                    }
                }
                return baseList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}