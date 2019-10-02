using SchoolManagement.DataAccess.Models;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Interface
{
    public interface IParentDataAccess
    {
        int Register(List<Parent> parents);
    }
}