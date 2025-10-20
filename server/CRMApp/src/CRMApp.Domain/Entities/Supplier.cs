using CRMApp.Domain.Common;
using CRMApp.Domain.Enums.Common;

namespace CRMApp.Domain.Entities
{
    public class Supplier : BaseEntity, IAggregateRoot
    {
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string PhoneNumber { get; private set; }
        public Status Status { get; private set; }
        private readonly List<Order> _orders = new();
        public IReadOnlyCollection<Order> Orders => _orders.AsReadOnly();

        private Supplier() { }
        public Supplier(string name, string email, string phoneNumber)
        {
            Name = name;
            Email = email;
            PhoneNumber = phoneNumber;
            Status = Status.Active;
        }
        public Order AddOrder(decimal totalPrice, List<Tuple<Product, int>> items)
        {
            var order = new Order(this, totalPrice);
            foreach (var item in items)
            {
                order.AddOrderItem(item.Item1, item.Item2,order.OwnerType);
                item.Item1.IncreaseStock(item.Item2);
            }
            _orders.Add(order);
            return order;
        }

        public void Update(string name,string email,string phoneNumber)
        {
            if (!string.IsNullOrWhiteSpace(name)) Name = name;
            if (!string.IsNullOrWhiteSpace(email)) Email = email;
            if (!string.IsNullOrWhiteSpace(phoneNumber)) PhoneNumber = phoneNumber;
        }
        public void SetActive() => Status = Status.Active;
        public void SetPassive() => Status = Status.Passive;
    }

}
