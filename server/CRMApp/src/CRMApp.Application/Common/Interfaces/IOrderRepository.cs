using CRMApp.Domain.Entities;

namespace CRMApp.Application.Common.Interfaces
{
    public interface IOrderRepository : IRepository<Order>
    {
        IQueryable<Order> GetAllWithItems();
    }
}
