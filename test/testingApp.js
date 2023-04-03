const request = require("supertest")("http://localhost:8000");
const expect = require("chai").expect;
const faker = require("@faker-js/faker").faker;
const persistance = "mongo";

let id;
if (persistance == "memory") {
  id = "2";
} else if (persistance == "mongo") {
  id = "63f4c756d650814cad5bd14c";
  /*   id = "63f4c6c4d650814cad5bd14a";
  id = "63f90e64e6c28720e9917400";
  id = "63fba79c9366f4d73cc2f3c3";
 */
}

const generatePost = () => {
  return {
    title: faker.internet.userName(),
    thumbnail: faker.image.food(),
    price: faker.commerce.price(100, 100000),
  };
};

describe("test all endpoints", () => {
  describe("GET ALL", () => {
    it("deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/products");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
    });
  });
  describe("GET ONE BY ID", () => {
    it("deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/products/id/" + id);
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
    });
  });
  describe("GET ONE BY NAME", () => {
    it("deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/products/name/uvas");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("array");
    });
  });
  describe("POST ONE", () => {
    it("deberia responder con status 201 e incorporar un producto", async () => {
      const post = generatePost();
      const res = await request.post("/api/products").send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("_id", "title", "thumbnail", "price");
      expect(post.title).to.eql(res.body.title);
      expect(post.body).to.eql(res.body.body);
    });
  });
  describe("PUT", () => {
    it("deberia responder con status 201 y modificar un producto", async () => {
      const post = generatePost();
      const res = await request.put("/api/products/" + id).send(post);
      expect(res.status).to.eql(201);
      expect(res.body).to.be.a("object");
      expect(res.body).to.include.keys("_id", "title", "thumbnail", "price");
      expect(post.title).to.eql(res.body.title);
    });
  });
  describe("DELETE ONE", () => {
    it("deberia responder con status 202, eliminar un producto, y responder con el mensaje: Se eliminó con exito", async () => {
      const res = await request.delete("/api/products/" + id);
      expect(res.status).to.eql(202);
      expect(res.body).to.be.a("string");
      expect(res.body).to.eql("Se eliminó con exito");
    });
  });
});
