using API.DataBase.Context;
using API.DataBase.Entities;
using API.DataBase.Repository;
using API.Modules.OrdenModule.Interfaces;
using API.Shared.Utils;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.OrdenModule
{
    public class OrderExamService : BaseRepository<OrderExam>, IOrderExamService
    {
        public OrderExamService(AppDbContext database, IMapper mapper) : base(database, mapper)
        {
        }

        public async Task<ServiceResult<bool>> CreateManyAsync(int orderId, List<int> examsId)
        {
            try
            {
                if (examsId.Count == 0) return ServiceResult<bool>.SuccessResult(false);

                List<OrderExam> orderExams = new List<OrderExam>();
                foreach (var examId in examsId)
                {

                    var orderExam = new OrderExam()
                    {
                        ExamId = examId,
                        OrderId = orderId
                    };
                    orderExams.Add(orderExam);
                }

                await _dbSet.AddRangeAsync(orderExams);
                await _context.SaveChangesAsync();

                return ServiceResult<bool>.SuccessResult(true);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + ex?.InnerException);
            }
        }

        public async Task<ServiceResult<bool>> UpdateManyAsync(int orderId, List<int> examsId)
        {
            var ExamsIdDb = await _dbSet.Where(x => x.OrderId == orderId).Select(x => x.ExamId).ToListAsync();

            var examsToAdd = examsId.Where(x => !ExamsIdDb.Contains(x)).Select(x => new OrderExam()
            {
                ExamId = x,
                OrderId = orderId
            });

            await _dbSet.AddRangeAsync(examsToAdd);


            var examsToDelete = ExamsIdDb.Where(x => !examsId.Contains(x)).Select(x =>
                new OrderExam()
                {
                    ExamId = x,
                    OrderId = orderId
                });

            _dbSet.RemoveRange(examsToDelete);

            await _context.SaveChangesAsync();

            return ServiceResult<bool>.SuccessResult(true);
        }
    }

}
