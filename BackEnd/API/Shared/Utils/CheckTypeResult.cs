using API.DataBase.Entities;
using API.Modules.ResultModule.Dtos;

namespace API.Shared.Utils
{

    public static class CheckTypeResult
    {

        public static ResultResponseDto Check(Result r)
        {
            if (r is QualitativeResult qualitativeResult)
            {
                return new QualitativeResponseResultDto
                {
                    Type = r.Type,
                    ValueResult = qualitativeResult.Value,
                    DateResult = r.DateResult,
                    ExamId = r.ExamId,
                    Id = r.Id,
                    ParameterId = r.ParameterId,
                };
            }
            else if (r is QuantitativeResult QuantitativeResult)
            {
                return new QuantitativeResponseResultDto
                {
                    Type = r.Type,
                    ValueResult = QuantitativeResult.Value,
                    DateResult = r.DateResult,
                    ExamId = r.ExamId,
                    Id = r.Id,
                    ParameterId = r.ParameterId
                };
            }
            else
            {
                throw new Exception("Type in result, guardado con valor no permitido");
            }

        }
    }
}