// features/role/pages/CreateRole.jsx
import React, { useState } from "react";
import RoleForm from "../components/RoleForm";
import { createRole } from "../services/roleService";

const CreateRole = () => {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data) => {
        try {
            setLoading(true);
            await createRole(data);
            alert("Role created successfully");
        } catch (err) {
            console.error(err);
            alert("Error creating role");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <RoleForm onSubmit={handleCreate} loading={loading} />
        </div>
    );
};

export default CreateRole;