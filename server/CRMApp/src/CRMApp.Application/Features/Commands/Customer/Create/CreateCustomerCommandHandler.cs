using CRMApp.Application.Common.Interfaces;
using MediatR;

namespace CRMApp.Application.Features.Commands.Customer.Create
{
    public class CreateCustomerCommandHandler
            : IRequestHandler<CreateCustomerCommandRequest, Guid>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateCustomerCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateCustomerCommandRequest request, CancellationToken cancellationToken)
        {
            var customer = new Domain.Entities.Customer(request.FirstName, request.LastName, request.Email, request.PhoneNumber, request.Address);

            await _unitOfWork.Customers.AddAsync(customer);
            await _unitOfWork.SaveChangesAsync();
            return customer.Id;
        }
    }
}
