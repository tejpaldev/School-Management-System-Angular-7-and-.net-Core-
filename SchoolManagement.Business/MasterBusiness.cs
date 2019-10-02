using SchoolManagement.Business.Interface;
using SchoolManagement.DataAccess.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolManagement.Model;

namespace SchoolManagement.Business
{
    public class MasterBusiness : IMasterBusiness
    {
        private IMasterDataAccess _masterDataAccess;
        public MasterBusiness(IMasterDataAccess masterDataAccess)
        {
            _masterDataAccess = masterDataAccess;
        }

        public List<BloodGroup> Bloodgroup()
        {
            var bloodgroup = new List<BloodGroup>();
            try
            {
                bloodgroup = _masterDataAccess.Bloodgroup();
            }
            catch (Exception)
            {

                throw;
            }
            return bloodgroup;
        }

        public List<Category> Category()
        {
            var category = new List<Category>();
            try
            {
                category = _masterDataAccess.Category();
            }
            catch (Exception)
            {

                throw;
            }
            return category;
        }

        public List<Gender> Gender()
        {
            var gender = new List<Gender>();
            try
            {
                gender = _masterDataAccess.Gender();
            }
            catch (Exception)
            {

                throw;
            }
            return gender;
        }

        public List<ParentType> Parenttype()
        {
            var parentType = new List<ParentType>();
            try
            {
                parentType = _masterDataAccess.Parenttype();
            }
            catch (Exception)
            {

                throw;
            }
            return parentType;
        }

        public List<Religion> Religion()
        {
            try
            {
                var religion = new List<Religion>();
                religion = _masterDataAccess.Religion();
                return religion;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Status> Status()
        {
            try
            {
                var status = new List<Status>();
                status = _masterDataAccess.Status();
                return status;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
