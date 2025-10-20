namespace CRMApp.Application.Common.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ICustomerRepository Customers { get; }
        ISupplierRepository Suppliers { get; }
        IProductRepository Products { get; }
        IOrderRepository Orders { get; }
        IMaintenanceRepository Maintenances { get; }

        Task<int> SaveChangesAsync();
    }
}