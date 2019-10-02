using SchoolManagement.DataAccess.Helper;
using SchoolManagement.DataAccess.Interface;
using SchoolManagement.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Model = SchoolManagement.Model;

namespace SchoolManagement.DataAccess
{
    public class ProfileDataAccess : IProfileDataAccess
    {
        private SchoolEntities _dbContext;
        private string _username;

        public ProfileDataAccess(SchoolEntities schoolEntites, string username)
        {
            _dbContext = schoolEntites;
            _username = username;
        }

        public bool AddProfile(Model.Profile profile)
        {
            var returnValue = false;
            try
            {
                var pro = new Profile
                {
                    Id = Guid.NewGuid(),
                    Firstname = profile.Firstname,
                    Middlename = profile.Middlename,
                    Lastname = profile.Lastname,
                    GenderId = profile.GenderId,
                    StatusId = Guid.Parse(Constants.ACTIVESTATUS),
                    CreatedBy = _username,
                    CreatedDate = DateTime.Now
                };
                _dbContext.Profile.Add(pro);
                var result = _dbContext.SaveChanges();
                if (result == 1)
                    returnValue = true;
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return returnValue;
        }

        public bool DeleteProfile(Guid profileId)
        {
            var returnValue = false;
            try
            {
                var profile = _dbContext.Profile.Where(x => x.Id == profileId).SingleOrDefault();
                if (profile != null)
                {
                    profile.StatusId = Guid.Parse(Constants.INACTIVESTATUS);
                    profile.ModifiedBy = _username;
                    profile.ModifiedDate = DateTime.Now;
                    _dbContext.Profile.Add(profile);
                    var result = _dbContext.SaveChanges();
                    if (result == 1)
                        returnValue = true;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return returnValue;
        }

        public IEnumerable<Model.Profile> FetchAllProfile()
        {
            var profile = new List<Model.Profile>();
            try
            {
                var activeStatatus = Guid.Parse(Constants.ACTIVESTATUS);
                profile = _dbContext.Profile.Where(x => x.StatusId == activeStatatus)
                    .Select(x => new Model.Profile
                    {
                        ProfileId = x.Id,
                        Firstname = x.Firstname,
                        Middlename = x.Middlename,
                        Lastname = x.Lastname,
                        Gender = x.Gender.Name
                    }).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return profile;
        }

        public Model.Profile FetchProfileById(Guid profileId)
        {
            var profile = new Model.Profile();
            try
            {
                var activeStatatus = Guid.Parse(Constants.ACTIVESTATUS);
                profile = _dbContext.Profile.Where(x => x.Id == profileId && x.StatusId == activeStatatus)
                    .Select(x => new Model.Profile
                    {
                        ProfileId = x.Id,
                        Firstname = x.Firstname,
                        Middlename = x.Middlename,
                        Lastname = x.Lastname,
                        Gender = x.Gender.Name
                    }).SingleOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return profile;
        }

        public bool UpdateProfile(Model.Profile profile)
        {
            var returnValue = false;
            try
            {
                var profil = _dbContext.Profile.Where(x => x.Id == profile.ProfileId).SingleOrDefault();
                if (profil != null)
                {
                    profil.Firstname = profile.Firstname;
                    profil.Middlename = profile.Middlename;
                    profil.Lastname = profile.Lastname;
                    profil.GenderId = profile.GenderId;
                    profil.ModifiedBy = _username;
                    profil.ModifiedDate = DateTime.Now;
                    _dbContext.Profile.Add(profil);
                    var result = _dbContext.SaveChanges();
                    if (result == 1)
                        returnValue = true;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return returnValue;
        }
    }
}
