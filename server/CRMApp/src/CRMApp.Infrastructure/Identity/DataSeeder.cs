using CRMApp.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace CRMApp.Infrastructure.Identity
{
    public static class DataSeeder
    {
        public static async Task SeedAdminAsync(
            UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager,
            IConfiguration configuration)
        {
            // Admin rolünü oluştur
            if (!await roleManager.RoleExistsAsync("Admin"))
            {
                await roleManager.CreateAsync(new AppRole { Name = "Admin" });
            }

            // appsettings.json'dan admin bilgilerini al
            var adminConfig = configuration.GetSection("AdminUser");
            var adminUserName = adminConfig["UserName"];
            var adminName = adminConfig["Name"];
            var adminPassword = adminConfig["Password"];

            // Admin kullanıcısını oluştur
            var admin = await userManager.FindByNameAsync(adminUserName);
            if (admin == null)
            {
                admin = new AppUser
                {
                    UserName = adminUserName,
                    Name = adminName
                };

                var result = await userManager.CreateAsync(admin, adminPassword);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "Admin");
                }
            }
        }
    }
}
