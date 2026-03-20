export const getAllUsers = async () => {
    const res= await fetch("https://pms-l909.onrender.com/api/v1/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    const data = await res.json();
    console.log("Users fetched:", data);
    return data;
};  

    