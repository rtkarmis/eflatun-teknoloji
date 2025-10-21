using CRMApp.Domain.Entities;

namespace CRMApp.Application.Common.Interfaces
{
    public interface IMaintenanceRepository : IRepository<Maintenance>
    {
        IQueryable<Maintenance> GetAllWithItems();
    }
}
