using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement.Model
{
    public class StudentProfile
    {
        public Student Student { get; set; }
        public IEnumerable<Parent> Parents { get; set; }
        public IEnumerable<Fee> Fees { get; set; }
    }
}
