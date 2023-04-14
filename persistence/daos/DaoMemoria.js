// class ContenedorMemoria {
//   constructor(list) {
//     this.list = list;
//   }

//   async getAll() {
//     return this.list;
//   }

//   async getById(id) {
//     try {
//       const index = this.list.findIndex((object) => object._id == id);
//       const resultado = [];
//       if (this.list[index]) {
//         resultado.push(this.list[index]);
//         return resultado;
//       } else {
//         return false;
//       }
//     } catch {
//       return false;
//     }
//   }

//   async getByName(name) {
//     try {
//       const index = this.list.findIndex(
//         (object) => object.title.toLowerCase() == name.toLowerCase()
//       );
//       const resultado = [];
//       if (this.list[index]) {
//         resultado.push(this.list[index]);
//         return resultado;
//       } else {
//         return false;
//       }
//     } catch {
//       return false;
//     }
//   }

//   async save(title, thumbnail, price) {
//     try {
//       const lista = this.list;
//       let highestid = Math.max(...lista.map((el) => el._id));
//       let id = highestid + 1;
//       let productoNuevo = {
//         _id: id,
//         title: title,
//         thumbnail: thumbnail,
//         price: price,
//       };
//       this.list.push(productoNuevo);
//       return productoNuevo;
//     } catch {
//       console.log("Se ha producido un error");
//       return "Se ha producido un error";
//     }
//   }

//   async replace(id, title, thumbnail, price) {
//     try {
//       const lista = this.list;
//       const index = lista.findIndex((object) => object._id == id);
//       if (lista[index]) {
//         const productoNuevo = {
//           _id: id,
//           title: title,
//           thumbnail: thumbnail,
//           price: price,
//         };
//         this.list[index] = productoNuevo;
//         return productoNuevo;
//       } else {
//         return "No existe el número de id elegido";
//       }
//     } catch {
//       console.log("Se ha producido un error");
//       return "Se ha producido un error";
//     }
//   }

//   async deleteById(id) {
//     try {
//       let lista = this.list;
//       const index = lista.findIndex((object) => object._id == id);
//       if (lista[index]) {
//         this.list.splice(index, 1);
//         return `Se eliminó con exito`;
//       } else {
//         return "No existe el número de id elegido";
//       }
//     } catch {
//       console.log("Se ha producido un error");
//       return "Se ha producido un error";
//     }
//   }
// }

// let instanceProduct = null;
// class ProductosDaoMemoria extends ContenedorMemoria {
//   constructor() {
//     super([
//       {
//         _id: 1,
//         title: "LimonMEMORY",
//         thumbnail:
//           "https://cdn4.iconfinder.com/data/icons/fruits-79/48/22-lime-1024.png",
//         price: 75,
//       },
//       {
//         _id: 2,
//         title: "PomeloMEMORY",
//         thumbnail:
//           "https://cdn4.iconfinder.com/data/icons/fruits-79/48/03-grapefruit-1024.png",
//         price: 190,
//       },
//       {
//         _id: 3,
//         title: "UvasMEMORY",
//         thumbnail:
//           "https://cdn4.iconfinder.com/data/icons/fruits-79/48/23-grape-1024.png",
//         price: 80,
//       },
//     ]);
//   }

//   static getInstance() {
//     if (!instanceProduct) {
//       instanceProduct = new ProductosDaoMemoria();
//     }
//     return instanceProduct;
//   }
// }

// module.exports = [ProductosDaoMemoria];
