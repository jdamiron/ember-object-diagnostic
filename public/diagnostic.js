/// Ember Object Diagnostic ///

// Use Ember Objects and Classes to represent a shopping cart!
// Your abstractions will be `Cart` and `Order`.
//
// An Order should have
//  -  a unit price
//  -  a quantity
//  -  a computed property called `orderPrice`, equal to price times quantity
//
// A Cart should have
//  -  an `addToCart` method, which adds a given Item to an array
//      called `orders` (HINT: You'll probably need to look through the
//      documentation for this one.)
//  -  a computed property called `totalPrice`, equal to the sum of
//      the `orderPrice` values for everything in the cart); it should be
//      recalculated any time an Order is added to the cart, removed from the
//      cart, or modified.
//
// Once you've created the necessary Ember Classes, create a new Cart instance,
//  and fill that cart up with three new product orders having the following
//  quantities, product names, and prices:
//  -  Order 1 : 2 hats ($5 each)
//  -  Order 2 : 1 desk lamp ($20 each)
//  -  Order 3 : 3 hand towels ($8 each)

const Cart = Ember.Object.extend({
  listOfOrders: [],
  addToCart : Ember.computed('orders', function() {
    let orders = Order.get('orders');
    listOfOrders.pushObject(orders);
  })
  totalPrice : Ember.computed('orders.@each.price', function(){
    let orders = this.get('orders');
    let sum = orders.map((order) => order.price).reduce((a,b) => a + b);
    if (orders.length > 0) {
      return sum;
    } else {
      return 0;
    }
  })
});

const Order = Cart.extend({
  orderPrice : Ember.computed('orders.@each.price', function(){
    let orders = this.get('orders');
    let price = orders.price * orders.quantity;
    return price;
  })
});

let newCart = Cart.create({
  orders: [
    Ember.Object.create({price: 5, name: "Hats", quantity: 2}),
    Ember.Object.create({price: 20, name: "Lamp", quantity: 1}),
    Ember.Object.create({price: 8, name: "Towels", quantity: 8}),
  ]
});
