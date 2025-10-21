using CRMApp.Application.Features.Dtos.Customer;
using MediatR;

namespace CRMApp.Application.Features.Queries.Customer.GetById
{
    public record GetCustomerByIdQueryRequest(string CustomerId) : IRequest<CustomerDto?>;

}
