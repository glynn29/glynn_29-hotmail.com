import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/users';
const INFO_API_BASE_URL = 'http://localhost:8080/info';

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
const instance = axios.create({headers: { "X-XSRF-TOKEN": CSRF_TOKEN }});

class ApiService {

    addCompleteUser(person){
        return instance.post(USER_API_BASE_URL + "/user", person);
    }

    getUsers(){
        return instance.get(USER_API_BASE_URL);
    }

    getLoggedInRole(){
        return instance.get(USER_API_BASE_URL + '/getRole');
    }

    getLoggedInId(){
        return instance.get(USER_API_BASE_URL + '/getId');
    }

    getUserID(username){
        return instance.get(USER_API_BASE_URL + '/user/' + username);
    }

    getUserById(userId){
        return instance.get(USER_API_BASE_URL + '/' + userId);
    }

    getUserByProctorId(proctorId){
        return instance.get(USER_API_BASE_URL + '/proctor/' + proctorId);
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

    //info controls
    addInfo(userId, info){
        return instance.post(INFO_API_BASE_URL + '/' + userId, info);
    }

    getInfo(userId){
        return instance.get(INFO_API_BASE_URL + '/' + userId);
    }
    editInfo(info){
        return instance.put(INFO_API_BASE_URL +'/' + info.user_info_id, info);
    }

    deleteInfo(infoId){
        return instance.delete(INFO_API_BASE_URL + '/' + infoId);
    }

    updateTime(userId, time){
        return instance.put(INFO_API_BASE_URL + '/' + userId + '/' + time);
    }

    getOrganizations(){
        return instance.get(INFO_API_BASE_URL + '/organization')
    }
}

export default new ApiService();