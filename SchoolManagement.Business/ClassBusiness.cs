using Microsoft.AspNetCore.Http;
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
    public class ClassBusiness : IClassBusiness
    {
        private IClassDataAccess _classDataAccess;
        private string _username;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ClassBusiness(IClassDataAccess classDataAccess, IHttpContextAccessor httpContextAccessor)
        {
            _classDataAccess = classDataAccess;
            _httpContextAccessor = httpContextAccessor;
            var result = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            _username = result == null ? "SYSTEM" : result.Value;
        }

        public List<Class> Class()
        {
            try
            {
                var result = _classDataAccess.Class().Select(x => new Class
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    StatusId = x.StatusId,
                    Status = x.Status.Name,
                    Code = x.Code
                }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Section> Section(Guid? classId)
        {
            try
            {
                var sections = new List<Section>();
                if (classId.HasValue)
                    sections = _classDataAccess.SectionByClassId(classId.Value).Select(x => new Section
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                else
                    sections = _classDataAccess.Section().Select(x => new Section
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                return sections;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Stream> Stream(Guid? classId, Guid? sectionId)
        {
            try
            {
                var streams = new List<Stream>();
                if (classId.HasValue && !sectionId.HasValue)
                    streams = _classDataAccess.StreamByClassId(classId.Value).Select(x => new Stream
                    {
                        Id = x.Id,
                        Name = x.Stream.Name,
                        Description = x.Stream.Description,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                else if (classId.HasValue && sectionId.HasValue)
                    streams = _classDataAccess.StreamByClassSectionId(classId.Value, sectionId.Value).Select(x => new Stream
                    {
                        Id = x.Id,
                        Name = x.Stream.Name,
                        Description = x.Stream.Description,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                else if (!classId.HasValue && !sectionId.HasValue)
                    streams = _classDataAccess.Stream().Select(x => new Stream
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Description = x.Description,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                return streams;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ClassSection> ClassSection(Guid? classId, Guid? sectionId)
        {
            try
            {
                var classSections = new List<ClassSection>();
                if (classId.HasValue)
                    classSections = _classDataAccess.ClassSectionByClassId(classId.Value).Select(x => new ClassSection
                    {
                        Id = x.Id,
                        ClassId = x.ClassId,
                        Class = x.Class.Name,
                        SectionId = x.SectionId,
                        Section = x.Section.Name,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                else if (sectionId.HasValue)
                    classSections = _classDataAccess.ClassSectionBySectionId(sectionId.Value).Select(x => new ClassSection
                    {
                        Id = x.Id,
                        ClassId = x.ClassId,
                        Class = x.Class.Name,
                        SectionId = x.SectionId,
                        Section = x.Section.Name,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                else
                    classSections = _classDataAccess.ClassSection().Select(x => new ClassSection
                    {
                        Id = x.Id,
                        ClassId = x.ClassId,
                        Class = x.Class.Name,
                        SectionId = x.SectionId,
                        Section = x.Section.Name,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                return classSections;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ClassStream> ClassStream(Guid? classId, Guid? sectionId, Guid? streamId)
        {
            try
            {
                var classStream = new List<ClassStream>();
                if (classId.HasValue && !sectionId.HasValue && !streamId.HasValue)
                    classStream = _classDataAccess.ClassStreamByClassId(classId.Value).Select(x => new ClassStream
                    {
                        Id = x.Id,
                        ClassId = x.ClassId,
                        Class = x.Class.Name,
                        SectionId = x.SectionId,
                        Section = x.SectionId != null ? x.Section.Name : string.Empty,
                        StreamId = x.StreamId,
                        Stream = x.Stream.Name,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                else if (classId.HasValue && sectionId.HasValue && !streamId.HasValue)
                    classStream = _classDataAccess.ClassStreamByClassSectionId(classId.Value, sectionId.Value).Select(x => new ClassStream
                    {
                        Id = x.Id,
                        ClassId = x.ClassId,
                        Class = x.Class.Name,
                        SectionId = x.SectionId,
                        Section = x.SectionId != null ? x.Section.Name : string.Empty,
                        StreamId = x.StreamId,
                        Stream = x.Stream.Name,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                else if (!classId.HasValue && !sectionId.HasValue && streamId.HasValue)
                    classStream = _classDataAccess.ClassStreamByStreamId(streamId.Value).Select(x => new ClassStream
                    {
                        Id = x.Id,
                        ClassId = x.ClassId,
                        Class = x.Class.Name,
                        SectionId = x.SectionId,
                        Section = x.SectionId != null ? x.Section.Name : string.Empty,
                        StreamId = x.StreamId,
                        Stream = x.Stream.Name,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                else
                    classStream = _classDataAccess.ClassStream().Select(x => new ClassStream
                    {
                        Id = x.Id,
                        ClassId = x.ClassId,
                        Class = x.Class.Name,
                        SectionId = x.SectionId,
                        Section = x.SectionId != null ? x.Section.Name : string.Empty,
                        StreamId = x.StreamId,
                        Stream = x.Stream.Name,
                        StatusId = x.StatusId,
                        Status = x.Status.Name
                    }).ToList();
                return classStream;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Class Class(Guid id)
        {
            try
            {
                var result = _classDataAccess.Class(id);
                if (result != null)
                {
                    var returnValue = new Class
                    {
                        Id = result.Id,
                        Name = result.Name,
                        Description = result.Description,
                        StatusId = result.StatusId,
                        Status = result.Status.Name,
                        Code = result.Code
                    };
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

        public Section Section(Guid id)
        {
            try
            {
                var result = _classDataAccess.Section(id);
                if (result != null)
                {
                    var returnValue = new Section
                    {
                        Id = result.Id,
                        Name = result.Name,
                        Description = result.Description,
                        StatusId = result.StatusId,
                        Status = result.Status.Name
                    };
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

        public Stream Stream(Guid id)
        {
            try
            {
                var result = _classDataAccess.Stream(id);
                if (result != null)
                {
                    var returnValue = new Stream
                    {
                        Id = result.Id,
                        Name = result.Name,
                        Description = result.Description,
                        StatusId = result.StatusId,
                        Status = result.Status.Name
                    };
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

        public ClassSection ClassSection(Guid id)
        {
            try
            {
                var result = _classDataAccess.ClassSection(id);
                if (result != null)
                {
                    var returnValue = new ClassSection
                    {
                        Id = result.Id,
                        ClassId = result.ClassId,
                        Class = result.Class.Name,
                        SectionId = result.SectionId,
                        Section = result.Section.Name,
                        StatusId = result.StatusId,
                        Status = result.Status.Name
                    };
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

        public ClassStream ClassStream(Guid id)
        {
            try
            {
                var result = _classDataAccess.ClassStream(id);
                if (result != null)
                {
                    var returnValue = new ClassStream
                    {
                        Id = result.Id,
                        ClassId = result.ClassId,
                        Class = result.Class.Name,
                        SectionId = result.SectionId,
                        Section = result.Section.Name,
                        StreamId = result.StreamId,
                        Stream = result.Stream.Name,
                        StatusId = result.StatusId,
                        Status = result.Status.Name
                    };
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

        public bool Add(Class classes)
        {
            try
            {
                var cls = new DbModel.Class
                {
                    Id = Guid.NewGuid(),
                    Name = classes.Name,
                    Code = classes.Code,
                    Description = classes.Description,
                    StatusId = classes.StatusId,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = _username
                };
                var result = _classDataAccess.Add(cls);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddSection(Section section)
        {
            try
            {
                var sec = new DbModel.Section
                {
                    Id = Guid.NewGuid(),
                    Name = section.Name,
                    Description = section.Description,
                    StatusId = section.StatusId,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = _username
                };
                var result = _classDataAccess.AddSection(sec);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddStream(Stream stream)
        {
            try
            {
                var strm = new DbModel.Stream
                {
                    Id = Guid.NewGuid(),
                    Name = stream.Name,
                    Description = stream.Description,
                    StatusId = stream.StatusId,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = _username
                };
                var result = _classDataAccess.AddStream(strm);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddClassSection(ClassSection classSection)
        {
            try
            {
                var clsection = new DbModel.ClassSection
                {
                    Id = Guid.NewGuid(),
                    ClassId = classSection.ClassId,
                    SectionId = classSection.SectionId,
                    StatusId = classSection.StatusId,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = _username
                };
                var result = _classDataAccess.AddClassSection(clsection);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool AddClassStream(ClassStream classStream)
        {
            try
            {
                var clstream = new DbModel.ClassStream
                {
                    Id = Guid.NewGuid(),
                    ClassId = classStream.ClassId,
                    SectionId = classStream.SectionId,
                    StreamId = classStream.StreamId,
                    StatusId = classStream.StatusId,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = _username
                };
                var result = _classDataAccess.AddClassStream(clstream);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Delete(Guid id)
        {
            try
            {
                var classes = _classDataAccess.Class(id);
                if (classes != null)
                {
                    classes.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                    classes.ModifiedDate = DateTime.UtcNow;
                    classes.ModifiedBy = _username;
                    var result = _classDataAccess.Delete(classes);
                    var returnValue = result > 0 ? true : false;
                    return returnValue;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteSection(Guid id)
        {
            try
            {
                var section = _classDataAccess.Section(id);
                if (section != null)
                {
                    section.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                    section.ModifiedDate = DateTime.UtcNow;
                    section.ModifiedBy = _username;
                    var result = _classDataAccess.DeleteSection(section);
                    var returnValue = result > 0 ? true : false;
                    return returnValue;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteStream(Guid id)
        {
            try
            {
                var stream = _classDataAccess.Stream(id);
                if (stream != null)
                {
                    stream.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                    stream.ModifiedDate = DateTime.UtcNow;
                    stream.ModifiedBy = _username;
                    var result = _classDataAccess.DeleteStream(stream);
                    var returnValue = result > 0 ? true : false;
                    return returnValue;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteClassSection(Guid id)
        {
            try
            {
                var classSection = _classDataAccess.ClassSection(id);
                if (classSection != null)
                {
                    classSection.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                    classSection.ModifiedDate = DateTime.UtcNow;
                    classSection.ModifiedBy = _username;
                    var result = _classDataAccess.DeleteClassSection(classSection);
                    var returnValue = result > 0 ? true : false;
                    return returnValue;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteClassStream(Guid id)
        {
            try
            {
                var classStream = _classDataAccess.ClassStream(id);
                if (classStream != null)
                {
                    classStream.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                    classStream.ModifiedDate = DateTime.UtcNow;
                    classStream.ModifiedBy = _username;
                    var result = _classDataAccess.DeleteClassStream(classStream);
                    var returnValue = result > 0 ? true : false;
                    return returnValue;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}