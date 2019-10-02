using System;
using System.Collections.Generic;
using SchoolManagement.Model;

namespace SchoolManagement.Business.Interface
{
    public interface IParentBusiness
    {
        List<Guid> Register(List<Parent> parent);
    }
}