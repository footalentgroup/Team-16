using API.Modules.ExamModule.Dtos;
using API.Modules.ExamModule.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.ExamModule
{
    [Route("exam")]
    [ApiController]
    public class ExamsController : ControllerBase
    {
        private readonly IExamService _examService;

        public ExamsController(IExamService examService)
        {
            _examService = examService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExamDto>> GetExamById(int id)
        {
            var exam = await _examService.GetExamByIdAsync(id);
            if (exam == null)
            {
                return NotFound();
            }
            return Ok(exam);
        }
    }
}
