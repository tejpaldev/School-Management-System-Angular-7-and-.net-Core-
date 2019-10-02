using System.Collections.Generic;
using SchoolManagement.Model;

namespace SchoolManagement.DataAccess.Interface
{
    public interface IMasterDataAccess
    {
        List<SchoolManagement.Model.BloodGroup> Bloodgroup();
        List<SchoolManagement.Model.Category> Category();
        List<SchoolManagement.Model.Gender> Gender();
        List<SchoolManagement.Model.Religion> Religion();
        List<SchoolManagement.Model.ParentType> Parenttype();
        List<SchoolManagement.Model.Status> Status();
    }
}