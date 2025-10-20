using CRMApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMApp.Infrastructure.Persistence.Configurations
{
    public class SupplierConfiguration : IEntityTypeConfiguration<Supplier>
    {
        public void Configure(EntityTypeBuilder<Supplier> builder)
        {
            // Tablo adı
            builder.ToTable("Suppliers");
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name).IsRequired().HasMaxLength(100);
            builder.Property(c => c.Email).IsRequired().HasMaxLength(200);
            builder.Property(c => c.PhoneNumber).IsRequired().HasMaxLength(11);

            builder.HasMany(c => c.Orders)
                   .WithOne(o => o.Supplier)
                   .HasForeignKey(o => o.SupplierId)
                   .OnDelete(DeleteBehavior.Restrict); // Sipariş silinmemesi için
        }
    }
}
