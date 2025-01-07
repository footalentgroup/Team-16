using API.DataBase.Context;
using API.DataBase.Entities;
using API.Modules.PatientModule.Dtos;
using API.Modules.PatientModule.Interfaces;
using API.Shared.Extensions;
using API.Shared.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Modules.PatientModule
{
    [ApiController]
    [Route("patient")]
    public class PatientController
    {
        private readonly IPatientService _patientService;
        private readonly AppDbContext _context;

        public PatientController(IPatientService patientService, AppDbContext context)
        {
            _patientService = patientService;
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var patientResponse = await _patientService.FindById(id);

                return patientResponse.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message + ":::" + ex.InnerException);
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string? fullname, [FromQuery] string? personalId)
        {

            if (fullname == null && personalId == null)
            {
                return new BadRequestObjectResult(ApiResponse<Patient>.Failed("Por lo menos uno de los parametros que espera no debe ser nulo"));
            }

            try
            {
                var patientResponse = await _patientService.Search(fullname, personalId);

                return patientResponse.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.Message + ":::" + ex.InnerException);
            }
        }


        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {

            var response = await _context.Patients.ToListAsync();

            return new OkObjectResult(response);
        }

        /// <summary>
        // endpoint para crear paciente.
        // en el 
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Create(PatientCreateDto patient)
        {
            try
            {
                var patienResponse = await _patientService.CreatePatient(patient);

                return new OkObjectResult(
                            ApiResponse<PatientCredentialsDto>.Ok(
                               new PatientCredentialsDto()
                               {
                                   Password = patienResponse.Data.Password,
                                   PersonalID = patienResponse.Data.PersonalID
                               }));
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.InnerException + ":::" + ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PatientUpdateDto patientDto)
        {
            try
            {
                ServiceResult<PatientUpdateDto> response = await _patientService.UpdatePatient(patientDto);

                return response.ToActionResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult(ex.InnerException + ":::" + ex.Message);
            }
        }



    }
}