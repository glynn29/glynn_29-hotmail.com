import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/users';

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
const instance = axios.create({headers: { "X-XSRF-TOKEN": CSRF_TOKEN }});

class ApiService {
    getUsers(){
        return instance.get(USER_API_BASE_URL);
    }

    getUserById(userId){
        return instance.get(USER_API_BASE_URL + '/' + userId);
    }

    addUser(user){
        return instance.post("" + USER_API_BASE_URL, user);
    }

    deleteUser(userId){
        return instance.delete(USER_API_BASE_URL + '/' + userId);
    }

    editUser(user){
        return instance.put(USER_API_BASE_URL +'/' + user.id, user);
    }
}

export default new ApiService();