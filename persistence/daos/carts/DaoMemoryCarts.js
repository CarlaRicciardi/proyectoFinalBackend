const logger = require('../../../config/logger.js');

class DaoMemoryCart {
  constructor() {
    this.arrayMem = [];
  }

  saveNew() {
    try {
      const allCarts = this.getAll();
      let _id;
      if (!allCarts || !allCarts.length) {
        _id = 1;
      } else {
        allCarts.forEach((ob) => {
          _id = ob._id;
        });
        _id = _id + 1;
      }
      const newCart = {
        productsCart: [],
        _id: _id,
      };
      const save = allCarts.length ? allCarts.push(newCart) : [newCart];
      this.arrayMem = save;
      logger.log('info', `guardado  ${newCart._id}`);
      return _id;
    } catch (error) {
      logger.log('error', 'no se pudo guardar');
    }
  }

  getAll() {
    try {
      const allCarts = this.arrayMem;

      if (!allCarts.length) {
        return [];
      } else {
        const res = allCarts;
        return res;
      }
    } catch (err) {
      logger.log('error', 'no se pudo obtener');
    }
  }

  getById(_id) {
    const all = this.getAll();
    const find = all.find((ob) => ob._id == _id);
    if (find) {
      return find;
    } else {
      logger.log('error', 'no encontrado');
    }
  }

  deleteById(id) {
    try {
      const objs = this.getAll();
      const obj = objs.find((item) => item._id == id);
      if (!obj) {
        logger.log('error', 'No se encontró qué borrar');
      } else {
        const newArr = objs.filter((ob) => ob._id != id);
        this.arrayMem = newArr;
        return 'eliminado';
      }
    } catch (err) {
      logger.log('error', 'no se pudo eliminar');
    }
  }

  getProductList(id) {
    const cart = this.findById(id);
    if (cart) {
      const products = cart.productsCart;
      return products;
    } else {
      return false;
    }
  }

  AddProdToCart(objProd, id) {
    try {
      const cart = this.findById(id);
      const arrProd = cart.productsCart;
      arrProd.push(objProd);
      cart.productsCart = arrProd;
      const carts = this.getAll();
      const quitarObj = carts.filter((item) => item._id != id);
      const newArr = [...quitarObj, cart];
      this.arrayMem = newArr;
      return cart;
    } catch (error) {
      logger.log('error', error);
    }
  }

  findProdInCart(idCart, idProd) {
    const cart = this.findById(idCart);
    const products = cart.productsCart;
    const product = products.find((item) => item._id == idProd);
    return product;
  }

  addRepeatedProd(idProd, cantAntes, cantSum, idCart) {
    const newCant = cantAntes + cantSum;
    const cart = this.findById(idCart);
    const arrProds = cart.productsCart;
    arrProds.find((element) => element._id == idProd).quantity = newCant;
    cart.productsCart = arrProds;
    const allCarts = this.getAll();
    const deleteCart = allCarts.filter((item) => item._id != idCart);
    const newArrCarts = [...deleteCart, cart];
    logger.log('info', `addRepeatedProd newArrCarritos ${newArrCarts}`);
    this.arrayMem = newArrCarts;
  }

  deleteProd(id, idprod) {
    const cart = this.findById(id);
    const arrayProds = cart.productsCart;
    const deleteProd = arrayProds.filter((item) => item._id != idprod);
    cart.productsCart = deleteProd;
    const allCarts = this.getAll();
    const deleteCart = allCarts.filter((item) => item._id != id);
    const newArrCarts = [...deleteCart, cart];
    this.arrayMem = newArrCarts;
  }
}

module.exports = DaoMemoryCart;
