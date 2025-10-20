using CRMApp.Application.Common.Interfaces;

namespace CRMApp.Infrastructure.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public ICustomerRepository Customers { get; }
        public ISupplierRepository Suppliers { get; }
        public IProductRepository Products { get; }
        public IOrderRepository Orders { get; }
        public IMaintenanceRepository Maintenances { get; }

        public UnitOfWork(
            AppDbContext context,
            ICustomerRepository customerRepository,
            ISupplierRepository supplierRepository,
            IProductRepository productRepository,
            IOrderRepository orderRepository,
            IMaintenanceRepository maintenanceRepository
        )
        {
            _context = context;
            Customers = customerRepository;
            Suppliers = supplierRepository;
            Products = productRepository;
            Orders = orderRepository;
            Maintenances = maintenanceRepository;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}