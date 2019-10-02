using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using SchoolManagement.Business.Helper;
using SchoolManagement.Business.Interface;
using SchoolManagement.DataAccess.Interface;
using SchoolManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using DbModel = SchoolManagement.DataAccess.Models;

namespace SchoolManagement.Business
{
    public class StudentBusiness : IStudentBusiness
    {
        private IStudentDataAccess _studentDataAccess;
        private readonly IClassDataAccess _classDataAccess;
        private readonly AppConfig _options;
        private string _username;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public StudentBusiness(IStudentDataAccess studentDataAccess, IClassDataAccess classDataAccess, IOptions<AppConfig> optionsAccessor, IHttpContextAccessor httpContextAccessor)
        {
            _studentDataAccess = studentDataAccess;
            _classDataAccess = classDataAccess;
            _options = optionsAccessor.Value;
            _httpContextAccessor = httpContextAccessor;
            var result = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            _username = result == null ? "SYSTEM" : result.Value;
        }

        public Student Register(Student student)
        {
            try
            {
                var returnValue = new Student();
                var newRollNumber = GenerateRollNumber(student.ClassId);
                var admissionNo = GenerateAdmissionNo(student.ClassCode.Trim(), newRollNumber);
                var registrationNo = GenerateRegistrationNo(student.ClassCode);
                var stu = new DbModel.Student
                {
                    Id = Guid.NewGuid(),
                    RegistrationNo = registrationNo,
                    AdmissionNo = admissionNo,
                    RollNumber = newRollNumber,
                    AadharNumber = student.AadharNumber,
                    Nationality = student.Nationality,
                    Firstname = student.Firstname,
                    Middlename = student.Middlename,
                    Lastname = student.Lastname,
                    Dateofbirth = student.Dateofbirth,
                    GenderId = student.GenderId,
                    BloodGroupId = student.BloodGroupId,
                    ReligionId = student.ReligionId,
                    CategoryId = student.CategoryId,
                    Cast = student.Cast,
                    PreviousSchoolName = student.PreviousSchoolName,
                    PreviousSchoolClass = student.PreviousSchoolClass,
                    ClassId = student.ClassId,
                    SectionId = student.SectionId,
                    StreamId = student.StreamId,
                    BusRouteId = student.BusRouteId,
                    StudentTypeId = student.StudentTypeId,
                    Reference = student.Reference,
                    StatusId = Guid.Parse(Constants.ACTIVESTATUS),
                    IsNew = true,
                    CreatedBy = _username,
                    CreatedDate = DateTime.Now
                };
                var result = _studentDataAccess.Register(stu);
                if (result == 1)
                {
                    returnValue = new Student
                    {
                        Id = stu.Id,
                        AdmissionNo = stu.AdmissionNo,
                        RegistrationNo = stu.RegistrationNo,
                        RollNumber = stu.RollNumber
                    };
                }
                else
                {
                    returnValue = null;
                }
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Student ReAdmission(Student student)
        {
            try
            {
                var returnValue = new Student();
                var newRollNumber = GenerateRollNumber(student.ClassId);
                var admissionNo = GenerateAdmissionNo(student.ClassCode, newRollNumber);
                var stu = _studentDataAccess.SearchById(student.Id);
                if (stu != null)
                {
                    stu.AdmissionNo = admissionNo;
                    stu.RollNumber = newRollNumber;
                    stu.ClassId = student.ClassId;
                    stu.SectionId = student.SectionId;
                    stu.StreamId = student.StreamId;
                    stu.IsNew = false;
                    stu.ModifiedBy = _username;
                    stu.ModifiedDate = DateTime.Now;
                }
                var result = _studentDataAccess.ReAdmission(stu);
                if (result == 1)
                {
                    returnValue = new Student
                    {
                        Id = stu.Id,
                        AdmissionNo = stu.AdmissionNo,
                        RegistrationNo = stu.RegistrationNo,
                        RollNumber = stu.RollNumber
                    };
                }
                else
                {
                    returnValue = null;
                }
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Student> Search(SearchForm searchForm)
        {
            try
            {
                var predicate = PredicateBuilder.True<DbModel.Student>();
                if (!string.IsNullOrWhiteSpace(searchForm.AdmissionNo))
                    predicate = predicate.And(x => x.AdmissionNo == searchForm.AdmissionNo);
                if (searchForm.ClassId.HasValue && searchForm.ClassId.Value != Guid.Empty)
                    predicate = predicate.And(x => x.ClassId == searchForm.ClassId.Value);
                if (!string.IsNullOrWhiteSpace(searchForm.StudentName))
                    predicate = predicate.And(x => searchForm.StudentName.Contains(x.Firstname) || searchForm.StudentName.Contains(x.Middlename) || searchForm.StudentName.Contains(x.Lastname));
                if (!string.IsNullOrWhiteSpace(searchForm.RegistrationNo))
                    predicate = predicate.And(x => x.RegistrationNo == searchForm.RegistrationNo);
                if (searchForm.DateofBirth.HasValue && searchForm.DateofBirth.Value != DateTime.MinValue)
                    predicate = predicate.And(x => x.Dateofbirth == searchForm.DateofBirth.Value);
                if (searchForm.Contact.HasValue && searchForm.Contact.Value != 0 && searchForm.Contact.Value.ToString().Length == 10)
                {
                    var studentId = _studentDataAccess.StudentIdByParentContact(searchForm.Contact.Value);
                    if (studentId != Guid.Empty)
                        predicate = predicate.And(x => x.Id == studentId);
                }
                var studentList = _studentDataAccess.Search(predicate);
                return studentList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private string GenerateRegistrationNo(string classCode)
        {
            var schRegNo = _options.SchoolRegNo;
            var totalCount = _studentDataAccess.StudentCount();
            var totalCountString = (totalCount + 1).ToString();
            switch (totalCountString.Length)
            {
                case 1:
                    totalCountString = "000" + totalCountString;
                    break;
                case 2:
                    totalCountString = "00" + totalCountString;
                    break;
                case 3:
                    totalCountString = "0" + totalCountString;
                    break;
                default:
                    break;
            }
            var registrationNo = schRegNo + classCode + totalCountString;
            return registrationNo;
        }

        private int GenerateRollNumber(Guid classId)
        {
            try
            {
                var maxRollNo = 0;
                var predicate = PredicateBuilder.True<DbModel.Student>();
                predicate = predicate.And(x => x.ClassId == classId);
                var studentList = _studentDataAccess.Search(predicate);
                if (studentList.Count() > 0)
                {
                    maxRollNo = studentList.Max(x => x.RollNumber);
                }
                return maxRollNo + 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private string GenerateAdmissionNo(string classCode, int rollNumber)
        {
            var rollNumberString = rollNumber.ToString();
            switch (rollNumberString.Length)
            {
                case 1:
                    rollNumberString = "000" + rollNumberString;
                    break;
                case 2:
                    rollNumberString = "00" + rollNumberString;
                    break;
                case 3:
                    rollNumberString = "0" + rollNumberString;
                    break;
                default:
                    break;
            }
            return classCode + rollNumberString;
        }

        public List<StudentType> StudentType()
        {
            try
            {
                var result = _studentDataAccess.StudentType();
                var returnValue = result.Select(x => new StudentType
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    Status = x.Status.Name,
                    StatusId = x.StatusId
                }).ToList();
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentType> DeleteStudentType(StudentType studentType)
        {
            try
            {
                var deleteObj = _studentDataAccess.StudentTypeById(studentType.Id);

                deleteObj.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                deleteObj.ModifiedBy = _username;
                deleteObj.ModifiedDate = DateTime.Now;

                var deleteresult = _studentDataAccess.DeleteStudentType(deleteObj);

                if (deleteresult > 0)
                {
                    var result = _studentDataAccess.StudentType();
                    var returnValue = result.Select(x => new StudentType
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        Status = x.Status.Name,
                        StatusId = x.StatusId
                    }).ToList();
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

        public IEnumerable<StudentType> EditStudentType(StudentType studentType)
        {
            try
            {
                var editObj = _studentDataAccess.StudentTypeById(studentType.Id);

                editObj.Name = studentType.Name;
                editObj.Description = studentType.Description;
                editObj.StatusId = studentType.StatusId;
                editObj.ModifiedBy = _username;
                editObj.ModifiedDate = DateTime.Now;

                var editresult = _studentDataAccess.EditStudentType(editObj);

                if (editresult > 0)
                {
                    var result = _studentDataAccess.StudentType();
                    var returnValue = result.Select(x => new StudentType
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        Status = x.Status.Name,
                        StatusId = x.StatusId
                    }).ToList();
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

        public IEnumerable<StudentType> AddStudentType(StudentType studentType)
        {
            try
            {
                var addObj = new DbModel.StudentType
                {
                    Id = Guid.NewGuid(),
                    Name = studentType.Name,
                    Description = studentType.Description,
                    StatusId = studentType.StatusId,
                    CreatedBy = _username,
                    CreatedDate = DateTime.Now
                };
                var addresult = _studentDataAccess.AddStudentType(addObj);
                if (addresult > 0)
                {
                    var result = _studentDataAccess.StudentType();
                    var returnValue = result.Select(x => new StudentType
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        Status = x.Status.Name,
                        StatusId = x.StatusId
                    }).ToList();
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

        public IEnumerable<StudentFeeDiscount> StudentFeeDiscount()
        {
            try
            {
                var result = _studentDataAccess.StudentFeeDiscount(false);
                var returnValue = result.Select(x => new StudentFeeDiscount
                {
                    Id = x.Id,
                    StudentType = x.StudentType.Name,
                    StudentTypeId = x.StudentTypeId,
                    FeeType = x.FeeType.Name,
                    FeeTypeId = x.FeeTypeId,
                    Amount = x.Amount,
                    Status = x.Status.Name,
                    StatusId = x.StatusId
                }).ToList();
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentFeeDiscount> AddStudentFeeDiscount(StudentFeeDiscount stuFeeDiscount)
        {
            try
            {
                var addObj = new DbModel.StudentFeeDiscount
                {
                    Id = Guid.NewGuid(),
                    StudentTypeId = stuFeeDiscount.StudentTypeId,
                    FeeTypeId = stuFeeDiscount.FeeTypeId,
                    Amount = stuFeeDiscount.Amount,
                    StatusId = stuFeeDiscount.StatusId,
                    CreatedBy = _username,
                    CreatedDate = DateTime.Now
                };
                var addresult = _studentDataAccess.AddStudentFeeDiscount(addObj);
                if (addresult > 0)
                {
                    var result = _studentDataAccess.StudentFeeDiscount(true);
                    var returnValue = result.Select(x => new StudentFeeDiscount
                    {
                        Id = x.Id,
                        StudentType = x.StudentType.Name,
                        StudentTypeId = x.StudentType.Id,
                        FeeType = x.FeeType.Name,
                        FeeTypeId = x.FeeType.Id,
                        Amount = x.Amount,
                        Status = x.Status.Name,
                        StatusId = x.StatusId
                    }).ToList();
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

        public IEnumerable<StudentFeeDiscount> EditStudentFeeDiscount(StudentFeeDiscount stuFeeDiscount)
        {
            try
            {
                var editObj = _studentDataAccess.StudentFeeDiscountById(stuFeeDiscount.Id);
                if (editObj != null)
                {
                    editObj.StudentTypeId = stuFeeDiscount.StudentTypeId;
                    editObj.FeeTypeId = stuFeeDiscount.FeeTypeId;
                    editObj.Amount = stuFeeDiscount.Amount;
                    editObj.StatusId = stuFeeDiscount.StatusId;
                    editObj.ModifiedBy = _username;
                    editObj.ModifiedDate = DateTime.Now;

                    var editresult = _studentDataAccess.EditStudentFeeDiscount(editObj);

                    if (editresult > 0)
                    {
                        var result = _studentDataAccess.StudentFeeDiscount(false);
                        var returnValue = result.Select(x => new StudentFeeDiscount
                        {
                            Id = x.Id,
                            StudentType = x.StudentType.Name,
                            StudentTypeId = x.StudentTypeId,
                            FeeType = x.FeeType.Name,
                            FeeTypeId = x.FeeTypeId,
                            Amount = x.Amount,
                            Status = x.Status.Name,
                            StatusId = x.StatusId
                        }).ToList();
                        return returnValue;
                    }
                    else
                        return null;
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentFeeDiscount> DeleteStudentFeeDiscount(StudentFeeDiscount stuFeeDiscount)
        {
            try
            {
                var deleteObj = _studentDataAccess.StudentFeeDiscountById(stuFeeDiscount.Id);
                if (deleteObj != null)
                {
                    deleteObj.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                    deleteObj.ModifiedBy = _username;
                    deleteObj.ModifiedDate = DateTime.Now;

                    var deleteresult = _studentDataAccess.DeleteStudentFeeDiscount(deleteObj);

                    if (deleteresult > 0)
                    {
                        var result = _studentDataAccess.StudentFeeDiscount(false);
                        var returnValue = result.Select(x => new StudentFeeDiscount
                        {
                            Id = x.Id,
                            StudentType = x.StudentType.Name,
                            StudentTypeId = x.StudentTypeId,
                            FeeType = x.FeeType.Name,
                            FeeTypeId = x.FeeTypeId,
                            Amount = x.Amount,
                            Status = x.Status.Name,
                            StatusId = x.StatusId
                        }).ToList();
                        return returnValue;
                    }
                    else
                        return null;
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentProfile> StudentProfile(ReportFilter filter)
        {
            try
            {
                IEnumerable<StudentProfile> result = new List<StudentProfile>();
                var predicate = PredicateBuilder.True<DbModel.Student>();
                if (!string.IsNullOrWhiteSpace(filter.AdmissionNo))
                {
                    predicate = predicate.And(x => x.AdmissionNo == filter.AdmissionNo);
                }
                if (!string.IsNullOrWhiteSpace(filter.StudentName))
                {
                    var name = filter.StudentName.ToLower().Split(' ').ToList();
                    if (name.Count == 1)
                    {
                        var fullname = name[0];
                        predicate = predicate.And(x => x.Firstname == fullname);
                        predicate = predicate.Or(x => x.Middlename == fullname);
                        predicate = predicate.Or(x => x.Lastname == fullname);
                    }
                    else if (name.Count == 2)
                    {
                        var firstName = name[0];
                        var fullname = name[1];
                        predicate = predicate.And(x => x.Firstname == firstName);
                        predicate = predicate.And(x => x.Middlename == fullname);
                        predicate = predicate.Or(x => x.Lastname == fullname);
                    }
                    else if (name.Count == 3)
                    {
                        var firstName = name[0];
                        var middleName = name[1];
                        var lastName = name[2];
                        predicate = predicate.And(x => x.Firstname == firstName);
                        predicate = predicate.And(x => x.Middlename == middleName);
                        predicate = predicate.And(x => x.Lastname == lastName);
                    }
                    else
                    {
                        predicate = predicate.And(x => name.Contains(x.Firstname));
                        predicate = predicate.Or(x => name.Contains(x.Middlename));
                        predicate = predicate.Or(x => name.Contains(x.Lastname));
                    }
                }
                var studentDetail = _studentDataAccess.StudentDetails(predicate);

                if (studentDetail != null && studentDetail.Count() > 0)
                {
                    result = studentDetail.Select(x => new StudentProfile
                    {
                        Student = new Student
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
                            Section = x.SectionId.HasValue ? x.Section.Name : "",
                            Stream = x.StreamId.HasValue ? x.Stream.Name : "",
                            Dateofbirth = x.Dateofbirth,
                            BloodGroup = x.BloodGroup.Name,
                            Religion = x.Religion.Name,
                            Category = x.Category.Name,
                            Cast = x.Cast,
                            StudentType = x.StudentType.Name,
                            Gender = x.Gender.Name,
                            BusRouteId = x.BusRouteId,
                        },
                        Parents = x.Parent.Select(y => new Parent
                        {
                            Name = y.Name,
                            Contact = y.Contact,
                            Address = y.Address,
                            IsPrimaryContact = y.IsPrimary,
                            ParentType = y.ParentType.Name
                        }),
                        Fees = x.Fee.Select(z => new Fee
                        {
                            FeeDate = z.FeeDate,
                            FeeType = z.FeeType.Name,
                            Amount = z.Amount,
                            Discount = z.Discount,
                            Fine = z.Fine
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
    }
}