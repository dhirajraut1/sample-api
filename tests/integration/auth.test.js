const request = require("supertest");
const app = require("../../src/app");

describe("Authentication API", () => {
  let token;
  let userId;

  test("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "password123",
        firstName: "Test",
        lastName: "User",
      })
      .expect(201);

    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe("test@example.com");
    token = response.body.token;
    userId = response.body.user.id;
  });

  test("should login with valid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "password123",
      })
      .expect(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe("test@example.com");
  });

  test("should get user profile with valid token", async () => {
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.user.id).toBe(userId);
  });

  test("should return 401 for invalid token", async () => {
    await request(app)
      .get("/api/auth/profile")
      .set("Authorization", "Bearer invalid-token")
      .expect(403);
  });
});
