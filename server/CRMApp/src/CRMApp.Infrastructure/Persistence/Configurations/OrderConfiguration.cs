using CRMApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMApp.Infrastructure.Persistence.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Orders");

            // Primary Key
            builder.HasKey(o => o.Id);

            // Properties
            builder.Property(o => o.OrderDate)
                   .IsRequired();

            builder.Property(o => o.MaintenanceDate);

            builder.Property(o => o.Price)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(o => o.OwnerType)
                   .IsRequired();

            builder.Property(o => o.OrderCode)
                   .IsRequired()
                   .HasMaxLength(9); // 9 karakter

            // Unique index
            builder.HasIndex(o => o.OrderCode)
                   .IsUnique();

            // Relationships
            builder.HasOne(o => o.Customer)
                   .WithMany(c => c.Orders)
                   .HasForeignKey(o => o.CustomerId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(o => o.Supplier)
                   .WithMany(s => s.Orders)
                   .HasForeignKey(o => o.SupplierId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(o => o.OrderItems)
                   .WithOne()
                   .HasForeignKey(oi => oi.OrderId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(o => o.Maintenances)
                   .WithOne(m => m.Order)
                   .HasForeignKey(m => m.OrderId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
