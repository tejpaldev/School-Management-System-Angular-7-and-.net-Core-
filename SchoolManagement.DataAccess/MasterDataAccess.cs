using SchoolManagement.DataAccess.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using SchoolManagement.DataAccess.Models;

namespace SchoolManagement.DataAccess
{
    public class MasterDataAccess : IMasterDataAccess
    {
        private SchoolEntities _dbContext;

        public MasterDataAccess(SchoolEntities schoolEntites)
        {
            _dbContext = schoolEntites;
        }

        public List<SchoolManagement.Model.BloodGroup> Bloodgroup()
        {
            var returnValue = new List<SchoolManagement.Model.BloodGroup>();
            try
            {
                returnValue = _dbContext.BloodGroup.Select(x => new SchoolManagement.Model.BloodGroup
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return returnValue;
        }

        public List<SchoolManagement.Model.Category> Category()
        {
            var returnValue = new List<SchoolManagement.Model.Category>();
            try
            {
                returnValue = _dbContext.Category.Select(x => new SchoolManagement.Model.Category
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return returnValue;
        }

        public List<SchoolManagement.Model.Gender> Gender()
        {
            var returnValue = new List<SchoolManagement.Model.Gender>();
            try
            {
                returnValue = _dbContext.Gender.Select(x => new SchoolManagement.Model.Gender
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return returnValue;
        }

        public List<SchoolManagement.Model.ParentType> Parenttype()
        {
            var returnValue = new List<SchoolManagement.Model.ParentType>();
            try
            {
                returnValue = _dbContext.ParentType.Select(x => new SchoolManagement.Model.ParentType
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return returnValue;
        }

        public List<SchoolManagement.Model.Religion> Religion()
        {
            try
            {
                var returnValue = _dbContext.Religion.Select(x => new SchoolManagement.Model.Religion
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToList();
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<SchoolManagement.Model.Status> Status()
        {
            try
            {
                var returnValue = _dbContext.Status.Select(x => new SchoolManagement.Model.Status
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                }).ToList();
                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
