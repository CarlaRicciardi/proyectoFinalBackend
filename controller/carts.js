const cart = [];

const addProductsToCart = () => {
    const { _id } = req.user;
    cart.push(_id)
}
addProductsToCart()
console.log(cart)

