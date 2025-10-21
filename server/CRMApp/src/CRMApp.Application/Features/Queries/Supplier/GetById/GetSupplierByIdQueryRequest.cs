using CRMApp.Application.Features.Dtos.Supplier;
using MediatR;

namespace CRMApp.Application.Features.Queries.Supplier.GetById
{
    public record GetSupplierByIdQueryRequest(string SupplierId)
        : IRequest<SupplierDto?>;
}
