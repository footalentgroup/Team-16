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
        public async Task<List<Result>> Results(List<CreateResultDto> resultsDto)
        {

            return await _resultService.CreataManyAsync(resultsDto);
        }
    }
}