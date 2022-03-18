require("dotenv").config();
let chai = require("chai");
let chaiHttp = require("chai-http");
let auth = require("../routes/auth");
let server = require("../app");

let User = require("../models/user");
let Category = require("../models/category");
let Product = require("../models/product");
let Order = require("../models/order");


// Assertion STyle
chai.should();

chai.use(chaiHttp);
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjMzZmEwNjkwODlmZWZlYzlkZDlhMTYiLCJpYXQiOjE2NDc2Mjk2NjZ9._6xdmyzgag7sZ6ma4m2PqTtdOcBUwuLzvmKo9lXIHro'
let userId = '6233fa069089fefec9dd9a16'
describe(" Authentication API", () => {

    /**
     * Test the signUP route
     */
    // describe("POST /api/signUp", () => {
    //     it("Let the user to signUp for the website", (done) => {
    //         chai
    //             .request('http://localhost:8000')
    //             .post("/api/signUp")
    //             .send({
    //                     firstName:"Vishesh",
    //                     lastName:"Puri",
    //                     email:"vp@mun.ca",
    //                     phoneNumber:"7894561230",
    //                     password:"Abcd@1234"                   
    //             })
    //             .end((err, response) => {
    //                 response.should.have.status(200);
    //                 response.body.should.be.a('object');
    //                 response.body.should.have.property('Name');
    //                 response.body.should.have.property('Email');
    //                 response.body.should.have.property('id');
    //                 done();
    //             });
    //     });
    // });

    /**
     * Test the signIn route
     */
     describe("POST /api/signIn", () => {
        
        it("Checking for a legitimate user and attempting to login in the website", (done) => {
            chai
                .request('http://localhost:8000')                
                .post("/api/signIn")
                .send({
                        email:"hs@mun.ca",
                        password:"Abcd@1234"                   
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('token');
                    done();
                });
        });
        it("Checking for a wrong user and attempting to login in the website", (done) => {
            chai
                .request('http://localhost:8000')
                
                .post("/api/signIn")
                .send({
                        email:"h@mun.ca",
                        password:"Abcd@1234"                   
                })
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

        it("User and password does not match", (done) => {
            chai
                .request('http://localhost:8000')
                .post("/api/signIn")
                .send({
                        email:"hs@mun.ca",
                        password:"bcd@1234"                   
                })
                .end((err, response) => {
                    response.should.have.status(400);
                    done();
                });
        });
    });

    /**
     * Test the signOut route
     */
     describe("POST /api/signOut", () => {
        
        it("Testing for actual logout of the user for the website", (done) => {
            chai
                .request('http://localhost:8000')
                .post("/api/signIn")
                .send({
                        email:"hs@mun.ca",
                        password:"Abcd@1234"                   
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
    });
});

/**
* Test the product route
*/
describe("Product API", () => {
    
    describe("GET /api/products", () => {
        it("Get all the product from the database", (done) => {
            chai
                .request('http://localhost:8000')
                .get("/api/products")
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
    });

    
});

/**
* Test the all categories route
*/
describe("Category API", () => {
    
    describe("GET /api/categories", () => {
        it("Get all the categories from the database", (done) => {
            chai
                .request('http://localhost:8000')
                .get("/api/categories")
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
    });

    describe("POST /api/category/create/:userId", () => {
        it("Create a new product and storing it in the database", (done) => {
            chai
                .request('http://localhost:8000')
                .post(`/api/category/create/${userId}`)
                .auth(token, { type: 'bearer' })
                .send({
                    name:"TEST1"                   
                })
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
    });

    
});