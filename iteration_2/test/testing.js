let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
var expect = chai.expect;

const {
    beforeEach
} = require("mocha");

// Assertion STyle
chai.should();

chai.use(chaiHttp);
let token,categoryId;
let userId = "6233fa069089fefec9dd9a16";

describe("UNIT TESTING WITH MOCHA AND CHAI", () => {
    describe("1. Authentication API", () => {
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
                    .request(server)
                    .post("/api/signIn")
                    .send({
                        email: "hs@mun.ca",
                        password: "Abcd@1234",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.be.a("object");
                        response.body.should.have.property("token");
                        token = response.body.token;
                        response.body.user.should.have.property("_id");
                        response.body.user.should.have.property("firstName");
                        response.body.user.should.have.property("email");
                        response.body.user.should.have.property("role");
                        done();
                    });
            });
            it("Checking for a wrong user and attempting to login in the website", (done) => {
                chai
                    .request(server)

                    .post("/api/signIn")
                    .send({
                        email: "h@mun.ca",
                        password: "Abcd@1234",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        done();
                    });
            });

            it("User and password does not match", (done) => {
                chai
                    .request(server)
                    .post("/api/signIn")
                    .send({
                        email: "hs@mun.ca",
                        password: "bcd@1234",
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
        describe("GET /api/signOut", () => {
            it("Testing for actual logout of the user for the website", (done) => {
                chai
                    .request(server)
                    .get("/api/signOut")
                    .end((err, response) => {
                        response.should.have.status(200);
                        console.log(response.body);
                        done();
                    });
            });
        });
    });

    /**
     * Test the product route
     */
    describe("2. Product API", () => {
        describe("GET /api/products", () => {
            it("Get all the product from the database", (done) => {
                chai
                    .request(server)
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
    describe("3. Category API", () => {
        describe("GET /api/categories", () => {
            it("Get all the categories from the database", (done) => {
                chai
                    .request(server)
                    .get("/api/categories")
                    .end((err, response) => {
                        response.should.have.status(200);
                        done();
                    });
            });
        });

        describe("POST /api/category/create/:userId", () => {
            it("Create a new category and storing it in the database", (done) => {
                chai
                    .request(server)
                    .post(`/api/category/create/${userId}`)
                    .auth(token, {
                        type: "bearer"
                    })
                    .send({
                        name: "TEST2",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        categoryId = response.body.category._id;
                        response.body.should.be.a("object");
                        response.body.category.should.have.property("name");
                        response.body.category.should.have.property("_id");
                        done();
                    });
            });
        });

        describe("DELETE /api/category/:userId", () => {
            it("Delete a category for the database", (done) => {
                chai
                    .request(server)
                    .delete(`/api/category/${categoryId}/${userId}`)
                    .auth(token, {
                        type: "bearer"
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("message");
                        done();
                    });
            });
        });
    });
});