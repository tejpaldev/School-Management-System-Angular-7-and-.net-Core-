using SchoolManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement.Business.Interface
{
    public interface IProfileBusiness
    {
        bool AddProfile(Profile profile);
        bool DeleteProfile(Guid profileId);
        bool UpdateProfile(Profile profile);
        Profile FetchProfileById(Guid profileId);
        IEnumerable<Profile> FetchAllProfile();
    }
}
