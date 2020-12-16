const request = require("supertest");
const app = ("../../app");
const newTodo = require("../mock-data/new-todo");
const endpointUrl = "/todos/";

describe(endpointUrl, () => {
    it("POST " + endpointUrl, async () => {
         request(app)
        // .get("localhost:3000")
        // .expect(200);
        try {
            
         const response = await request(app).post('http://localhost:3000');
        } catch (error) {
            console.log(error)
        }

        //     .post(endpointUrl)
        //     .send(newTodo);
       //     console.log (response);
        //     expect(response.statusCode).toBe(201);
        //     expect(response.body.title).toBe(newTodo.title);
        //     expect(response.body.done).toBe(newTodo.done);
    });
});