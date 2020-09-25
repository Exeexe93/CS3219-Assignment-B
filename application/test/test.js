const mocha = require("mocha");
var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../index");
const { expect } = require("chai");

// Configure chai to use chaiHttp
chai.use(chaiHttp);
chai.should();

describe("Testing the api:", () => {
  var contacts = {};
  describe("From http:///localhost:8080/api/contacts:", () => {
    it("Should not add contact record when email input is missing", (done) => {
      chai
        .request(app)
        .post("/api/contacts")
        .send({
          name: "Eng Xuan En",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("email");
          res.body.errors.email.should.have.property("kind").eql("required");
          done();
        });
    }).timeout(5000);

    it("Should not add contact record when name input is missing", (done) => {
      chai
        .request(app)
        .post("/api/contacts")
        .send({
          email: "testing@gmail.com",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("name");
          res.body.errors.name.should.have.property("kind").eql("required");
          done();
        });
    }).timeout(5000);

    it("Should add contact record even when no phone input", (done) => {
      chai
        .request(app)
        .post("/api/contacts")
        .send({
          name: "Eng Xuan En",
          email: "testing@gmail.com",
          gender: "Male",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("New contact created!");
          res.body.data.should.have.property("name").eql("Eng Xuan En");
          res.body.data.should.have.property("email").eql("testing@gmail.com");
          res.body.data.should.have.property("gender").eql("Male");
          done();
        });
    }).timeout(5000);

    it("Should add contact record even when no phone input", (done) => {
      chai
        .request(app)
        .post("/api/contacts")
        .send({
          name: "Eng Xuan En",
          email: "testing@gmail.com",
          phone: "99845012",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("New contact created!");
          res.body.data.should.have.property("name").eql("Eng Xuan En");
          res.body.data.should.have.property("email").eql("testing@gmail.com");
          res.body.data.should.have.property("phone").eql("99845012");
          done();
        });
    }).timeout(5000);

    // Should add one contact
    it("Should add one contact record", (done) => {
      chai
        .request(app)
        .post("/api/contacts")
        .send({
          name: "Eng Xuan En",
          email: "testing@gmail.com",
          phone: "99845012",
          gender: "Male",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("New contact created!");
          res.body.data.should.have.property("name").eql("Eng Xuan En");
          res.body.data.should.have.property("email").eql("testing@gmail.com");
          res.body.data.should.have.property("phone").eql("99845012");
          res.body.data.should.have.property("gender").eql("Male");
          done();
        });
    }).timeout(5000);

    // Test to get all contacts
    it("should get all contacts record", (done) => {
      chai
        .request(app)
        .get("/api/contacts")
        .end((err, res) => {
          if (err) {
            throw error;
          }
          res.should.have.status(200);
          res.body.should.be.a("object");
          contacts = res.body.data;
          done();
        });
    }).timeout(5000);
  });

  describe("From http://localhost/api/contacts/{id}:", () => {
    it("Should received error when invalid contact id given", (done) => {
      const id = 1;
      chai
        .request(app)
        .get(`/api/contacts/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql("Error");
          res.body.should.have
            .property("message")
            .eql("No such record with the contact id found!");
          done();
        });
    });

    // Test to get a single contact
    it("Should get single contact", (done) => {
      // Take the first contact in the list
      const id = contacts[0]._id;
      chai
        .request(app)
        .get(`/api/contacts/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          expect(contacts[0]).to.deep.equal(res.body.data);
          done();
        });
    });

    // Test to edit a single contact
    it("Should edit single contact", (done) => {
      // Take the first contact in the list
      const id = contacts[0]._id;
      chai
        .request(app)
        .put(`/api/contacts/${id}`)
        .send({
          name: "Jane Tan",
          email: "emailchange@gmail.com",
          phone: "99845012",
          gender: "Female",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.data._id.should.equal(id);
          res.body.data.name.should.equal("Jane Tan");
          res.body.data.email.should.equal("emailchange@gmail.com");
          res.body.data.phone.should.equal("99845012");
          res.body.data.gender.should.equal("Female");
          done();
        });
      // .then(function (res) {
      //   res.should.have.status(200);
      //   res.body.should.be.a("object");
      //   res.body.data._id.should.equal(id);
      //   res.body.data.name.should.equal("Jane Tan");
      //   res.body.data.email.should.equal("emailchange@gmail.com");
      //   res.body.data.phone.should.equal("99845012");
      //   res.body.data.gender.should.equal("Female");
      // })
      // .catch(function (err) {
      //   throw err;
      // });
    });

    // Test to remove a single contact
    it("Should delete the single contact", (done) => {
      // Take the first contact in the list
      const id = contacts[0]._id;
      chai
        .request(app)
        .delete(`/api/contacts/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.message.should.equal("Contact deleted");
          done();
        });
    }).timeout(5000);
  });
});
