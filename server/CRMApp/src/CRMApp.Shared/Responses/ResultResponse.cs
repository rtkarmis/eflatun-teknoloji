namespace CRMApp.Shared.Responses
{
    public class ResultResponse<T>
    {
        public bool Success { get; private set; }
        public string Message { get; private set; }
        public T Data { get; private set; }
        public IEnumerable<string> Errors { get; private set; }

        // Constructor private: sadece Controller üzerinden sarılacak
        private ResultResponse(bool success, T data, string message = "", IEnumerable<string> errors = null)
        {
            Success = success;
            Data = data;
            Message = message;
            Errors = errors;
        }

        // Controller seviyesinde kullanılacak factory methodları
        public static ResultResponse<T> SuccessResponse(T data, string message = "")
            => new ResultResponse<T>(true, data, message);

        public static ResultResponse<T> FailureResponse(string message, IEnumerable<string> errors = null)
            => new ResultResponse<T>(false, default, message, errors);
    }
}
