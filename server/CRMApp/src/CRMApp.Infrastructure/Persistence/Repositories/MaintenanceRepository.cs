
using CRMApp.Application.Common.Interfaces;
using CRMApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CRMApp.Infrastructure.Persistence.Repositories
{
    internal class MaintenanceRepository : Repository<Maintenance>, IMaintenanceRepository
    {
        public MaintenanceRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public IQueryable<Maintenance> GetAllWithItems()
        {
            return Table
                .Include(m => m.MaintenanceItems)
                    .ThenInclude(mi => mi.Product)
                .Include(m => m.Customer)
                .Include(m => m.Order);
        }
    }
}
