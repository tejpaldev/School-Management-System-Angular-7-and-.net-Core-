using System;
using System.Collections.Generic;
using SchoolManagement.Business.Interface;
using SchoolManagement.Model;
using DbModel = SchoolManagement.DataAccess.Models;
using SchoolManagement.DataAccess.Interface;
using System.Linq;
using SchoolManagement.Business.Helper;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace SchoolManagement.Business
{
    public class ParentBusiness : IParentBusiness
    {
        private IParentDataAccess _parentDataAccess;
        private string _username;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public ParentBusiness(IParentDataAccess parentDataAccess, IHttpContextAccessor httpContextAccessor)
        {
            _parentDataAccess = parentDataAccess;
            _httpContextAccessor = httpContextAccessor;
            var result = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            _username = result == null ? "SYSTEM" : result.Value;
        }

        public List<Guid> Register(List<Parent> parent)
        {
            var returnValue = new List<Guid>();
            try
            {
                var parents = new List<DbModel.Parent>();
                foreach (Parent item in parent)
                {
                    parents.Add(new DbModel.Parent
                    {
                        Id = Guid.NewGuid(),
                        ParentTypeId = item.ParentTypeId,
                        IsPrimary = item.IsPrimaryContact,
                        Name = item.Name,
                        Occupation = item.Occupation,
                        Address = item.Address,
                        Contact = item.Contact,
                        Email = item.Email,
                        StatusId = Guid.Parse(Constants.ACTIVESTATUS),
                        StudentId = item.StudentId,
                        CreatedBy = _username,
                        CreatedDate = DateTime.Now
                    });
                }
                var result = _parentDataAccess.Register(parents);
                if (result == parents.Count)
                    returnValue.AddRange(parents.Select(x => x.Id));
                else if (result < parents.Count && result > 0)
                    returnValue.AddRange(parents.Select(x => x.Id).Take(result));
            }
            catch (Exception)
            {
                throw;
            }
            return returnValue;
        }
    }
}