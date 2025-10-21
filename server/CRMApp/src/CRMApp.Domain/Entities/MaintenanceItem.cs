using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRMApp.Domain.Common;

namespace CRMApp.Domain.Entities
{
    public class MaintenanceItem:BaseEntity
    {
        public Guid MaintenanceId { get; private set; }
        public Maintenance Maintenance { get; private set; }
        public Guid ProductId { get; private set; }
        public Product Product { get; private set; }
        public int Quantity { get; private set; }

        private MaintenanceItem() { } // EF Core
        public MaintenanceItem(Product product, int quantity)
        {
            Product = product;
            ProductId = product.Id;
            Quantity = quantity;
        }
    }
}
