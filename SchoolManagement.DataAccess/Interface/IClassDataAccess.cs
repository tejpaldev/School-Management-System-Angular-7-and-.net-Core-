using SchoolManagement.DataAccess.Models;
using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Interface
{
    public interface IClassDataAccess
    {
        Class Class(Guid id);
        Section Section(Guid id);
        Stream Stream(Guid id);
        ClassSection ClassSection(Guid id);
        ClassStream ClassStream(Guid id);
        IEnumerable<Class> Class();
        IEnumerable<Section> Section();
        IEnumerable<Stream> Stream();
        IEnumerable<ClassSection> ClassSection();
        IEnumerable<ClassStream> ClassStream();
        IEnumerable<Section> SectionByClassId(Guid classId);
        IEnumerable<ClassStream> StreamByClassId(Guid classId);
        IEnumerable<ClassStream> StreamByClassSectionId(Guid classId, Guid sectionId);
        IEnumerable<ClassSection> ClassSectionByClassId(Guid value);
        IEnumerable<ClassSection> ClassSectionBySectionId(Guid value);
        IEnumerable<ClassStream> ClassStreamByClassId(Guid value);
        IEnumerable<ClassStream> ClassStreamByClassSectionId(Guid value1, Guid value2);
        IEnumerable<ClassStream> ClassStreamByStreamId(Guid value);
        int Add(Class cls);
        int AddSection(Section section);
        int AddStream(Stream stream);
        int AddClassSection(ClassSection clsection);
        int AddClassStream(ClassStream clstream);
        int Delete(Class classes);
        int DeleteSection(Section section);
        int DeleteStream(Stream stream);
        int DeleteClassSection(ClassSection stream);
        int DeleteClassStream(ClassStream classStream);
    }
}