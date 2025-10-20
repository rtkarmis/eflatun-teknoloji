using MediatR;

namespace CRMApp.Application.Features.Commands.Customer.Create
{
    public class CreateCustomerCommandRequest : IRequest<Guid>
    {
        public string FirstName { get; init; }
        public string LastName { get; init; }
        public string Email { get; init; }
        public string PhoneNumber { get; init; }
        public string Address { get; init; }

        public CreateCustomerCommandRequest(string firstName, string lastName, string email, string phoneNumber, string address)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            PhoneNumber = phoneNumber;
            Address = address;
        }
    }
}
