import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  categories:string[]=[];
  products:any[]=[];
  originalProducts: any[] = []; 
  cartItems:any=[];
  cartCount:number=0;

  selectedValue:string='all';
  ngOnInit(){
    this.LoadCategories();
    this.LoadProducts();
  }
  changeCategory(){
    this.filtredProduct(this.selectedValue);
  }

  filtredProduct(category:any){
    if (category === 'all') {
      this.products = [...this.originalProducts]; // Reset to original products
    } else {
      this.products = this.originalProducts.filter((item) => item.category === category);
    }
    }
  LoadCategories(){
    fetch('https://fakestoreapi.com/products/categories')
            .then((res:any)=>res.json())
            .then((json:any)=>{
              this.categories=json;
              console.log(this.categories)
            })
  }
  LoadProducts(){
    fetch('https://fakestoreapi.com/products')
            .then((res:any)=>res.json())
            .then((json:any)=>{
              this.products=json;
              this.originalProducts = json;
              console.log(this.products)
            })
  }
  addToCart(cart:any){
    const item = this.cartItems.find((cartItem:any) => cartItem.id == cart.id);
    if(item){
      item.qty += 1;
    }
    else{
      this.cartItems.push({ ...cart, qty: 1 });
    this.cartCount=this.cartItems.length;
    }
  }
  deleteProduct(product:any){
    const index = this.cartItems.findIndex((p:any) => p.id === product.id); 
  if (index !== -1) {
    this.cartItems.splice(index, 1);
    this.cartCount=this.cartItems.length;
 
  }
  }
  increaseQty(id:any){
    const item = this.cartItems.find((cartItem:any) => cartItem.id == id);
    if (item) {
      item.qty += 1;
    }
  }
  decreaseQty(id:any){
    
    const item = this.cartItems.find((cartItem:any) => cartItem.id == id);
    if(item.qty<=0){
      const index = this.cartItems.findIndex((p:any) => p.id === id); 
      this.cartItems.splice(index, 1);
      this.cartCount=this.cartItems.length;
    }
    if (item) {
      item.qty -= 1;
    }
  }

}
