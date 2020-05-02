import axios from 'axios';

const USER_API_BASE_URL = '/users';
const PROCTOR_API_BASE_URL = '/proctor';
const INFO_API_BASE_URL = '/info';

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
const instance = axios.create({headers: { "X-XSRF-TOKEN": CSRF_TOKEN }});

class ApiService {
    //proctor apis
    getUserByProctorId(proctorId){
        return instance.get(PROCTOR_API_BASE_URL + '/' + proctorId + '/users');
    }

    addProctor(person){
        return instance.post("" +PROCTOR_API_BASE_URL, person);
    }

    getProctorById(proctorId){
        return instance.get(PROCTOR_API_BASE_URL + '/' + proctorId);
    }

    editProctor(proctorId, person){
        return instance.put(PROCTOR_API_BASE_URL + '/' + proctorId, person);
    }

    //users
    addCompleteUser(person){
        return instance.post(USER_API_BASE_URL + "/user", person);
    }

    editUser(proctorId, person){
        return instance.put(USER_API_BASE_URL + '/' + proctorId, person);
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

    getUserById(userId){
        return instance.get(USER_API_BASE_URL + '/' + userId);
    }

    deleteUser(userId){
        return instance.delete(USER_API_BASE_URL + '/' + userId);
    }

    //info controls
    addInfo(userId, proctorId, info){
        return instance.post(INFO_API_BASE_URL + '/' + userId + '/proctor/' + proctorId, info);
    }

    getInfo(userId){
        return instance.get(INFO_API_BASE_URL + '/' + userId);
    }

    updateTime(userId, time){
        return instance.put(INFO_API_BASE_URL + '/' + userId + '/' + time);
    }

    getOrganizations(){
        return instance.get(INFO_API_BASE_URL + '/organization')
    }

    getOrganization(proctorId){
        return instance.get(INFO_API_BASE_URL + '/organization/' + proctorId)
    }

    getNewUsers(){
        return instance.get(USER_API_BASE_URL + '/assign');
    }
}

export default new ApiService();