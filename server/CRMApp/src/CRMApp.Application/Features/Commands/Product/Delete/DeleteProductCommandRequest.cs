using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace CRMApp.Application.Features.Commands.Product.Delete
{
    public record DeleteProductCommandRequest(string ProductId) : IRequest<bool>;
}
