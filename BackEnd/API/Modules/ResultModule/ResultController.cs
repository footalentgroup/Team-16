using API.DataBase.Entities;
using API.Modules.ResultModule.Dtos;
using API.Modules.ResultModule.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.ResultModule
{
    [Route("results")]
    [ApiController]
    public class ResultController
    {
        private readonly IResultService _resultService;

        public ResultController(IResultService resultService)
        {
            _resultService = resultService;
        }

        [HttpPost("create-many")]
        public async Task<IActionResult> Results([FromBody] List<CreateResultDto> resultsDto)
        {

            var response = await _resultService.CreataManyAsync(resultsDto);

            return new OkObjectResult(response);
        }

        [HttpPost("create-orden")]
        public async Task<IActionResult> CreateOrder(CreateReportDto createReportDto)
        {
            var response = await _resultService.CreateOrder(createReportDto);

            return new OkObjectResult(response);
        }
    }
}