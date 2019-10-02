namespace SchoolManagement.Model
{
    public class File
    {
        public File()
        {
        }

        public string FileName { get; set; }
        public int FileSize { get; set; }
        public string ImagePath { get; set; }
        public int SectionId { get; set; }
        public int StudentId { get; set; }
        public string ThumbPath { get; set; }
    }
}