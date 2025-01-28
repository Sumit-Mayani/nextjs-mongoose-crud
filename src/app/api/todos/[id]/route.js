import dbConnect from "@/lib/db";
import Todo from "@/models/Todo";
import { createApiResponse } from "@/utils/apiResponse";

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     description: Retrieves a specific todo by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Todo retrieved successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const todo = await Todo.findById(params.id);
    
    if (!todo) {
      return createApiResponse(404, "Todo not found", null, `Todo with id ${params.id} not found`);
    }

    return createApiResponse(200, "Todo retrieved successfully", todo);
  } catch (error) {
    console.error(`GET /api/todos/${params.id} error:`, error);
    return createApiResponse(500, "Failed to fetch todo", null, error.message);
  }
}

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     description: Updates a specific todo by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
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
 *                 description: The updated title of the todo
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { title } = await request.json();

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return createApiResponse(400, "Invalid title", null, "Title is required and must be a non-empty string");
    }

    const todo = await Todo.findByIdAndUpdate(
      params.id,
      { title: title.trim() },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return createApiResponse(404, "Todo not found", null, `Todo with id ${params.id} not found`);
    }

    return createApiResponse(200, "Todo updated successfully", todo);
  } catch (error) {
    console.error(`PUT /api/todos/${params.id} error:`, error);
    return createApiResponse(500, "Failed to update todo", null, error.message);
  }
}

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Deletes a specific todo by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const todo = await Todo.findByIdAndDelete(params.id);

    if (!todo) {
      return createApiResponse(404, "Todo not found", null, `Todo with id ${params.id} not found`);
    }

    return createApiResponse(200, "Todo deleted successfully", todo);
  } catch (error) {
    console.error(`DELETE /api/todos/${params.id} error:`, error);
    return createApiResponse(500, "Failed to delete todo", null, error.message);
  }
}

/**
 * @swagger
 * /api/todos/{id}:
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
