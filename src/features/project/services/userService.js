export const getAllUsers = async () => {
    const res = await fetch("https://pms-l909.onrender.com/api/v1/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            // add token if required
            // Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()
    return data
}