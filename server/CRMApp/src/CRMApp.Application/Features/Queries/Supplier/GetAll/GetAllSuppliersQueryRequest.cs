using CRMApp.Application.Features.Dtos.Supplier;
using MediatR;

namespace CRMApp.Application.Features.Queries.Supplier.GetAll
{
    public record GetAllSuppliersQueryRequest
        : IRequest<List<SupplierDto>>;
}
