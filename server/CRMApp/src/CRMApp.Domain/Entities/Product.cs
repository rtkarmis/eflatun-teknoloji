using CRMApp.Domain.Common;
using CRMApp.Domain.Enums.Common;
using CRMApp.Domain.Enums.Product;

namespace CRMApp.Domain.Entities
{
    public class Product : BaseEntity, IAggregateRoot
    {
        public string Name { get; private set; }
        public int Stock { get; private set; }
        public ProductType ProductType { get; private set; }
        public Status Status { get; private set; }
        private Product() { } // EF Core
        public Product(string name, ProductType productType)
        {
            Name = name;
            Stock = 0;
            ProductType = productType;
            Status = Status.Active;
        }

        // Gerekli metodlar
        public void UpdateName(string name)
        {
            if (!string.IsNullOrWhiteSpace(name)) Name = name;
        }

        public void UpdateProductType(ProductType productType)
        {
            ProductType = productType;
        }

        public void ReduceStock(int quantity)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity must be positive");
            if (Stock < quantity) throw new InvalidOperationException("Not enough stock");
            Stock -= quantity;
        }

        public void IncreaseStock(int quantity)
        {
            if (quantity <= 0) throw new ArgumentException("Quantity must be positive");
            Stock += quantity;
        }
        public void SetActive() => Status = Status.Active;
        public void SetPassive() => Status = Status.Passive;
    }

}