namespace API.Shared.Utils
{
    public class ServiceResult<T>
    {
        public bool Success { get; set; }
        public int? StatusCode { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }


        public static ServiceResult<T> SuccessResult(T data, string? message = null)
        {
            return new ServiceResult<T>
            {
                Success = true,
                StatusCode = null,
                Data = data,
                Message = message
            };
        }

        public static ServiceResult<T> SuccessResult(T data, int statusCode, string? message = null)
        {
            return new ServiceResult<T>
            {
                Success = true,
                StatusCode = statusCode,
                Data = data,
                Message = message
            };
        }

        public static ServiceResult<T> FailedResult(int statusCode, string message)
        {
            return new ServiceResult<T>
            {
                Success = false,
                StatusCode = statusCode,
                Data = default,
                Message = message
            };
        }
    }
}
