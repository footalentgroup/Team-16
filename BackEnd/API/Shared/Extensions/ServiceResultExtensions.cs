using API.Shared.Utils;
using Microsoft.AspNetCore.Mvc;

namespace API.Shared.Extensions
{
    public static class ServiceResultExtensions
    {

        public static IActionResult ToActionResult<T>(this ServiceResult<T> result)
        {
            return result.StatusCode switch
            {
                null => new OkObjectResult(ApiResponse<T>.Ok(result.Data, result.Message)),
                StatusCodes.Status201Created => new CreatedResult("", ApiResponse<T>.Ok(result.Data, result.Message)),
                StatusCodes.Status400BadRequest => new BadRequestObjectResult(ApiResponse<T>.Failed(result.Message)),
                StatusCodes.Status401Unauthorized => new UnauthorizedObjectResult(ApiResponse<T>.Failed(result.Message)),
                StatusCodes.Status403Forbidden => new ForbidResult(),
                StatusCodes.Status404NotFound => new NotFoundObjectResult(ApiResponse<T>.Failed(result.Message)),
                _ => new ObjectResult(ApiResponse<T>.Failed(result.Message))
                {
                    StatusCode = result.StatusCode
                }
            };
        }
    }
}
