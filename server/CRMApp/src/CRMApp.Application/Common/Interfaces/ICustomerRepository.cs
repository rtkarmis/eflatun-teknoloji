using CRMApp.Domain.Entities;

namespace CRMApp.Application.Common.Interfaces
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        Task<Customer?> GetByEmailAsync(string email);
    }
}
