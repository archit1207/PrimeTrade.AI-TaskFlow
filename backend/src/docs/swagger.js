import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description: "Scalable REST API with JWT auth and role-based access"
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: []
};

const swaggerSpec = swaggerJSDoc(options);

swaggerSpec.paths = {
  "/auth/register": {
    post: {
      summary: "Register a new user",
      tags: ["Auth"]
    }
  },
  "/auth/login": {
    post: {
      summary: "Login user",
      tags: ["Auth"]
    }
  },
  "/auth/me": {
    get: {
      summary: "Get logged-in user profile",
      tags: ["Auth"]
    }
  },
  "/tasks": {
    get: {
      summary: "Get all tasks (user gets own tasks, admin gets all)",
      tags: ["Tasks"]
    },
    post: {
      summary: "Create a task",
      tags: ["Tasks"]
    }
  },
  "/tasks/{id}": {
    get: {
      summary: "Get single task",
      tags: ["Tasks"]
    },
    patch: {
      summary: "Update task",
      tags: ["Tasks"]
    },
    delete: {
      summary: "Delete task",
      tags: ["Tasks"]
    }
  },
  "/users": {
    get: {
      summary: "Admin only - get all users",
      tags: ["Users"]
    }
  },
  "/users/{id}": {
    get: {
      summary: "Admin only - get single user",
      tags: ["Users"]
    }
  }
};

export default swaggerSpec;