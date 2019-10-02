using System;
using System.Collections.Generic;

namespace SchoolManagement.DataAccess.Models
{
    public partial class ParentType
    {
        public ParentType()
        {
            Parent = new HashSet<Parent>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }

        public virtual ICollection<Parent> Parent { get; set; }
    }
}
