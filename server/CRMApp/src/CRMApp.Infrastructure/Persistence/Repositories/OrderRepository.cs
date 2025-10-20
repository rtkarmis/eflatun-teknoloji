
using CRMApp.Application.Common.Interfaces;
using CRMApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CRMApp.Infrastructure.Persistence.Repositories
{
    internal class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public IQueryable<Order> GetAllWithItems()
        {
            return Table
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .Include(o => o.Customer)
                .Include(o => o.Supplier);
        }
    }
}
