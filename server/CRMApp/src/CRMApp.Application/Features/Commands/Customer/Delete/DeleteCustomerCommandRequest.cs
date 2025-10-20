using MediatR;

namespace CRMApp.Application.Features.Commands.Customer.Delete
{
    public record DeleteCustomerCommandRequest(string CustomerId) : IRequest<bool>;
}
