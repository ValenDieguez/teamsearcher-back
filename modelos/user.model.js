exports.schema = (permission = 1) => {
    return {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        permissionLevel: permission
    }
};