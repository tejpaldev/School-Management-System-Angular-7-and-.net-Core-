using SchoolManagement.DataAccess.Interface;
using System.Linq;
using System.Security.Claims;
using System.Web;
using System;
using System.Collections.Generic;
using SchoolManagement.DataAccess.Models;

namespace SchoolManagement.DataAccess
{
    public class ParentDataAccess : IParentDataAccess
    {
        private SchoolEntities _dbContext;

        public ParentDataAccess(SchoolEntities schoolEntites)
        {
            _dbContext = schoolEntites;
        }

        public int Register(List<Parent> parents)
        {
            try
            {
                _dbContext.Parent.AddRange(parents);
                var result = _dbContext.SaveChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}