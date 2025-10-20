using CRMApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CRMApp.Infrastructure.Persistence.Configurations
{
    public class MaintenanceConfiguration : IEntityTypeConfiguration<Maintenance>
    {
        public void Configure(EntityTypeBuilder<Maintenance> builder)
        {
            builder.ToTable("Maintenances");

            builder.HasKey(m => m.Id);

            builder.Property(m => m.Price)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(m => m.Description)
                   .HasMaxLength(500);

            builder.Property(m => m.MaintenanceDate)
                   .IsRequired();

            // Order ile ilişki
            builder.HasOne(m => m.Order)
                   .WithMany(o => o.Maintenances) // Order entity'ine ICollection<Maintenance> eklemen lazım
                   .HasForeignKey(m => m.OrderId)
                   .OnDelete(DeleteBehavior.Restrict)
                   .IsRequired();

            // Customer ile ilişki
            builder.HasOne(m => m.Customer)
                   .WithMany(c => c.Maintenances) // Customer entity'ine ICollection<Maintenance> eklemen lazım
                   .HasForeignKey(m => m.CustomerId)
                   .OnDelete(DeleteBehavior.Restrict)
                    .IsRequired();

            // MaintenanceItems ile ilişki
            builder.HasMany(m => m.MaintenanceItems)
                   .WithOne(mi => mi.Maintenance)
                   .HasForeignKey(mi => mi.MaintenanceId)
                   .OnDelete(DeleteBehavior.Cascade);

            // CreatedDate & UpdatedDate global convention’dan gelecek (BaseEntity için yazdığımız kural)
        }
    }
}
