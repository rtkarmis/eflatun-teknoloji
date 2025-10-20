using FluentValidation;
using MediatR;

namespace CRMApp.Application.Common.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
            where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<TRequest>(request);
                var failures = _validators
                    .Select(v => v.Validate(context))
                    .SelectMany(result => result.Errors)
                    .Where(f => f != null)
                    .ToList();

                if (failures.Any())
                {
                    var type = typeof(TResponse);
                    // TResponse Response<T>
                    var responseInstance = Activator.CreateInstance(type, false); // default constructor
                    type.GetProperty("Success")?.SetValue(responseInstance, false);
                    type.GetProperty("Message")?.SetValue(responseInstance, string.Join("; ", failures.Select(f => f.ErrorMessage)));
                    return (TResponse)responseInstance;
                }
            }

            return await next();
        }
    }
}
