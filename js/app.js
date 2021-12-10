
class Store {
    constructor() {
        this.itemsInCart = {
            itemCount: 0,
            subTotal: 0
        }

        this.storeItems = {
            item1: {
                id: 1,
                img: '../media/items/clutch.png',
                alt: 'clutch',
                class: 'latest-img',
                price: 1.07,
                qty: 0,
                name: 'clutch',
            },

            item2: {
                id: 2,
                img: '../media/items/gloves.png',
                alt: 'gloves',
                class: 'latest-img',
                price: 7.25,
                qty: 0,
                name: 'gloves',
            },

            item3: {
                id: 3,
                img: '../media/items/ring.png',
                alt: 'ring',
                class: 'latest-img',
                price: 13.69,
                qty: 0,
                name: 'ring',
            },

            item4: {
                id: 4,
                img: '../media/items/trenchcoat.png',
                alt: 'trenchcoat',
                class: 'latest-img',
                price: 13.69,
                qty: 0,
                name: 'trenchcoat',
            },
            
            item5: {
                id: 5,
                img: '../media/items/trenchcoat2.png',
                alt: 'trenchcoat2',
                class: 'latest-img',
                price: 13.69,
                qty: 0,
                name: 'trenchcoat2',
            },

            item6: {
                id: 6,
                img: '../media/items/shoes.png',
                alt: 'Shoes',
                class: 'latest-img',
                price: 6.96,
                qty: 0,
                name: 'Shoes',
            }
            
        }

        this.shopNow = {
            sNow1: {
                id: 1,
                img: '../media/items/free-shipping.png',
                class: 'shop-now',
                name: 'Free Shipping'
            },

            sNow2: {
                id: 2,
                img: '../media/items/sale.png',
                class: 'shop-now',
                name: 'Low Prices'
            },

            sNow3: {
                id: 3,
                img: '../media/items/new-arrivals.png',
                class: 'shop-now',
                name: 'New Deals Daily'
            }
        }

    }

    init(){
        this.loadStore();
        this.addToCart();
        this.checkout();
    }

    loadStore() {
        //load Store on to the page 
        let count = 0;

        //acess HTML nodes
        let ShopItems = document.getElementById('shopItems')

        for (const key in this.storeItems) {
            const item = this.storeItems[key];
            const product = document.createElement('div');
            product.className = 'col-md-4 ';
            product.innerHTML = `
            <img src="${item.img}" alt="${item.alt}" class=" img-fluid ${item.class}">
            <p>${item.name},</p>
            <p>$${item.price}</p>
            <button class="btn btn-secondary add-button" data-id="${item.id}">Add to Cart</button>`;
            ShopItems.append(product)
            count++;
        }

        let sNow = document.getElementById('shopNow');

        for (const key in this.shopNow) {
            const item = this.shopNow[key];
            const shopN = document.createElement('div');
            shopN.className = 'col-md-4';
            shopN.innerHTML = `
            <img src="${item.img}" alt="${item.alt}" class="product-img img-fluid ${item.class}">
            <p>${item.name},</p>
            <p>$${item.price}</p>
            <button class="btn btn-secondary">Shop Now</button>`;
            sNow.append(shopN);
            count++;
        }

    }

    addToCart() {
        // set variables
        let buttons = document.querySelectorAll('.add-button');
        let cartItems = document.getElementById('cartItems');
        let cartSubTotal = document.getElementById('cartItemsSubTotal');
        let itemCount = 0;
        let price = 0;

        for (const key in this.storeItems) {
            const item = this.storeItems[key];
            buttons.forEach(button => {
                button.addEventListener('click', ()=> {
                    if (button.dataset['id'] == item.id) {
                        itemCount++;
                        price = price + item.price;
                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subTotal = price;

                        item.qty++;
                        console.log(item);
                        console.log(this.itemsInCart);
                    }

                    cartItems.innerText = itemCount;
                    cartSubTotal.innerText = price.toFixed(2);
                })
            })
        }
    }

    checkout() {
        // set variables
        let table = document.getElementById('tbody');
        let checkout = document.getElementById('checkout');
        let checkoutPage = document.querySelector('.checkout-page');
        let homePage = document.querySelector('.home-page');
        let subTimesQty = 0;
        let subtotalValue = document.getElementById('subtotalValue');
        let taxValue = document.getElementById('taxValue');
        let totalValue = document.getElementById('totalValue');
        let tax = 0;
        let shippingValue = document.getElementById('shippingValue');
        let checkoutItemCount = document.getElementById('checkoutItemCount');
        let shipping = 6;

        checkout.addEventListener('click', ()=> {

            if (homePage.classList.contains('d-none')) return;
            // remove d-none from checkout and add d-none to homePage
            checkoutPage.classList.remove('d-none');
            homePage.classList.add('d-none');

            if (this.itemsInCart.itemCount == 1) {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`;
            } else {
                
            }

            checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`;

            for (const key in this.storeItems) {
                const item = this.storeItems[key];

                subTimesQty = (item.qty * item.price).toFixed(2);
                subtotalValue.innerText = this.itemsInCart.subTotal.toFixed(2);
                shippingValue.innerText = shipping.toFixed(2);
                tax = this.itemsInCart.subTotal * .07;
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsInCart.subTotal + tax + shipping).toFixed(2);

                if (item.qty > 0) {

                    const tableRow = document.createElement('tr');
                    tableRow.className = 'product-checkout';

                    tableRow.innerHTML += `
                        <td id="checkoutImg">
                            <img src="${item.img}" alt="${item.alt}" class="product-img img-fluid ${item.class}">
                            <div class="product-desc">
                                <p class="item-name">${item.name}</p>
                            </div>
                        </td>
                        <td>
                            <p class="unit-price">${item.price.toFixed(2)}</p>
                        </td>
                        <td>
                            <div id="itemQuantity">
                                <p id="qtyInput">${item.qty}</p>
                            </div>
                        </td>
                        <td id="itemSubtotal">${subTimesQty}</td>
                    `
                    table.append(tableRow);
                }
            }
        })
    }

    


}

let action = new Store();

action.init();