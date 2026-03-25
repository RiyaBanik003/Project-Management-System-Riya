// features/role/pages/RoleList.jsx
import React, { useEffect, useState } from "react";
import { getRoles } from "../services/roleService";

const RoleList = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await getRoles();
            setRoles(res.data);
        } catch (err) {
            console.error(err);
        }
        
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">All Roles</h2>

            <div className="grid gap-4">
                {roles.map((role, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white shadow rounded-xl"
                    >
                        <h3 className="font-bold">{role.name}</h3>

                        <p className="text-sm text-gray-500">
                            Permissions: {role.permissions.join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoleList;