using API.DataBase.Context;
using API.DataBase.Entities;
using API.DataBase.Repository;
using API.Modules.OrdenModule.Dtos;
using API.Modules.OrdenModule.Interfaces;
using API.Shared.Utils;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.OrdenModule
{
    public class OrderService : BaseRepository<Order>, IOrderService
    {
        private readonly IMapper _mapper;
        private readonly IOrderExamService _orderExamService;
        public OrderService(AppDbContext context, IMapper mapper, IOrderExamService orderExamService) : base(context, mapper)
        {
            _mapper = mapper;
            _orderExamService = orderExamService;
        }

        public async Task<ServiceResult<Order>> CreateOrder(CreateReportDto createReportDto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {

                var report = _mapper.Map<Order>(createReportDto);

                var result = await _context.Orders.AddAsync(report);
                await _context.SaveChangesAsync();


                await _orderExamService.CreateManyAsync(result.Entity.Id, createReportDto?.ExamIds ?? new List<int>());

                await transaction.CommitAsync();
                return ServiceResult<Order>.SuccessResult(result.Entity);
            }
            catch (Exception ex)
            {

                await transaction.RollbackAsync();
                return ServiceResult<Order>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);

            }
        }

        public async Task<ServiceResult<List<ReportResponseWithResultsDto>>> GetManyByPatientIdAsync(int patientId)
        {

            var result = await _context
                                    .Orders
                                    .Where(x => x.PatientId == patientId)
                                    .Include(x => x.Doctor)
                                    .Include(x => x.OrderExams)
                                    .ThenInclude(x => x.Exam)
                                    .Include(x => x.Results)
                                    .ThenInclude(r => r.Parameter)
                                    .ToListAsync();

            var response = result.Select(x =>
            {

                IEnumerable<ExamResponseDto> listExams = x.OrderExams.Select(
                    x => new ExamResponseDto { Id = x.Exam.Id, Name = x.Exam.Name });

                return new ReportResponseWithResultsDto()
                {
                    DateExam = x.DateExam,
                    Doctor = x.Doctor,
                    Id = x.Id,
                    Patient = x.Patient,
                    Status = x.Status,
                    ExamIds = listExams.ToList(),
                    Priority = x.Priority,
                    Observations = x.Observations,
                    Results = x.Results.Select(x =>
                    {
                        var param = x.Parameter;
                        var examName = listExams
                                            .FirstOrDefault(exam => exam.Id == x.Parameter.ExamId);

                        return CheckTypeResult.Check(x, param, examName?.Name ?? "");
                    }).ToList()
                };
            }).ToList();

            if (result == null)
            {
                return ServiceResult<List<ReportResponseWithResultsDto>>.FailedResult(StatusCodes.Status500InternalServerError, "Lista de roportes no encontrada");
            }

            return ServiceResult<List<ReportResponseWithResultsDto>>.SuccessResult(response);
        }


        public async Task<ServiceResult<List<ReportResponseDto>>> GetAll(string? status)
        {
            try
            {
                IQueryable<Order> query = _context.Orders;


                if (!string.IsNullOrEmpty(status))
                {
                    query = query.Where(x => x.Status == status);
                }

                var response = await query.Select(x => new
                {
                    x.DateExam,
                    x.Doctor,
                    x.Id,
                    Observations = x.Observations ?? "",
                    x.Patient,
                    Priority = x.Priority ?? "",
                    Status = x.Status ?? "",
                }).ToListAsync();



                var responseDto = response.Select(x => new ReportResponseDto()
                {
                    DateExam = x.DateExam,
                    Doctor = x.Doctor,
                    Id = x.Id,
                    Observations = x.Observations,
                    Patient = x.Patient,
                    Priority = x.Priority,
                    Status = x.Status,
                }).ToList();

                return ServiceResult<List<ReportResponseDto>>.SuccessResult(responseDto);

            }
            catch (Exception ex)
            {
                return ServiceResult<List<ReportResponseDto>>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);

            }
        }
        public async Task<ServiceResult<ReportResponseWithResultsDto>> GetOrderById(int reportId)
        {
            try
            {
                var result = await _context
                               .Orders
                               .Where(x => x.Id == reportId)
                               .Include(x => x.Doctor)
                               .Include(x => x.OrderExams)
                               .ThenInclude(x => x.Exam)
                               .Include(x => x.Results)
                               .ThenInclude(r => r.Parameter)
                               .ThenInclude(r => r.Exam)
                               .FirstOrDefaultAsync();

                if (result == null)
                {
                    return ServiceResult<ReportResponseWithResultsDto>.FailedResult(StatusCodes.Status404NotFound, " roporte no encontrada");
                }


                IEnumerable<ExamResponseDto> listExams = result.OrderExams.Select(
                    x => new ExamResponseDto { Id = x.Exam.Id, Name = x.Exam.Name });

                ReportResponseWithResultsDto response = new ReportResponseWithResultsDto()
                {
                    DateExam = result.DateExam,
                    Doctor = result.Doctor,
                    Id = result.Id,
                    Patient = result.Patient,
                    Status = result.Status,
                    ExamIds = listExams.ToList(),
                    Priority = result.Priority,
                    Observations = result.Observations,
                    Results = result.Results.Select(x =>
                    {
                        var param = x.Parameter;

                        var exam = listExams
                                            .FirstOrDefault(exam => exam.Id == x.Parameter.ExamId);
                        return CheckTypeResult.Check(x, param, exam?.Name ?? "");
                    }).ToList()
                };


                return ServiceResult<ReportResponseWithResultsDto>.SuccessResult(response);

            }
            catch (Exception ex)
            {
                return ServiceResult<ReportResponseWithResultsDto>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);

            }
        }

        public async Task<ServiceResult<object>> UpdateOrder(UpdateReportDto updateDto)
        {
            try
            {
                var report = await GetById(updateDto.Id);

                if (report == null)
                {
                    return ServiceResult<object>.FailedResult(StatusCodes.Status404NotFound, "Orden No encontrado");
                }

                if (updateDto.ExamIds != null)
                {
                    await _orderExamService.UpdateManyAsync(updateDto.Id, updateDto.ExamIds);
                }

                var updatedReport = new Order()
                {
                    Id = report.Id,
                    Priority = updateDto?.Priority ?? report.Priority,
                    Observations = updateDto?.Observations ?? report.Observations,
                    Status = updateDto?.Status ?? report.Status,
                    PatientId = updateDto?.PatientId ?? report.PatientId,
                    DateExam = updateDto?.DateExam ?? report.DateExam,
                    DoctorId = updateDto?.DoctorId ?? report.DoctorId,
                };


                _context.Entry(report).CurrentValues.SetValues(updatedReport);
                await _context.SaveChangesAsync();

                return ServiceResult<object>.SuccessResult(updatedReport);
            }
            catch (Exception ex)
            {
                return ServiceResult<object>.FailedResult(StatusCodes.Status500InternalServerError, ex.Message + ex?.InnerException);

            }
        }


    }
}
