using CRM.Infrastructure.Persistence.Repositories;
using CRMApp.Application.Common.Interfaces;
using CRMApp.Application.Identity.Services.Auth;
using CRMApp.Application.Identity.Services.Token;
using CRMApp.Application.Identity.Services.User;
using CRMApp.Domain.Entities.Identity;
using CRMApp.Infrastructure.Identity.Services;
using CRMApp.Infrastructure.Persistence;
using CRMApp.Infrastructure.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CRMApp.Infrastructure;

public static class ServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // DbContext
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                sqlServerOptions =>
                {
                    sqlServerOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,                           // en fazla 5 kez dene
                        maxRetryDelay: TimeSpan.FromSeconds(10),    // denemeler arası max 10 sn bekle
                        errorNumbersToAdd: null                     // özel hata kodları eklemek istersen
                    );
                }));
        services.AddIdentity<AppUser, AppRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

        // UnitOfWork ve Repository
        services.AddScoped<ICustomerRepository, CustomerRepository>();
        services.AddScoped<ISupplierRepository, SupplierRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IMaintenanceRepository, MaintenanceRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IAuthService,AuthService>();
        services.AddScoped<IUserService,UserService>();
        services.AddScoped<ITokenService,TokenService>();

        return services;
    }
}