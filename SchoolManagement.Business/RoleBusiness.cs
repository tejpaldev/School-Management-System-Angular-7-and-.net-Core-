using System;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using System.Linq;
using SchoolManagement.DataAccess.Interface;
using DbModel = SchoolManagement.DataAccess.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace SchoolManagement.Business
{
    public class RoleBusiness : IRoleBusiness
    {
        private IRoleDataAccess _roleDataAccess;
        private string _username;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public RoleBusiness(IRoleDataAccess roleDataAccess, IHttpContextAccessor httpContextAccessor)
        {
            _roleDataAccess = roleDataAccess;
            _httpContextAccessor = httpContextAccessor;
            var result = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            _username = result == null ? "SYSTEM" : result.Value;
        }

        public bool Add(Role role)
        {
            try
            {
                var roleData = new DbModel.Role
                {
                    Id = Guid.NewGuid(),
                    Name = role.Name,
                    Description = role.Description,
                    StatusId = role.StatusId,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = _username
                };
                var result = _roleDataAccess.Add(roleData);
                var returnValue = result > 0 ? true : false;
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Role> Roles()
        {
            try
            {
                var result = _roleDataAccess.Roles().Select(x => new Role
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                }).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Delete(Guid roleId)
        {
            try
            {
                var role = _roleDataAccess.SearchByRoleId(roleId);
                if (role != null)
                {
                    role.StatusId = Guid.Parse(Helper.Constants.INACTIVESTATUS);
                    role.ModifiedBy = _username;
                    role.ModifiedDate = DateTime.UtcNow;
                    var result = _roleDataAccess.Delete(role);
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

        public Role Search(Role role)
        {
            try
            {
                var result = new DbModel.Role();
                if (role.Id != Guid.Empty)
                {
                    result = _roleDataAccess.SearchByRoleId(role.Id);
                }
                else if (!string.IsNullOrWhiteSpace(role.Name))
                {
                    result = _roleDataAccess.SearchByRoleName(role.Name);
                }
                else
                {
                    result = null;
                }
                if (result != null)
                {
                    var returnValue = new Role
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
    }
}