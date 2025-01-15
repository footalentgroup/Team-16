using API.DataBase.Entities;
using API.Modules.ResultModule.Dtos;

namespace API.Shared.Utils
{

    public static class CheckTypeResult
    {

        public static ResultResponseDto Check(Result r, ParameterBase parameter)
        {
            if (r is QualitativeResult qualitativeResult)
            {
                return new QualitativeResponseResultDto
                {
                    Type = r.Type,
                    ValueResult = qualitativeResult.Value,
                    DateResult = r.DateResult,
                    Id = r.Id,
                    Parameter = parameter?.Name,
                    Reference = parameter is QualitativeParameter qp ? qp?.Reference : throw new Exception("por el momento acepta parametros qualitativos")
                };
            }
            else if (r is QuantitativeResult QuantitativeResult)
            {
                return new QuantitativeResponseResultDto
                {
                    Type = r.Type,
                    ValueResult = QuantitativeResult.Value,
                    DateResult = r.DateResult,
                    Id = r.Id,
                    Parameter = parameter?.Name,
                    Reference = parameter is QualitativeParameter qp ? qp?.Reference : throw new Exception("por el momento acepta parametros qualitativos")
                };
            }
            else
            {
                throw new Exception("Type in result, guardado con valor no permitido");
            }

        }
    }
}