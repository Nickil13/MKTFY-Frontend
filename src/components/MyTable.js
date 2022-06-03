import React from "react";

export default function MyTable({ todos }) {
    return (
        <div className="my-table">
            <h2 className="my-table__title">My Table</h2>

            {todos.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Todo Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td>
                                        {todo.complete === true
                                            ? "true"
                                            : "false"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No todos.</p>
            )}
        </div>
    );
}
