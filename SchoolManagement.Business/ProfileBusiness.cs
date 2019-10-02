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
    public class ProfileBusiness : IProfileBusiness
    {
        private IProfileDataAccess _profileDataAccess;
        public ProfileBusiness(IProfileDataAccess profileDataAccess)
        {
            _profileDataAccess = profileDataAccess;
        }

        public bool AddProfile(Profile profile)
        {
            throw new NotImplementedException();
        }

        public bool DeleteProfile(Guid profileId)
        {
            throw new NotImplementedException();
        }

        public bool UpdateProfile(Profile profile)
        {
            throw new NotImplementedException();
        }

        public Profile FetchProfileById(Guid profileId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Profile> FetchAllProfile()
        {
            throw new NotImplementedException();
        }
    }
}
