import { users } from "../models/users";

function validateUser(username, password){
    let user = users.find(username)
    return (user.password == password) 
}

export { validateUser };
