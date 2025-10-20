using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Commands.Customer.Update
{
    public class UpdateCustomerCommandHandler : IRequestHandler<UpdateCustomerCommandRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateCustomerCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(UpdateCustomerCommandRequest request, CancellationToken cancellationToken)
        {
            var customer = await _unitOfWork.Customers.GetByIdAsync(request.CustomerId);
            if (customer == null) throw new CustomerNotFoundException(request.CustomerId);

            customer.UpdateInfo(
                request.FirstName,
                request.LastName,
                request.Email,
                request.PhoneNumber,
                request.Address
            );

            _unitOfWork.Customers.Update(customer);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}
