using CRMApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMApp.Infrastructure.Persistence.Configurations
{
    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            // Tablo adı
            builder.ToTable("OrderItems");

            // Primary Key
            builder.HasKey(oi => oi.Id);

            // Quantity
            builder.Property(oi => oi.Quantity)
                .IsRequired();

            // Order ilişkisi
            builder.HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            // Product ilişkisi
            builder.HasOne(oi => oi.Product)
                .WithMany() // Product tarafında OrderItems koleksiyonu yok
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}


