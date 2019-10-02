using System;
using System.Collections.Generic;
using SchoolManagement.Model;

namespace SchoolManagement.Business.Interface
{
    public interface IClassBusiness
    {
        List<Class> Class();
        List<Section> Section(Guid? classId);
        List<Stream> Stream(Guid? classId, Guid? sectionId);
        List<ClassSection> ClassSection(Guid? classId, Guid? sectionId);
        List<ClassStream> ClassStream(Guid? classId, Guid? sectionId, Guid? streamId);
        Class Class(Guid id);
        Section Section(Guid id);
        Stream Stream(Guid id);
        ClassSection ClassSection(Guid id);
        ClassStream ClassStream(Guid id);
        bool Add(Class classes);
        bool AddSection(Section section);
        bool AddStream(Stream stream);        
        bool AddClassSection(ClassSection classSection);
        bool AddClassStream(ClassStream classStream);
        bool Delete(Guid id);
        bool DeleteSection(Guid id);
        bool DeleteStream(Guid id);
        bool DeleteClassSection(Guid id);
        bool DeleteClassStream(Guid id);
    }
}