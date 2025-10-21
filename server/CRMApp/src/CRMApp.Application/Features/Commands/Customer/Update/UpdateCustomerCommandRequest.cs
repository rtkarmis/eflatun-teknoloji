using MediatR;

namespace CRMApp.Application.Features.Commands.Customer.Update
{
    public record UpdateCustomerCommandRequest(
        string? CustomerId,
        string FirstName,
        string LastName,
        string Email,
        string PhoneNumber,
        string Address
    ) : IRequest<bool>;
}
