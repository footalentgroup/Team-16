using API.DataBase.Context;
using API.DataBase.Entities;
using API.Modules.ExamModule.Dtos;
using API.Modules.ExamModule.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.ExamModule
{
    public class ExamService : IExamService
    {
        private readonly AppDbContext _context;

        public ExamService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ExamSummaryDto>> GetAllExamsAsync()
        {
            var exams = await _context.Exams.ToListAsync();

            var examIndex = exams.Select(e => new ExamSummaryDto
            {
                Id = e.Id,
                Name = e.Name,
                Sample = e.Sample,
                Description = e.Description,
            }).ToList();

            return examIndex;
        }

        public async Task<ExamDto?> GetExamByIdAsync(int id)
        {
            var exam = await _context.Exams
                .Include(e => e.Parameters)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (exam == null)
            {
                throw new KeyNotFoundException("Examen no encontrado");
            }

            var examDto = new ExamDto
            {
                Id = exam.Id,
                Name = exam.Name,
                Sample = exam.Sample,
                Description = exam.Description,
                Parameters = exam.Parameters.Select<ParameterBase, ParameterDto>(p =>
                {
                    if (p is QualitativeParameter qualitativeParam)
                    {
                        return new QualitativeParameterDto
                        {
                            Id = qualitativeParam.Id,
                            Name = qualitativeParam.Name,
                            Type = qualitativeParam.Type,
                            Reference = qualitativeParam.Reference,
                        };
                    }
                    else if (p is QuantitativeParameter quantitativeParam)
                    {
                        return new QuantitativeParameterDto
                        {
                            Id = quantitativeParam.Id,
                            Name = quantitativeParam.Name,
                            Type = quantitativeParam.Type,
                            MinValue = quantitativeParam.MinValue,
                            MaxValue = quantitativeParam.MaxValue,
                            Unit = quantitativeParam.Unit,
                            Gender = quantitativeParam.Gender,
                        };
                    }
                    else
                    {
                        throw new InvalidOperationException("Error de tipo de parámetro");
                    }
                }).ToList()
            };

            return examDto;
        }

        public async Task<ExamDto> CreateExamAsync(CreateExamDto createExamDto)
        {
            var exam = new Exam
            {
                Name = createExamDto.Name,
                Sample = createExamDto.Sample,
                Description = createExamDto.Description,
                Parameters = new List<ParameterBase>(),
            };

            foreach (var parameterDto in createExamDto.Parameters)
                if (parameterDto is QualitativeParameterDto qualitativeParam)
                {
                    exam.Parameters.Add(new QualitativeParameter
                    {
                        Name = qualitativeParam.Name,
                        Type = "qualitative",
                        Reference = qualitativeParam.Reference,
                        ExamId = 0,
                        Exam = exam,
                    });
                }
                else if (parameterDto is QuantitativeParameterDto quantitativeParam)
                {
                    exam.Parameters.Add(new QuantitativeParameter
                    {
                        Name = quantitativeParam.Name,
                        Type = "quantitative",
                        MinValue = quantitativeParam.MinValue,
                        MaxValue = quantitativeParam.MaxValue,
                        Unit = quantitativeParam.Unit,
                        Gender = quantitativeParam.Gender,
                        ExamId = 0,
                        Exam = exam,
                    });
                }
                else
                {
                    throw new InvalidOperationException("Error de tipo de parámetro");
                }

            await _context.Exams.AddAsync(exam);
            await _context.SaveChangesAsync();

            foreach (var parameter in exam.Parameters)
            {
                parameter.ExamId = exam.Id;
            }

            return new ExamDto
            {
                Id = exam.Id,
                Name = exam.Name,
                Sample = exam.Sample,
                Description = exam.Description,
                Parameters = exam.Parameters.Select<ParameterBase, ParameterDto>(p =>
                {
                    if (p is QualitativeParameter qualitativeParam)
                    {
                        return new QualitativeParameterDto
                        {
                            Id = qualitativeParam.Id,
                            Name = qualitativeParam.Name,
                            Type = qualitativeParam.Type,
                            Reference = qualitativeParam.Reference,
                        };
                    }
                    else if (p is QuantitativeParameter quantitativeParam)
                    {
                        return new QuantitativeParameterDto
                        {
                            Id = quantitativeParam.Id,
                            Name = quantitativeParam.Name,
                            Type = quantitativeParam.Type,
                            MinValue = quantitativeParam.MinValue,
                            MaxValue = quantitativeParam.MaxValue,
                            Unit = quantitativeParam.Unit,
                            Gender = quantitativeParam.Gender,
                        };
                    }
                    else
                    {
                        throw new InvalidOperationException("Error de tipo de parámetro");
                    }
                }).ToList()
            };
        }
    }
}
