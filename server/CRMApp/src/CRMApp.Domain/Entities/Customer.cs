using CRMApp.Domain.Common;
using CRMApp.Domain.Enums.Common;

namespace CRMApp.Domain.Entities
{
    public class Customer : BaseEntity, IAggregateRoot
    {
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public string Email { get; private set; }
        public string PhoneNumber { get; private set; }
        public Status Status { get; private set; }
        public string Address { get; private set; }
        private readonly List<Order> _orders = new();
        public IReadOnlyCollection<Order> Orders => _orders.AsReadOnly();
        private readonly List<Maintenance> _maintenances = new();
        public IReadOnlyCollection<Maintenance> Maintenances => _maintenances.AsReadOnly();

        private Customer() { } // EF Core için

        public Customer(string firstName, string lastName, string email, string phoneNumber, string address)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            PhoneNumber = phoneNumber;
            Address = address;
            Status = Status.Active;

        }

        // Business logic metodları
        public Order AddOrder(decimal totalPrice,int maintenanceDay, List<Tuple<Product,int>> items)
        {
            var order = new Order(this,totalPrice,maintenanceDay);
            foreach (var item in items)
            {
                order.AddOrderItem(item.Item1,item.Item2, order.OwnerType);
                item.Item1.ReduceStock(item.Item2);
            }
            _orders.Add(order);
            return order;
        }

        public void UpdateInfo(string firstName, string lastName, string email, string phoneNumber, string address)
        {
            if (!string.IsNullOrWhiteSpace(firstName)) FirstName = firstName;
            if (!string.IsNullOrWhiteSpace(lastName)) LastName = lastName;
            if (!string.IsNullOrWhiteSpace(email)) Email = email;
            if (!string.IsNullOrWhiteSpace(phoneNumber)) PhoneNumber = phoneNumber;
            if (address != null) Address = address;
        }

        public void SetActive () => Status = Status.Active;
        public void SetPassive () => Status = Status.Passive;
    }

}
