using CRMApp.Application.Common.Interfaces;
using CRMApp.Shared.Exceptions;
using MediatR;

namespace CRMApp.Application.Features.Commands.Customer.Delete
{
    public class DeleteCustomerCommandHandler : IRequestHandler<DeleteCustomerCommandRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteCustomerCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DeleteCustomerCommandRequest request, CancellationToken cancellationToken)
        {
            var customer = await _unitOfWork.Customers.GetByIdAsync(request.CustomerId);
            if (customer == null) throw new CustomerNotFoundException(request.CustomerId);
            customer.SetPassive();
            _unitOfWork.Customers.Update(customer);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}
