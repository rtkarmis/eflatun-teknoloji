using System.Linq.Expressions;
using System.Security.Claims;
using CRMApp.Domain.Common;
using CRMApp.Domain.Entities;
using CRMApp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CRMApp.Infrastructure.Persistence;

public class AppDbContext : IdentityDbContext<AppUser,AppRole,string>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    public AppDbContext(DbContextOptions<AppDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Tüm entity configlerini uygula
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var username = _httpContextAccessor.HttpContext?.User?.Identity?.Name ?? "Anonymous";
        var datas = ChangeTracker.Entries<BaseEntity>();
        foreach (var data in datas)
        {
            // Sadece BaseEntity'den türeyenler için setleme yap
            if (data.Entity.GetType().BaseType == typeof(BaseEntity) || data.Entity.GetType() == typeof(BaseEntity))
            {
                switch (data.State)
                {
                    case EntityState.Modified:
                        data.Entity.SetUpdatedBy(username);
                        break;
                    case EntityState.Added:
                        data.Entity.SetCreatedBy(username);
                        break;
                    default:
                        break;
                }
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}
