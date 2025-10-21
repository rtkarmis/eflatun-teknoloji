using CRMApp.Application.Features.Dtos.Customer;
using MediatR;

namespace CRMApp.Application.Features.Queries.Customer.GetAll
{
    public record GetAllCustomersQueryRequest() : IRequest<List<CustomerDto>>;
}
