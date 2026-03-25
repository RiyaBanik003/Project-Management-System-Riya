// features/role/components/RoleForm.jsx
import React, { useState } from "react";

const RoleForm = ({ onSubmit, loading }) => {
    const [name, setName] = useState("");
    const [permissions, setPermissions] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name,
            permissions: permissions.split(",").map((p) => p.trim()),
        };

        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create Role</h2>

            <input
                type="text"
                placeholder="Role Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mb-3"
            />

            <input
                type="text"
                placeholder="Permissions (comma separated)"
                value={permissions}
                onChange={(e) => setPermissions(e.target.value)}
                className="w-full p-2 border rounded mb-3"
            />

            <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Creating..." : "Create Role"}
            </button>
        </form>
    );
};

export default RoleForm;