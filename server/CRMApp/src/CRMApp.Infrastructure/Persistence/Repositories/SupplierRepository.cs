using CRMApp.Application.Common.Interfaces;
using CRMApp.Domain.Entities;

namespace CRMApp.Infrastructure.Persistence.Repositories
{
    internal class SupplierRepository : Repository<Supplier>, ISupplierRepository
    {
        public SupplierRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
    }
}
