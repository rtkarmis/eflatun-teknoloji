using CRMApp.Application.Common.Interfaces;
using CRMApp.Domain.Entities;

namespace CRMApp.Infrastructure.Persistence.Repositories
{
    internal class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
    }
}
