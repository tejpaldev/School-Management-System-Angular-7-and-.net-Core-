using System;
using System.Collections.Generic;
using SchoolManagement.DataAccess.Interface;
using System.Linq;
using SchoolManagement.DataAccess.Helper;
using SchoolManagement.DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagement.DataAccess
{
    public class RoleDataAccess : IRoleDataAccess
    {
        private SchoolEntities _dbContext;
        private Guid _active = Guid.Parse(Constants.ACTIVESTATUS);

        public RoleDataAccess(SchoolEntities schoolEntites)
        {
            _dbContext = schoolEntites;
        }

        public int Add(Role roleData)
        {
            try
            {
                _dbContext.Role.Add(roleData);
                var returnValue = _dbContext.SaveChanges();
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<Role> Roles()
        {
            try
            {
                var result = _dbContext.Role.Where(x => x.StatusId == _active);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Role SearchByRoleId(Guid roleId)
        {
            try
            {
                var result = _dbContext.Role.Where(x => x.Id == roleId && x.StatusId == _active)
                    .SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(Role role)
        {
            try
            {
                _dbContext.Role.Add(role);
                _dbContext.Entry(role).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Role SearchByRoleName(string name)
        {
            try
            {
                var result = _dbContext.Role.Where(x => x.Name == name && x.StatusId == _active)
                    .SingleOrDefault();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}