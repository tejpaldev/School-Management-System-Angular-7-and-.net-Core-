using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement.Model
{
    public class Profile
    {
        public Guid ProfileId { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public string Lastname { get; set; }
        public string Gender { get; set; }
        public Guid GenderId { get; set; }
        public Guid? PhotoId { get; set; }
        public string Photo { get; set; }
    }
}
