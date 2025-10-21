namespace CRMApp.Shared.Exceptions
{
    public class CustomerNotFoundException : BusinessException
    {
        public CustomerNotFoundException(string customerId)
            : base($"Customer with id {customerId} not found.") { }
    }
}
