using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRMApp.Domain.Common;

namespace CRMApp.Domain.Entities
{
    public class Maintenance:BaseEntity
    {

        public Guid OrderId { get; private set; }
        public Order Order { get; private set; }
        public Guid CustomerId { get; private set; }
        public Customer Customer { get; private set; }
        public DateTime MaintenanceDate { get; private set; }
        public decimal Price { get; private set; }
        public string Description { get; private set; }

        private readonly List<MaintenanceItem> _maintenanceItems = new();
        public IReadOnlyCollection<MaintenanceItem> MaintenanceItems => _maintenanceItems.AsReadOnly();

        private Maintenance() { }

        public Maintenance(Order order,Customer customer,decimal price,string description)
        {
            Order = order;
            OrderId = order.Id;
            Customer = customer;
            CustomerId = customer.Id;
            MaintenanceDate = DateTime.UtcNow;
            Price = price;
            Description = description;
        }

        public void AddMaintenanceItem(Product product, int quantity)
        {
            if (product == null) throw new ArgumentNullException(nameof(product));
            if (quantity <= 0) throw new ArgumentException("Miktar 0 veya negatif olamaz.");
            if (product.Stock < quantity) throw new InvalidOperationException($"Ürün '{product.Name}' stokta yetersiz. Mevcut: {product.Stock}");

            var maintenanceItem = new MaintenanceItem(product, quantity);
            _maintenanceItems.Add(maintenanceItem);
        }
    }
}
