using SchoolManagement.DataAccess.Models;
using System;
using System.Threading.Tasks;

namespace SchoolManagement.DataAccess.Interface
{
    public interface IUserDataAccess
    {
        int Add(User usr);
        int Update(User user);
        int Delete(User user);
        User SearchByUsername(string username);
        Task<User> SearchByUsernameAsync(string username);
        User SearchByEmail(string email);
        User SearchByContact(long contact);
        User SearchByUserId(Guid userId);
    }
}
