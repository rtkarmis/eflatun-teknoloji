namespace CRMApp.Shared.Exceptions
{
    public class OrderNotFoundException : BusinessException
    {
        public OrderNotFoundException(string orderId)
            : base($"Order with id {orderId} not found.") { }
    }
}
