namespace API.DataBase.Entities
{
    public class OrderExam
    {

        public int ExamId { get; set; }

        public Exam Exam { get; set; }

        public int OrderId { get; set; }

        public Order Order { get; set; }
    }
}
