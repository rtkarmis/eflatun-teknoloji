using CRMApp.Application.Common.Interfaces;
using CRMApp.Application.Features.Dtos.Customer;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Queries.Customer.GetById
{
    public class GetCustomerByIdQueryHandler : IRequestHandler<GetCustomerByIdQueryRequest, CustomerDto?>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetCustomerByIdQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<CustomerDto?> Handle(GetCustomerByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var customer = await _unitOfWork.Customers.GetByIdAsync(request.CustomerId);
            if (customer == null) throw new CustomerNotFoundException(request.CustomerId);

            return new CustomerDto(
                    customer.Id,
                    customer.FirstName,
                    customer.LastName,
                    customer.Email,
                    customer.PhoneNumber,
                    customer.Address.ToString()
                );
        }
    }

}
