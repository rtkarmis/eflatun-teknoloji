using FluentValidation;

namespace CRMApp.Application.Features.Commands.Customer.Create
{
    public class CreateCustomerCommandValidator : AbstractValidator<CreateCustomerCommandRequest>
    {
        public CreateCustomerCommandValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(50);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(50);
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.PhoneNumber).NotEmpty().MaximumLength(20);
            RuleFor(x => x.Address).NotNull();
        }
    }
}
