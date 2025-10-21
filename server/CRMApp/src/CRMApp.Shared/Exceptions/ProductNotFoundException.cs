namespace CRMApp.Shared.Exceptions
{
    public class ProductNotFoundException : BusinessException
    {
        public ProductNotFoundException(string productId)
            : base($"Product with id {productId} not found.") { }
    }
}
