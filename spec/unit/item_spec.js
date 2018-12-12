const sequelize = require("../../src/db/models/index").sequelize;
const Item = require("../../src/db/models").Item;

describe("Item", () => {

   beforeEach((done) => {
      this.item;
      sequelize.sync({force: true})
      .then(() => {
         done();
      })
      .catch((err) => {
         console.log(err);
         done();
      });
   });

   describe("#create()", () => {
      it("should create an item", (done) => {
         Item.create({
            content: 'Milk'
         })
         .then((item) => {
            expect(item.content).toBe("Milk");
            done();
         })
         .catch((err) => {
            console.log(err);
         });
      });
   });

});