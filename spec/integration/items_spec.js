const request = require("request");
const base = "http://localhost:5000/";

const sequelize = require("../../src/db/models/index").sequelize;
const server = require("../../src/server");
const Item = require("../../src/db/models").Item;

describe("routes : wikis", () => {
   beforeEach((done) => {
      this.item;

      sequelize.sync({force: true})
      .then((res) => {
         Item.create({
            content: "Knee high boots"
         })
         .then((item) => {
            this.item = item;
            done();
         })
      })
   });

   describe("User performing CRUD actions for Item", () => {
      
      describe("GET /items", () => {
         it("should respond with all items", (done) => {
            request.get(`${base}items`, (err, res, body) => {
               expect(err).toBeNull();
               expect(body).toContain("Knee high boots");
               done();
            });
         })
      });

      describe("POST /item/create", () => {
         it("should create a new item and respond with JSON", (done) => {
            const options = { 
               method: 'POST',
               url: `${base}item/create`,
               headers: 
               { 'Content-Type': 'application/json' },
               body: { content: 'Spoons' },
               json: true
            };

            request.post(options, (err, res, body) => {
               Item.findOne({where: {content: "Spoons"}})
               .then((item) => {
                  this.item = item;
                  done();
               })
               .catch((err) => {
                  console.log(err);
                  done();
               });
            });
         });
      });

      describe("GET /item/:id/edit", () => {
         it("should render JSON with an edit flair ID", (done) => {
           request.get(`${base}item/${this.item.id}/edit`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body)
            done();
           }); 
         });
      });

      describe("POST /item/:id/update", () => {
         it("should update the item with the given value", (done) => {
            const options = { 
               method: 'POST',
               url: `${base}item/${this.item.id}/update`,
               headers: 
               { 'Content-Type': 'application/json' },
               body: { content: 'Ice cream' },
               json: true
            };

            request.post(options, (err, res, body) => {
               expect(err).toBeNull();
               Item.findOne({where: {content: "Ice cream"}})
               .then((item) => {
                  expect(item).toContain("Ice cream")
                  done();
               })
               .catch((err) => {
                  console.log(err);
                  done();
               });
           }); 
         });
      });

      describe("DELETE /item/:id/", () => {
         it("should delete a item and respond with JSON", (done) => {
            Item.findAll()
            .then((item) => {
               const itemCountBeforeDelete = item.length;
               expect(itemCountBeforeDelete).toBe(1);

               request.delete(`${base}item/${this.item.id}`, (err, res, body) => {
                  Item.findAll()
                  .then((items) => {
                     expect(err).toBeNull;
                     expect(items.length).toBe(itemCountBeforeDelete - 1);
                     done();
                  })
               })
            })
         });
      })

   });


})