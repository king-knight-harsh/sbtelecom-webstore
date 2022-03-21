/**
 * Unit testing of the routes using Mocha.js and
 * chai.js
 */
// Importing the required libraries for use in the module
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
/**
 * Variables to be used for performing CRUD operations
 * token - json web token used for authentication purpose
 * categoryId - To store categoryID for the product
 * userId - To store the admin UserId for the product
 * categoryIdForProductAPI - categoryId used for categorizing the product
 * created while testing
 */
let token,
    categoryId,
    productId,
    userId,
    categoryIdForProductAPI,
    productName,
    categoryObject;

/**
 * Main testing starts here
 */
describe("UNIT TESTING WITH MOCHA AND CHAI", () => {
    /**
     * Testing all the routes for auth.js
     */
    describe("1. Authentication API", () => {
        /**
         * Uncomment the signUP block to to use signUp functionality
         */
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
                        userId = response.body.user._id;
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
                        response.body.should.have.property("message");
                        done();
                    });
            });
        });
    });
    /**
     * Testing all the user route
     */
    describe("2. User API", () => {
        /**
         * Testing the get route for user
         */
        describe("GET /api/user/:userId", () => {
            it("Get the user from the database", (done) => {
                chai
                    .request(server)
                    .get(`/api/user/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("_id");
                        response.body.should.have.property("firstName");
                        response.body.should.have.property("lastName");
                        response.body.should.have.property("email");
                        response.body.should.have.property("phoneNumber");
                        response.body.should.have.property("role");
                        done();
                    });
            });
            it("Get the unknown user from the database", (done) => {
                chai
                    .request(server)
                    .get(`/api/user/${userId}123`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });
        });
        /**
         * Testing the put route for user
         */
        describe("PUT /api/user/:userId", () => {
            it("Updating user name in the database", (done) => {
                chai
                    .request(server)
                    .put(`/api/user/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .send({
                        firstName: "Harsh1",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("_id");
                        response.body.should.have.property("firstName");
                        response.body.should.have.property("lastName");
                        response.body.should.have.property("email");
                        response.body.should.have.property("phoneNumber");
                        response.body.should.have.property("role");
                        done();
                    });
            });

            it("Updating unknown user in the database", (done) => {
                chai
                    .request(server)
                    .put(`/api/user/${userId}1234`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .send({
                        firstName: "Harsh1",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });
        });
        /**
         * Testing the get route for getting order list
         */
        describe("GET /api/orders/user/:userId", () => {
            it("Get the orders list for an user from the database", (done) => {
                chai
                    .request(server)
                    .get(`/api/orders/user/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        done();
                    });
            });
            it("Getting the orders list for an unknown user from the database", (done) => {
                chai
                    .request(server)
                    .get(`/api/orders/user/${userId}123`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });
        });
    });

    /**
     * Test the all categories route
     */
    describe("3. Category API", () => {
        /**
         * Testing the post route creating a category
         */
        describe("POST /api/category/create/:userId", () => {
            it("Create a new category and storing it in the database", (done) => {
                chai
                    .request(server)
                    .post(`/api/category/create/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .send({
                        name: "TEST2",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        categoryObject = response.body.category;
                        categoryId = response.body.category._id;
                        response.body.should.be.a("object");
                        response.body.category.should.have.property("name");
                        response.body.category.should.have.property("_id");
                        categoryIdForProductAPI = response.body.category._id;
                        done();
                    });
            });
        });
        /**
         * Testing the all the get routes for the category.js
         */
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

            it("Get actual category from the database", (done) => {
                chai
                    .request(server)
                    .get(`/api/category/${categoryId}`)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("_id");
                        response.body.should.have.property("name");
                        response.body.should.have.property("createdAt");
                        response.body.should.have.property("updatedAt");
                        done();
                    });
            });

            it("Get unknown category from the database", (done) => {
                chai
                    .request(server)
                    .get(`/api/category/${categoryId}123`)
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });
        });
        /**
         * Testing the put route updating fields of a category
         */
        describe("PUT /api/category/:userId", () => {
            it("Updating the category NAME", (done) => {
                chai
                    .request(server)
                    .put(`/api/category/${categoryId}/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .send({
                        name: "TEST_NAME_UPDATE",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("_id");
                        response.body.should.have.property("name");
                        response.body.should.have.property("createdAt");
                        response.body.should.have.property("updatedAt");
                        done();
                    });
            });

            it("Updating the category NAME with wrong user Id", (done) => {
                chai
                    .request(server)
                    .put(`/api/category/${categoryId}/${userId}123`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .send({
                        name: "TEST_NAME_UPDATE",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });

            it("Updating the unknown category ", (done) => {
                chai
                    .request(server)
                    .put(`/api/category/${categoryId}123/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .send({
                        name: "TEST_NAME_UPDATE",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });
        });
    });
    /**
     * Test the all the routes for the product
     */
    describe("4. Product API", () => {
        /**
         * Testing the post route creating a new product
         */
        describe("POST /api/product/create/:userId", () => {
            it("Create a new product and storing it in the database", (done) => {
                chai
                    .request(server)
                    .post(`/api/product/create/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .type("form")
                    .send({
                        name: "LG Monitor 34 inch",
                        description: "4k Curved Monitor",
                        price: 699,
                        category: `${categoryIdForProductAPI}`,
                        stock: 5,
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("name");
                        productName = response.body.name;
                        response.body.should.have.property("description");
                        response.body.should.have.property("price");
                        response.body.should.have.property("category");
                        response.body.should.have.property("stock");
                        response.body.should.have.property("sold");
                        response.body.should.have.property("_id");
                        productId = response.body._id;
                        done();
                    });
            });
        });
        /**
         * Testing the all the get routes for the product.js
         */
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
            it("Get actual product from the database", (done) => {
                chai
                    .request(server)
                    .get(`/api/product/${productId}`)
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("_id");
                        response.body.should.have.property("name");
                        response.body.should.have.property("createdAt");
                        response.body.should.have.property("updatedAt");
                        done();
                    });
            });
            it("Get unknown product from the database", (done) => {
                chai
                    .request(server)
                    .get(`/api/category/${productId}123`)
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });
        });
        /**
         * Testing the put route updating a field of a product
         */
        describe("PUT /api/product/:userId", () => {
            it("Updating the product name", (done) => {
                chai
                    .request(server)
                    .put(`/api/product/${productId}/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .type("form")
                    .send({
                        name: "LG Monitor 35 inch",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("_id");
                        response.body.should.have.property("name");
                        response.body.should.have.property("createdAt");
                        response.body.should.have.property("updatedAt");
                        done();
                    });
            });

            it("Updating the product name with wrong admin user ID", (done) => {
                chai
                    .request(server)
                    .put(`/api/product/${productId}/${userId}124`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .type("form")
                    .send({
                        name: "LG Monitor 35 inch",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });

            it("Updating the product name with wrong product", (done) => {
                chai
                    .request(server)
                    .put(`/api/product/${productId}123/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .type("form")
                    .send({
                        name: "LG Monitor 35 inch",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });
        });
    });
    /**
     * Test the all routes for the order
     */
    describe("5. ORDER API", () => {
        /**
         * Testing the all the get routes for the order.js
         */
        describe("GET /api/order/all/:userId", () => {
            it("Get all the product from the database", (done) => {
                chai
                    .request(server)
                    .get(`/api/order/all/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        done();
                    });
            });
        });

        /**
         * Testing the post route creating a new product
         */
        describe("POST /api/order/create/:userId", () => {
            it("Create a new product and storing it in the database", (done) => {
                chai
                    .request(server)
                    .post(`/api/order/create/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .send([{
                        _id: `${productId}`,
                        name: `${productName}`,
                        description: "1 ms with ultra hd display",
                        category: {
                            _id: `${categoryObject._id}`,
                            name: `${categoryObject.name}`,
                        },
                        quantity: 2,
                        amount: 199,
                        transaction_id: 201,
                    }, ])
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("status");
                        response.body.should.have.property("user");
                        response.body.should.have.property("_id");
                        done();
                    });
            });
        });

        /**
         * Testing the get routes for the getting the status of the order
         */
        describe("GET /api/order/status/:userId", () => {
            it("Get the status of the order of a particular user", (done) => {
                chai
                    .request(server)
                    .get(`/api/order/status/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        done();
                    });
            });
        });
    });

    /**
     * Test the delete routes for the product
     */
    describe("6. Product API", () => {
        /**
         * Testing the delete route deleting a product
         */
        describe("DELETE /api/product/create/:userId", () => {
            it("Delete a product from the database", (done) => {
                chai
                    .request(server)
                    .delete(`/api/product/${productId}/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("message");
                        done();
                    });
            });

            it("Delete a product from the database with wrong user id", (done) => {
                chai
                    .request(server)
                    .delete(`/api/product/${productId}/${userId}123`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });

            it("Deleting an unknown product from the database", (done) => {
                chai
                    .request(server)
                    .delete(`/api/product/${productId}123/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });
        });
    });

    /**
     * Testing the delete route for the category
     */
    describe("7. Category API", () => {
        /**
         * Testing the delete routes for the category
         */
        describe("DELETE /api/category/:userId", () => {
            it("Delete a category from the database", (done) => {
                chai
                    .request(server)
                    .delete(`/api/category/${categoryId}/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(200);
                        response.body.should.have.property("message");
                        done();
                    });
            });

            it("Delete a category from the database with wrong user id", (done) => {
                chai
                    .request(server)
                    .delete(`/api/category/${productId}/${userId}123`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });

            it("Deleting an unknown category from the database", (done) => {
                chai
                    .request(server)
                    .delete(`/api/category/${productId}123/${userId}`)
                    .auth(token, {
                        type: "bearer",
                    })
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.body.should.have.property("ERROR");
                        done();
                    });
            });
        });
    });
});