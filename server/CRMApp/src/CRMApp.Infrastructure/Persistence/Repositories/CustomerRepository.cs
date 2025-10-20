using CRMApp.Application.Common.Interfaces;
using CRMApp.Domain.Entities;
using CRMApp.Infrastructure.Persistence;
using CRMApp.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CRM.Infrastructure.Persistence.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<Customer?> GetByEmailAsync(string email)
        {
            return await Table.FirstOrDefaultAsync(c => c.Email == email);
        }
    }
}
