using CRMApp.Domain.Common;
using CRMApp.Domain.Enums.Order;

namespace CRMApp.Domain.Entities
{
    public class Order : BaseEntity, IAggregateRoot
    {
        public Guid? CustomerId { get; private set; }
        public Customer Customer { get; private set; }
        public Guid? SupplierId { get; private set; }
        public Supplier Supplier { get; private set; }
        public DateTime OrderDate { get; private set; }
        public DateTime? MaintenanceDate { get; private set; }
        public OwnerType OwnerType { get; private set; }
        public decimal Price { get; private set; }
        public string OrderCode { get; private set; }
        private readonly List<Maintenance> _maintenances = new();
        public IReadOnlyCollection<Maintenance> Maintenances => _maintenances.AsReadOnly();
        private readonly List<OrderItem> _orderItems = new();
        public IReadOnlyCollection<OrderItem> OrderItems => _orderItems.AsReadOnly();

        private Order() { } //EF Core İçin
        public Order(Customer customer,decimal price,int maintenanceDay)
        {
            Customer = customer ?? throw new ArgumentNullException(nameof(customer));
            CustomerId = customer.Id;
            OrderDate = DateTime.UtcNow;
            MaintenanceDate = (DateTime.UtcNow).AddDays(maintenanceDay);
            OwnerType = OwnerType.Customer;
            Price = price;
            OrderCode = GenerateOrderCode();
        }

        public Order(Supplier supplier, decimal price)
        {
            Supplier = supplier;
            SupplierId = supplier.Id;
            OrderDate = DateTime.UtcNow;
            OwnerType = OwnerType.Supplier;
            Price = price;
            OrderCode = GenerateOrderCode();
        }

        // Gerekli metodlar
        public void AddOrderItem(Product product, int quantity,OwnerType ownerType)
        {
            if (product == null) throw new ArgumentNullException(nameof(product));
            if (quantity <= 0) throw new ArgumentException("Miktar 0 veya negatif olamaz.");
            if (ownerType == OwnerType.Customer && product.Stock < quantity) throw new InvalidOperationException($"Ürün '{product.Name}' stokta yetersiz. Mevcut: {product.Stock}");

            var orderItem = new OrderItem(product, quantity);
            _orderItems.Add(orderItem);
        }

        public Maintenance AddMaintenance(Customer customer,decimal totalPrice, string description, List<Tuple<Product, int>> items)
        {
            var maintenance = new Maintenance(this,customer, totalPrice, description);
            foreach (var item in items)
            {
                maintenance.AddMaintenanceItem(item.Item1, item.Item2);
                item.Item1.ReduceStock(item.Item2);
            }
            _maintenances.Add(maintenance);
            return maintenance;
        }

        public void SetMaintenanceDate(int maintenanceDay)
        {
            MaintenanceDate = ((DateTime)MaintenanceDate).AddDays(maintenanceDay);
        }
        private static string GenerateOrderCode()
        {
            return $"{Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper()}"; // Örn: "A1B2C3D4"
        }
    }

}