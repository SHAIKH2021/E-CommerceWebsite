using API.Data;
using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController:BaseApiController
    {
         private readonly StoreContext _context;
         public BasketController(StoreContext context)
         {
            _context=context;
         }

         [HttpGet(Name = "GetBasket")]
         public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDto(basket);
        }

        [HttpPost]
         public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId,int quantity)
         {
            //get basket or create new basket
            var basket=await RetriveBasket();
            if(basket==null) basket = CreateBasket();
            // get product to match basket product
            var product = await _context.Products.FindAsync(productId);
            if(product==null) return NotFound();
            //add item to basket
            basket.AddItem(product,quantity);
            //save Changes
            var result = await _context.SaveChangesAsync()>0;
            if(result) return CreatedAtRoute("GetBasket",MapBasketToDto(basket));
            return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
         }

        [HttpDelete]
         public async Task<ActionResult> RemoveBasketItem(int productId,int quantity)
         {
            //get basket or check if basket is exist
            var basketremove =await RetriveBasket();
            if(basketremove==null) return NotFound();
            //remove item or reduce quantity
            basketremove.RemoveItem(productId,quantity);
            //save changes
            var result= await _context.SaveChangesAsync()>0;
            if(result) return Ok();
            return BadRequest(new ProblemDetails{Title="Problem removing item from basket"});
         }

         private async Task<Basket> RetriveBasket()
         {
            return await _context.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerID"]);
         }

         private Basket CreateBasket()
         {
            var buyerId =Guid.NewGuid().ToString();
            var cookieOptions=new CookieOptions{IsEssential =true, Expires=DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId",buyerId,cookieOptions);
            var basket= new Basket{BuyerId=buyerId};
            _context.Baskets.Add(basket);
            return basket;
         }
         private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}