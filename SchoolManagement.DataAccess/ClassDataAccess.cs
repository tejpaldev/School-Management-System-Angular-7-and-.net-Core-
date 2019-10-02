using System;
using System.Collections.Generic;
using SchoolManagement.DataAccess.Interface;
using System.Linq;
using SchoolManagement.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagement.DataAccess
{
    public class ClassDataAccess : IClassDataAccess
    {
        private SchoolEntities _dbContext;
        private readonly Guid _activeStatus = Guid.Parse("10000000-0000-0000-0000-000000000000");
        public ClassDataAccess(SchoolEntities schoolEntites)
        {
            _dbContext = schoolEntites;
        }

        public Class Class(Guid id)
        {
            try
            {
                var returnValue = _dbContext.Class.Where(x => x.Id == id && x.StatusId == _activeStatus).SingleOrDefault();
                return returnValue;
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
                var returnValue = _dbContext.Section.Where(x => x.Id == id && x.StatusId == _activeStatus).SingleOrDefault();
                return returnValue;
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
                var returnValue = _dbContext.Stream.Where(x => x.Id == id && x.StatusId == _activeStatus).SingleOrDefault();
                return returnValue;
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
                var returnValue = _dbContext.ClassSection.Where(x => x.Id == id && x.StatusId == _activeStatus).SingleOrDefault();
                return returnValue;
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
                var returnValue = _dbContext.ClassStream.Where(x => x.Id == id && x.StatusId == _activeStatus).SingleOrDefault();
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Class> Class()
        {
            try
            {
                var returnValue = _dbContext.Class.Where(x => x.StatusId == _activeStatus);
                var stringCon = _dbContext.Database.GetDbConnection().ConnectionString;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Section> Section()
        {
            try
            {
                var returnValue = _dbContext.Section.Where(x => x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Stream> Stream()
        {
            try
            {
                var returnValue = _dbContext.Stream.Where(x => x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassSection> ClassSection()
        {
            try
            {
                var returnValue = _dbContext.ClassSection.Where(x => x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassStream> ClassStream()
        {
            try
            {
                var returnValue = _dbContext.ClassStream.Where(x => x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Section> SectionByClassId(Guid classId)
        {
            try
            {
                var returnValue = _dbContext.Section.Where(x => x.StatusId == _activeStatus)
                    .Join(_dbContext.ClassSection.Where(x => x.ClassId == classId && x.StatusId == _activeStatus),
                    s => s.Id, cs => cs.SectionId, (s, cs) => s);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassStream> StreamByClassId(Guid classId)
        {
            try
            {
                var returnValue = _dbContext.ClassStream.Where(x => x.ClassId == classId && x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassStream> StreamByClassSectionId(Guid classId, Guid sectionId)
        {
            try
            {
                var returnValue = _dbContext.ClassStream.Where(x => x.ClassId == classId && x.SectionId == sectionId && x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassSection> ClassSectionByClassId(Guid classId)
        {
            try
            {
                var returnValue = _dbContext.ClassSection.Where(x => x.ClassId == classId && x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassSection> ClassSectionBySectionId(Guid sectionId)
        {
            try
            {
                var returnValue = _dbContext.ClassSection.Where(x => x.SectionId == sectionId && x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassStream> ClassStreamByClassId(Guid classId)
        {
            try
            {
                var returnValue = _dbContext.ClassStream.Where(x => x.ClassId == classId && x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassStream> ClassStreamByClassSectionId(Guid classId, Guid sectionId)
        {
            try
            {
                var returnValue = _dbContext.ClassStream.Where(x => x.ClassId == classId && x.SectionId == sectionId && x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ClassStream> ClassStreamByStreamId(Guid streamId)
        {
            try
            {
                var returnValue = _dbContext.ClassStream.Where(x => x.StreamId == streamId && x.StatusId == _activeStatus);
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(Class cls)
        {
            try
            {
                _dbContext.Class.Add(cls);
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddSection(Section sec)
        {
            try
            {
                _dbContext.Section.Add(sec);
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddStream(Stream strm)
        {
            try
            {
                _dbContext.Stream.Add(strm);
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddClassSection(ClassSection clsection)
        {
            try
            {
                _dbContext.ClassSection.Add(clsection);
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int AddClassStream(ClassStream clstream)
        {
            try
            {
                _dbContext.ClassStream.Add(clstream);
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(Class classes)
        {
            try
            {
                _dbContext.Class.Add(classes);
                _dbContext.Entry(classes).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteSection(Section section)
        {
            try
            {
                _dbContext.Section.Add(section);
                _dbContext.Entry(section).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteStream(Stream stream)
        {
            try
            {
                _dbContext.Stream.Add(stream);
                _dbContext.Entry(stream).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteClassSection(ClassSection classSection)
        {
            try
            {
                _dbContext.ClassSection.Add(classSection);
                _dbContext.Entry(classSection).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int DeleteClassStream(ClassStream classStream)
        {
            try
            {
                _dbContext.ClassStream.Add(classStream);
                _dbContext.Entry(classStream).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}