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

        public async Task<ExamDto> GetExamByIdAsync(int id)
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
                            Reference = qualitativeParam.Reference,
                        };
                    }
                    else if (p is QuantitativeParameter quantitativeParam)
                    {
                        return new QuantitativeParameterDto
                        {
                            Id = quantitativeParam.Id,
                            Name = quantitativeParam.Name,
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
    }
}
