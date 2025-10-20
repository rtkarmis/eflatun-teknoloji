using MediatR;

namespace CRMApp.Application.Features.Commands.Supplier.Create
{
    public record CreateSupplierCommandRequest(string Name, string ContactName, string Email, string PhoneNumber)
        : IRequest<Guid>;
}
