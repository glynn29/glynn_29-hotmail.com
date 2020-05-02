package ucmo.project.lib_app.models;

import org.springframework.http.HttpStatus;
import java.util.ArrayList;

public class ApiResponse {
    private HttpStatus status;
    private String message;
    private ArrayList<String> list;

    public ApiResponse(){ }
    public ApiResponse(HttpStatus status, String message, ArrayList<String> list){
        this.status= status;
        this.message = message;
        this.list = list;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ArrayList<String> getList() {
        return list;
    }

    public void setList(ArrayList<String> list) {
        this.list = list;
    }
}
