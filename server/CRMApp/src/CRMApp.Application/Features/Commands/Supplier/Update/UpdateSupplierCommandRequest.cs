using MediatR;

namespace CRMApp.Application.Features.Commands.Supplier.Update
{
    public record UpdateSupplierCommandRequest(string? SupplierId,string Name, string Email, string PhoneNumber)
        : IRequest<bool>;
}
