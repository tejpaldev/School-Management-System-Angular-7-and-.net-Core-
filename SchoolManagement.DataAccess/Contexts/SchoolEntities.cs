using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SchoolManagement.DataAccess.Models
{
    public partial class SchoolEntities : DbContext
    {
        public SchoolEntities()
        {
        }

        public SchoolEntities(DbContextOptions<SchoolEntities> options)
            : base(options)
        {
        }

        public virtual DbSet<BloodGroup> BloodGroup { get; set; }
        public virtual DbSet<BusRoute> BusRoute { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Class> Class { get; set; }
        public virtual DbSet<ClassFee> ClassFee { get; set; }
        public virtual DbSet<ClassSection> ClassSection { get; set; }
        public virtual DbSet<ClassStream> ClassStream { get; set; }
        public virtual DbSet<Fee> Fee { get; set; }
        public virtual DbSet<FeePeriod> FeePeriod { get; set; }
        public virtual DbSet<FeeType> FeeType { get; set; }
        public virtual DbSet<Gender> Gender { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<Parent> Parent { get; set; }
        public virtual DbSet<ParentType> ParentType { get; set; }
        public virtual DbSet<PaymentMode> PaymentMode { get; set; }
        public virtual DbSet<Permission> Permission { get; set; }
        public virtual DbSet<Profile> Profile { get; set; }
        public virtual DbSet<Religion> Religion { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<RolePermission> RolePermission { get; set; }
        public virtual DbSet<Section> Section { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<Stream> Stream { get; set; }
        public virtual DbSet<Student> Student { get; set; }
        public virtual DbSet<StudentFeeDiscount> StudentFeeDiscount { get; set; }
        public virtual DbSet<StudentType> StudentType { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseLazyLoadingProxies();
                optionsBuilder.UseSqlServer("Server=.;Database=aisdb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BloodGroup>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<BusRoute>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Location)
                    .WithMany(p => p.BusRoute)
                    .HasForeignKey(d => d.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BusRoute_Location");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.BusRoute)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_BusRoute_Status");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Class>(entity =>
            {
                entity.HasIndex(e => e.Code)
                    .HasName("Code")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(4);

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Class)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Class_Status");
            });

            modelBuilder.Entity<ClassFee>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.ClassFee)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassFee_Class");

                entity.HasOne(d => d.FeeType)
                    .WithMany(p => p.ClassFee)
                    .HasForeignKey(d => d.FeeTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassFee_FeeType");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.ClassFee)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassFee_Status");
            });

            modelBuilder.Entity<ClassSection>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.ClassSection)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassSection_Class");

                entity.HasOne(d => d.Section)
                    .WithMany(p => p.ClassSection)
                    .HasForeignKey(d => d.SectionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassSection_Section");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.ClassSection)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassSection_Status");
            });

            modelBuilder.Entity<ClassStream>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.ClassStream)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassStream_Class");

                entity.HasOne(d => d.Section)
                    .WithMany(p => p.ClassStream)
                    .HasForeignKey(d => d.SectionId)
                    .HasConstraintName("FK_ClassStream_Section");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.ClassStream)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassStream_Status");

                entity.HasOne(d => d.Stream)
                    .WithMany(p => p.ClassStream)
                    .HasForeignKey(d => d.StreamId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassStream_Stream");
            });

            modelBuilder.Entity<Fee>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Comment).HasMaxLength(100);

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.TransactionNo).HasMaxLength(50);

                entity.HasOne(d => d.FeeType)
                    .WithMany(p => p.Fee)
                    .HasForeignKey(d => d.FeeTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Fee_FeeType");

                entity.HasOne(d => d.PaymentMode)
                    .WithMany(p => p.Fee)
                    .HasForeignKey(d => d.PaymentModeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Fee_PaymentMode");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.Fee)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Fee_Student");
            });

            modelBuilder.Entity<FeePeriod>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<FeeType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.FeePeriod)
                    .WithMany(p => p.FeeType)
                    .HasForeignKey(d => d.FeePeriodId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FeeType_FeePeriod");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.FeeType)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_FeeType_Status");
            });

            modelBuilder.Entity<Gender>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Location)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Location_Status");
            });

            modelBuilder.Entity<Parent>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Occupation)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.ParentType)
                    .WithMany(p => p.Parent)
                    .HasForeignKey(d => d.ParentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Parent_ParentType");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Parent)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Parent_Status");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.Parent)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Parent_Student");
            });

            modelBuilder.Entity<ParentType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PaymentMode>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Profile>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Middlename)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.HasOne(d => d.Gender)
                    .WithMany(p => p.Profile)
                    .HasForeignKey(d => d.GenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Profile_Gender");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Profile)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Profile_Status");
            });

            modelBuilder.Entity<Religion>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Role)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Role_Status");
            });

            modelBuilder.Entity<RolePermission>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Section)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Section_Status");
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Stream>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Stream)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Stream_Status");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.AdmissionNo)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Cast)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Lastname)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Middlename).HasMaxLength(50);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Nationality)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.PreviousSchoolClass).HasMaxLength(50);

                entity.Property(e => e.PreviousSchoolName).HasMaxLength(50);

                entity.Property(e => e.Reference).HasMaxLength(20);

                entity.Property(e => e.RegistrationNo)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.BloodGroup)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.BloodGroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Student_BloodGroup");

                entity.HasOne(d => d.BusRoute)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.BusRouteId)
                    .HasConstraintName("FK_Student_BusRoute");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Student_Category");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Student_Class");

                entity.HasOne(d => d.Gender)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.GenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Student_Gender");

                entity.HasOne(d => d.Religion)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.ReligionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Student_Religion");

                entity.HasOne(d => d.Section)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.SectionId)
                    .HasConstraintName("FK_Student_Section");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Student_Status");

                entity.HasOne(d => d.Stream)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.StreamId)
                    .HasConstraintName("FK_Student_Stream");

                entity.HasOne(d => d.StudentType)
                    .WithMany(p => p.Student)
                    .HasForeignKey(d => d.StudentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Student_StudentType");
            });

            modelBuilder.Entity<StudentFeeDiscount>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.FeeType)
                    .WithMany(p => p.StudentFeeDiscount)
                    .HasForeignKey(d => d.FeeTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentFeeDiscount_FeeType");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.StudentFeeDiscount)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentFeeDiscount_Status");

                entity.HasOne(d => d.StudentType)
                    .WithMany(p => p.StudentFeeDiscount)
                    .HasForeignKey(d => d.StudentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentFeeDiscount_StudentType");
            });

            modelBuilder.Entity<StudentType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedBy)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.StudentType)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentType_Status");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedBy)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.ModifiedBy).HasMaxLength(10);

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.HasOne(d => d.Profile)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.ProfileId)
                    .HasConstraintName("FK_User_Profile");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Role");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.StatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Status");
            });
        }
    }
}
