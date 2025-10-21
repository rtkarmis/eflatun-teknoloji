namespace CRMApp.Shared.Exceptions
{
    public class SupplierNotFoundException : BusinessException
    {
        public SupplierNotFoundException(string supplierId)
            : base($"Supplier with id {supplierId} not found.") { }
    }
}
