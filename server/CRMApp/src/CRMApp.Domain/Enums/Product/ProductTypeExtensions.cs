namespace CRMApp.Domain.Enums.Product
{
    public static class ProductTypeExtensions
    {
        public static string ToDisplayName(this ProductType productType)
        {
            return productType switch
            {
                ProductType.Filter => "Filtre",
                ProductType.Device => "Cihaz",
                ProductType.Equipment => "Ekipman",
                _ => productType.ToString()
            };
        }
    }
}
