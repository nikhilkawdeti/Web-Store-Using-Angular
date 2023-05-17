import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent {
  cart: Cart = {
    items: [],
  };

  dataSource: CartItem[] = [];
  displayedColumns: String[] = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService, private https: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }
  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.https
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51N8crPSF8tAcoBNOlceAcX3IofDB5VnbLbCAlY8Bu0b3ia76AqAkQpRc6JS7Bcc0e1vlp78yc3wGBaKbKH7FSRJV00R4cd6wcU"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
