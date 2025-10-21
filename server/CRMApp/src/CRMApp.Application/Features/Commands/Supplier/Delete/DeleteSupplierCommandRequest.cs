using MediatR;

namespace CRMApp.Application.Features.Commands.Supplier.Delete
{
    public record DeleteSupplierCommandRequest(string SupplierId)
        : IRequest<bool>;
}
