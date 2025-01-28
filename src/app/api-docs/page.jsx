"use client";

export default function ApiDocs() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Todo API Documentation</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
        <code className="bg-gray-100 p-2 rounded">
          {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}
        </code>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
        <p className="text-gray-700">
          No authentication required for this API.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>

        {/* GET /api/todos */}
        <div className="mb-8 border rounded-lg p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded font-mono">
              GET
            </span>
            <code className="font-mono">/api/todos</code>
          </div>
          <p className="text-gray-700 mb-4">Get all todos</p>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Response</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {`{
  "success": true,
  "message": "Todos retrieved successfully",
  "data": [
    {
      "_id": "string",
      "title": "string",
      "completed": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}`}
            </pre>
          </div>
        </div>

        {/* POST /api/todos */}
        <div className="mb-8 border rounded-lg p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded font-mono">
              POST
            </span>
            <code className="font-mono">/api/todos</code>
          </div>
          <p className="text-gray-700 mb-4">Create a new todo</p>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Request Body</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {`{
  "title": "string" // required
}`}
            </pre>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Response</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {`{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "string",
    "title": "string",
    "completed": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}`}
            </pre>
          </div>
        </div>

        {/* PUT /api/todos/{id} */}
        <div className="mb-8 border rounded-lg p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-yellow-500 text-white px-3 py-1 rounded font-mono">
              PUT
            </span>
            <code className="font-mono">/api/todos/{"{id}"}</code>
          </div>
          <p className="text-gray-700 mb-4">Update a todo</p>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Request Body</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {`{
  "title": "string" // required
}`}
            </pre>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Response</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {`{
  "success": true,
  "message": "Todo updated successfully",
  "data": {
    "_id": "string",
    "title": "string",
    "completed": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}`}
            </pre>
          </div>
        </div>

        {/* DELETE /api/todos/{id} */}
        <div className="mb-8 border rounded-lg p-6 bg-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded font-mono">
              DELETE
            </span>
            <code className="font-mono">/api/todos/{"{id}"}</code>
          </div>
          <p className="text-gray-700 mb-4">Delete a todo</p>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Response</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {`{
  "success": true,
  "message": "Todo deleted successfully",
  "data": {
    "_id": "string",
    "title": "string",
    "completed": boolean,
    "createdAt": "string",
    "updatedAt": "string"
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Error Responses</h2>
        <div className="border rounded-lg p-6 bg-white">
          <h3 className="font-semibold mb-2">Example Error Response</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {`{
  "success": false,
  "message": "Error message",
  "data": null,
  "error": "Detailed error description"
}`}
          </pre>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">HTTP Status Codes</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">200</code> -
                Success
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">201</code> -
                Created
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">400</code> - Bad
                Request
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">404</code> - Not
                Found
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">500</code> -
                Server Error
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
