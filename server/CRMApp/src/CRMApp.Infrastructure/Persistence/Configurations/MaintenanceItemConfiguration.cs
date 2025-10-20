using CRMApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMApp.Infrastructure.Persistence.Configurations
{
    public class MaintenanceItemConfiguration : IEntityTypeConfiguration<MaintenanceItem>
    {
        public void Configure(EntityTypeBuilder<MaintenanceItem> builder)
        {
            builder.ToTable("MaintenanceItems");

            // Composite key (MaintenanceId + ProductId) → aynı üründen bir bakımda iki kez eklenmesin
            builder.HasKey(mi => new { mi.MaintenanceId, mi.ProductId });

            builder.Property(mi => mi.Quantity)
                   .IsRequired();

            // Maintenance ilişkisi
            builder.HasOne(mi => mi.Maintenance)
                   .WithMany(m => m.MaintenanceItems)
                   .HasForeignKey(mi => mi.MaintenanceId)
                   .OnDelete(DeleteBehavior.Cascade);

            // Product ilişkisi
            builder.HasOne(oi => oi.Product)
                .WithMany() // Product tarafında OrderItems koleksiyonu yok
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}


