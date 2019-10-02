using System.Collections.Generic;
using System;
using SchoolManagement.DataAccess.Models;

namespace SchoolManagement.DataAccess.Interface
{
    public interface IRoleDataAccess
    {
        int Add(Role roleData);
        IEnumerable<Role> Roles();
        Role SearchByRoleId(Guid roleId);
        int Delete(Role role);
        Role SearchByRoleName(string name);
    }
}