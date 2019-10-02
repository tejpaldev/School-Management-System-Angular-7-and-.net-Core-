using System.Collections.Generic;
using SchoolManagement.Model;
using System;

namespace SchoolManagement.Business.Interface
{
    public interface IRoleBusiness
    {
        bool Add(Role role);
        List<Role> Roles();
        bool Delete(Guid roleId);
        Role Search(Role role);
    }
}