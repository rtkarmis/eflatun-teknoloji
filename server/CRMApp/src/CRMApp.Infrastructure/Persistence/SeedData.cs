using CRMApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CRMApp.Infrastructure.Persistence
{
    /// <summary>
    /// Provides methods to seed initial data into the application's database for development and testing purposes.
    /// </summary>
    public static class SeedData
    {
        public static async Task EnsureSeededAsync(IServiceProvider serviceProvider)
        {
            Console.WriteLine("SeedData: Started");
            try

            {
                using var scope = serviceProvider.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                await context.Database.MigrateAsync();

                // If all tables are completely empty, apply the seed operation only once
                if (await context.Customers.CountAsync() == 0
                    && await context.Suppliers.CountAsync() == 0
                    && await context.Products.CountAsync() == 0
                    && await context.Orders.CountAsync() == 0)
                {
                    var rand = new Random();
                    // Customers
                    var customers = new List<Customer>();
                    for (int i = 1; i <= 200; i++)
                        customers.Add(new Customer($"Müşteri {i}", $"Soyad {i}", $"mail{i}@test.com", $"555000{i:D4}", $"Adres {i}"));
                    await context.Customers.AddRangeAsync(customers);
                    await context.SaveChangesAsync();

                    // Suppliers
                    var suppliers = new List<Supplier>();
                    for (int i = 1; i <= 200; i++)
                        suppliers.Add(new Supplier($"Tedarikçi {i}", $"tedarikci{i}@test.com", $"555100{i:D4}"));
                    await context.Suppliers.AddRangeAsync(suppliers);
                    await context.SaveChangesAsync();

                    // Products
                    var products = new List<Product>();
                    var productTypes = Enum.GetValues(typeof(CRMApp.Domain.Enums.Product.ProductType));
                    for (int i = 1; i <= 200; i++)
                    {
                        var typeObj = productTypes.GetValue(rand.Next(productTypes.Length));
                        var randomType = typeObj is CRMApp.Domain.Enums.Product.ProductType t ? t : CRMApp.Domain.Enums.Product.ProductType.Device;
                        products.Add(new Product($"Ürün {i}", randomType));
                    }
                    await context.Products.AddRangeAsync(products);
                    await context.SaveChangesAsync();

                    // Reload customers, suppliers, and products from the database for orders
                    customers = await context.Customers.ToListAsync();
                    suppliers = await context.Suppliers.ToListAsync();
                    products = await context.Products.ToListAsync();

                    // Orders
                    var orders = new List<Order>();
                    // 100 supplier orders
                    for (int i = 0; i < 100; i++)
                    {
                        var supplier = suppliers[rand.Next(suppliers.Count)];
                        var order = new Order(supplier, rand.Next(1000, 5000));
                        int itemCount = rand.Next(1, 4);
                        var usedProductIndexes = new HashSet<int>();
                        for (int j = 0; j < itemCount; j++)
                        {
                            int prodIdx;
                            do { prodIdx = rand.Next(products.Count); } while (!usedProductIndexes.Add(prodIdx));
                            var product = products[prodIdx];
                            var quantity = rand.Next(1, 5);
                            order.AddOrderItem(product, quantity, CRMApp.Domain.Enums.Order.OwnerType.Supplier);
                            product.IncreaseStock(quantity);
                        }
                        orders.Add(order);
                    }
                    // 100 customer orders
                    for (int i = 0; i < 100; i++)
                    {
                        var customer = customers[rand.Next(customers.Count)];
                        int maintenanceDay = (i < 30) ? -rand.Next(1, 30) : rand.Next(1, 30); // ilk 30'u geçmiş, kalanı ileri tarihli
                        var order = new Order(customer, rand.Next(1000, 5000), maintenanceDay);
                        int itemCount = rand.Next(1, 4);
                        var usedProductIndexes = new HashSet<int>();
                        int addedItemCount = 0;
                        for (int j = 0; j < itemCount; j++)
                        {
                            int prodIdx;
                            do { prodIdx = rand.Next(products.Count); } while (!usedProductIndexes.Add(prodIdx));
                            var product = products[prodIdx];
                            var quantity = rand.Next(1, 3);
                            // Only add if enough stock
                            if (product.Stock >= quantity)
                            {
                                order.AddOrderItem(product, quantity, CRMApp.Domain.Enums.Order.OwnerType.Customer);
                                product.ReduceStock(quantity);
                                addedItemCount++;
                            }
                        }
                        // Only add the order if it has at least one item
                        if (addedItemCount > 0)
                        {
                            orders.Add(order);
                        }
                    }
                    await context.Orders.AddRangeAsync(orders);
                    await context.SaveChangesAsync();

                    // Add maintenance (for each customer order)
                    var allOrders = await context.Orders.Include(o => o.Customer).Include(o => o.OrderItems).ThenInclude(oi => oi.Product).Where(o => o.OwnerType == CRMApp.Domain.Enums.Order.OwnerType.Customer).ToListAsync();
                    foreach (var order in allOrders)
                    {
                        var customer = order.Customer;
                        var orderItems = order.OrderItems.ToList();
                        int maintenanceItemCount = Math.Min(orderItems.Count, rand.Next(1, 3));
                        var maintenanceItems = orderItems.OrderBy(x => rand.Next()).Take(maintenanceItemCount).Select(oi => Tuple.Create(oi.Product, Math.Max(1, oi.Quantity - rand.Next(0, 2)))).ToList();
                        // The following description is in English for consistency
                        order.AddMaintenance(customer, order.Price / 2, $"Maintenance description {order.OrderCode}", maintenanceItems);
                    }
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"SeedData error: {ex.Message}\n{ex.StackTrace}");
            }
        }
    }
}
