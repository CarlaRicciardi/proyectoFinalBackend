const logger = require('../../../config/logger.js');

class DaoMemoryProducts {
  constructor() {
    this.arrayMem = [];
  }

  getAll() {
    try {
      const products = this.arrayMem;
    } catch (err) {
      return [];
    }
  }

  getById(_id) {
    const prod = this.arrayMem.find((item) => item._id == _id);
    return prod;
  }

  saveNew(ob) {
    try {
      const allProducts = this.getAll();
      let _id;
      if (!allProducts || !allProducts.length) {
        _id = 1;
      } else {
        allProducts.forEach((ob) => {
          _id = ob._id;
        });
        _id = _id + 1;
      }
      const nuevo = { ...ob, _id };
      const guardar = productos.length ? [...productos, nuevo] : [nuevo];
      this.arrayMem = guardar;
      logger.log('info', 'nuevo producto guardado');
      return _id;
    } catch (error) {
      logger.log('error', 'no se pudo guardar');
    }
  }

  replace(id, title, price, thumbnail) {
    const newObj = {
      _id: id,
      title,
      price,
      thumbnail,
    };
    try {
      const objs = this.getAll();
      const quitarObj = objs.filter((item) => item._id != id);
      const newArr = [...quitarObj, newObj];
      this.arrayMem = newArr;
      return newObj;
    } catch (err) {
      logger.log('error', err);
    }
  }

  async deleteById(id) {
    try {
      const allProducts = this.getAll();
      const obj = allProducts.find((item) => item._id == id);
      if (!obj) {
        logger.log('error', 'No se encontró qué borrar');
      } else {
        const newArr = allProducts.filter((ob) => ob._id != id);
        this.arrayMem = newArr;
      }
    } catch (err) {
      logger.log('error', 'no se pudo eliminar');
    }
  }
}

module.exports = DaoMemoryProducts;
