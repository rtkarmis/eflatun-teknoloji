using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRMApp.Application.Features.Dtos.Customer
{
    public record CustomerDto(Guid CustomerId,string FirstName, string LastName, string Email, string PhoneNumber, string Address);
}
