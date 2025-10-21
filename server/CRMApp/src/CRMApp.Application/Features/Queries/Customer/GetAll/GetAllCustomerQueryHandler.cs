using MediatR;
using CRMApp.Application.Features.Dtos.Customer;
using CRMApp.Application.Common.Interfaces;

namespace CRMApp.Application.Features.Queries.Customer.GetAll
{
    public class GetAllCustomersQueryHandler : IRequestHandler<GetAllCustomersQueryRequest,List<CustomerDto>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllCustomersQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<CustomerDto>> Handle(GetAllCustomersQueryRequest request, CancellationToken cancellationToken)
        {
            var customers = _unitOfWork.Customers.GetWhere(x => x.Status == Domain.Enums.Common.Status.Active).ToList();
            return customers.Select(c => new CustomerDto(
                c.Id,
                c.FirstName,
                c.LastName,
                c.Email,
                c.PhoneNumber,
                c.Address.ToString()
            )).ToList();
        }
    }

}
