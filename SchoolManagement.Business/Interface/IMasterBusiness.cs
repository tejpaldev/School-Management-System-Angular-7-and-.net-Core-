using System.Collections.Generic;
using SchoolManagement.Model;

namespace SchoolManagement.Business.Interface
{
    public interface IMasterBusiness
    {
        List<Gender> Gender();
        List<BloodGroup> Bloodgroup();
        List<Religion> Religion();
        List<Category> Category();
        List<ParentType> Parenttype();
        List<Status> Status();
    }
}