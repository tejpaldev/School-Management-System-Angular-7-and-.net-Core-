using SchoolManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement.Business.Interface
{
    public interface IUserBusiness
    {
        User Authenticate(string username, string password);
        bool Add(User user);
        bool ForgetPassword(string email);
        User Search(User user);
        bool Delete(Guid userId);
        bool Update(User user);
    }
}
