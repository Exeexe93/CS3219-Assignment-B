const mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
const { expect } = require('chai');

// Configure chai to use chaiHttp
chai.use(chaiHttp);
chai.should();

describe("Testing the api:", () => {
    var contacts = {};
    describe("From http:///localhost:8080/api/contacts:", () => {
        // Test to add one contact
        it("Should add one contact record", () => {
            chai.request(app)
                .post('/api/contacts')
                .send({
                    'name': 'Eng Xuan En',
                    'email': 'testing@gmail.com',
                    'phone': '99845012',
                    'gender': 'Male',
                })
                .then(function (res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                })
                .catch(function (err) {
                    throw err;
                })
        })


        // Test to get all contacts
        it("should get all contacts record", (done) => {
            chai.request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    if (err) {
                        throw error;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    contacts = res.body.data;
                    done();
                });
        });
    });



    describe("From http://localhost/api/contacts/{id}:", () => {

        // Test to get a single contact
        it("Should get single contact", (done) => {
            // Take the first contact in the list
            const id = contacts[0]._id;
            chai.request(app)
                .get(`/api/contacts/${id}`)
                .end((err, res) => {
                    if (err) {
                        throw error;
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(contacts[0]).to.deep.equal(res.body.data);
                    done();
                })
        });

        // Test to edit a single contact
        it("Should edit single contact", () => {
            // Take the first contact in the list
            const id = contacts[0]._id;
            chai.request(app)
                .put(`/api/contacts/${id}`)
                .send({
                    'name': 'Jane Tan',
                    'email': 'emailchange@gmail.com',
                    'phone': '99845012',
                    'gender': 'Female',
                })
                .then(function (res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data._id.should.equal(id);
                    res.body.data.name.should.equal('Jane Tan');
                    res.body.data.email.should.equal('emailchange@gmail.com');
                    res.body.data.phone.should.equal('99845012');
                    res.body.data.gender.should.equal('Female');
                })
                .catch(function (err) {
                    throw err;
                })
        });

        // Test to remove a single contact
        it("Should delete the single contact", (done) => {
            // Take the first contact in the list
            const id = contacts[0]._id;
            chai.request(app)
                .delete(`/api/contacts/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    chai.request(app)
                        .get('/api/contacts')
                        .end((err, res) => {
                            if (err) {
                                throw error;
                            }
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            for (contact in res.body.data) {
                                expect(res.body.data[contact]._id).to.not.equal(id);
                            }
                        })
                    done();
                });
        });
    });
});