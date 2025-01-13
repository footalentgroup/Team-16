using API.DataBase.Entities;
using API.Modules.DoctorModule.Dtos;
using API.Modules.DoctorModule.Interfaces;
using API.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Modules.DoctorModule
{
    [Route("doctor")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {
            _doctorService = doctorService;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _doctorService.GetAllAsync();

                return result.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message + ex?.InnerException);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetById([FromQuery] int id)
        {
            try
            {
                var result = await _doctorService.GetByIdAsync(id);

                return result.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message + ex?.InnerException);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateDoctorDto doctorDto)
        {
            try
            {
                var result = await _doctorService.CreateAsync(doctorDto);

                return result.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message + ex?.InnerException);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Doctor doctor)
        {
            try
            {
                var result = await _doctorService.UpdateAsync(doctor);

                return result.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message + ex?.InnerException);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromQuery] int id)
        {
            try
            {
                var result = await _doctorService.DeleteAsync(id);

                return result.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message + ex?.InnerException);
            }
        }
    }
}
