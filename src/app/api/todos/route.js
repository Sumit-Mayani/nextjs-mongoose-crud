// app/api/todos/route.js
import dbConnect from "@/lib/db";
import Todo from "@/models/Todo";
import { createApiResponse } from "@/utils/apiResponse";

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     description: Retrieves a list of all todos
 *     responses:
 *       200:
 *         description: List of todos retrieved successfully
 *       500:
 *         description: Server error while fetching todos
 */
export async function GET() {
  try {
    await dbConnect();
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    return createApiResponse(200, "Todos retrieved successfully", todos);
  } catch (error) {
    console.error("GET /api/todos error:", error);
    return createApiResponse(500, "Failed to fetch todos", null, error.message);
  }
}

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     description: Creates a new todo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server error while creating todo
 */
export async function POST(request) {
  try {
    await dbConnect();
    const { title } = await request.json();
    
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return createApiResponse(400, "Invalid title", null, "Title is required and must be a non-empty string");
    }

    const todo = new Todo({ title: title.trim() });
    const savedTodo = await todo.save();
    
    return createApiResponse(201, "Todo created successfully", savedTodo);
  } catch (error) {
    console.error("POST /api/todos error:", error);
    return createApiResponse(500, "Failed to create todo", null, error.message);
  }
}

/**
 * @swagger
 * /api/todos:
 *   options:
 *     summary: CORS support
 *     description: Enable CORS by returning correct headers
 *     responses:
 *       204:
 *         description: CORS headers set successfully
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
