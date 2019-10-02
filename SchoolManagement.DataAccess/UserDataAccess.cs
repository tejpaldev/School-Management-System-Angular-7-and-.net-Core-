using Microsoft.EntityFrameworkCore;
using SchoolManagement.DataAccess.Helper;
using SchoolManagement.DataAccess.Interface;
using SchoolManagement.DataAccess.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolManagement.DataAccess
{
    public class UserDataAccess : IUserDataAccess
    {
        private SchoolEntities _dbContext;
        private Guid _active = Guid.Parse(Constants.ACTIVESTATUS);
        public UserDataAccess(SchoolEntities schoolEntites)
        {
            _dbContext = schoolEntites;
        }

        public int Add(User usr)
        {
            try
            {
                _dbContext.User.Add(usr);
                var result = _dbContext.SaveChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(User user)
        {
            try
            {
                _dbContext.User.Add(user);
                _dbContext.Entry(user).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(User user)
        {
            try
            {
                _dbContext.User.Add(user);
                _dbContext.Entry(user).State = EntityState.Modified;
                return _dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public User SearchByContact(long contact)
        {
            try
            {
                var user = _dbContext.User.Where(x => x.Contact == contact && x.StatusId == _active).SingleOrDefault();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public User SearchByEmail(string email)
        {
            try
            {
                var user = _dbContext.User.Where(x => x.Email == email && x.StatusId == _active).SingleOrDefault();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public User SearchByUsername(string username)
        {
            try
            {
                var user = _dbContext.User.Where(x => x.Username == username && x.StatusId == _active).SingleOrDefault();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public User SearchByUserId(Guid userId)
        {
            try
            {
                var user = _dbContext.User.Where(x => x.Id == userId && x.StatusId == _active).SingleOrDefault();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<User> SearchByUsernameAsync(string username)
        {
            try
            {
                var user = await _dbContext.User.Where(x => x.Username == username && x.StatusId == _active).SingleOrDefaultAsync();
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
