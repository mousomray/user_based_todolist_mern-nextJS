export const endpoints = {

    auth: {
        register: "/auth/register",
        login: "/auth/login",
    },

    cms: {
        addtodo: "/api/addtodo",
        showtodo: "/api/todolist",
        edittodo: "/api/edittodo",
        deletetodo: "/api/deletetodo",
    },

}

export const myendpoints = [
    endpoints.auth.register, //Index number 0
    endpoints.auth.login, //Index number 1
    endpoints.cms.addtodo, //Index number 2
    endpoints.cms.showtodo, //Index number 3
    endpoints.cms.edittodo, //Index number 4
    endpoints.cms.deletetodo, //Index number 5
]