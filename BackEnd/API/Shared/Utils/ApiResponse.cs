namespace API.Shared.Utils
{
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public object? Data { get; set; }
        public string? Message { get; set; }

        public static ApiResponse<T> Ok(object data, string? message = null)
        {
            return new ApiResponse<T>()
            {
                Success = true,
                Data = data,
                Message = message,
            };
        }

        public static ApiResponse<T> Failed(string? message)
        {
            return new ApiResponse<T>()
            {
                Success = false,
                Data = default,
                Message = message,
            };
        }
    }
}

