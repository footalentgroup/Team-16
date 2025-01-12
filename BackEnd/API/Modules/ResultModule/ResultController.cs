using API.Modules.ResultModule.Dtos;
using API.Modules.ResultModule.Interfaces;
using API.Shared.Extensions;
using API.Shared.Utils;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.ResultModule
{
    [Route("results")]
    [ApiController]
    public class ResultController
    {
        private readonly IResultService _resultService;
        private readonly IReportService _reportService;

        public ResultController(IResultService resultService, IReportService reportService)
        {
            _resultService = resultService;
            _reportService = reportService;
        }

        [HttpGet("orders/get-by-patient-id")]
        public async Task<IActionResult> CreateOrder([FromQuery] int id)
        {
            try
            {
                var response = await _reportService.GetManyByPatientIdAsync(id);


                return response.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ApiResponse<object>.Failed(ex.Message + ex?.InnerException));
            }
        }

        [HttpPost("orders/create")]
        public async Task<IActionResult> CreateOrder(CreateReportDto createReportDto)
        {
            var response = await _resultService.CreateOrder(createReportDto);

            return new OkObjectResult(response);
        }



        [HttpPost("create-many")]
        public async Task<IActionResult> Results([FromBody] List<CreateResultDto> resultsDto)
        {

            var response = await _resultService.CreataManyAsync(resultsDto);

            return new OkObjectResult(response);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateResultDto resultDto)
        {

            var response = await _resultService.UpdateResultDto(resultDto);

            return response.ToActionResult();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            try
            {
                var response = await _resultService.DeleteResult(id);

                return response.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex);
            }
        }
    }
}