package ucmo.project.lib_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.MultiValueMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ucmo.project.lib_app.models.*;
import ucmo.project.lib_app.repositories.InfoRepository;
import ucmo.project.lib_app.repositories.UserRepository;
import ucmo.project.lib_app.services.UserValidatorService;

import javax.validation.Valid;
import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    InfoRepository infoRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserValidatorService userValidatorService;

    @PostMapping("/user")
    public ApiError createUser2(@Valid @RequestBody Person person, BindingResult result) {
        Role role = new Role(3);//id for role_user
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        ApiError response = new ApiError();
        User user = person.getUser();
        Info info = person.getInfo();
        info.setCompletedHours(0);
        //System.out.println(user.getOrganization().getName());
        ArrayList<String> list = userValidatorService.validateAddUser(user,info);//new ArrayList<>();
        if (list.size()>=1) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setMessage("bad name");
            response.setList(list);
            System.out.println("fail: " +  list);
            return response;
        }else {
            System.out.println("Saving user : " + user.getUsername());
            user.setRoles(roles);
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

            User savedUser = userRepository.save(user);
            info.setUser(savedUser);

            infoRepository.save(info);
        }
        return response;
    }

//    @PostMapping
//    public ApiError createUser(@Valid @RequestBody User userBody, BindingResult result) {
//        Role role = new Role(3);//id for role_user
//        Set<Role> roles = new HashSet<>();
//        roles.add(role);
//        ApiError response = new ApiError();
//
//        ArrayList<String> list = userValidatorService.validateAddUser(userBody);
//        if (result.hasErrors()) {
//            response.setStatus(HttpStatus.BAD_REQUEST);
//            response.setMessage("bad name");
//            response.setList(list);
//            System.out.println("fail: " +  list);
//            return response;
//        }else {
//            User user = new User(userBody.getUsername(),bCryptPasswordEncoder.encode(userBody.getPassword()),userBody.isEnabled(), roles);
//            user.setProctorId(userBody.getProctorId());
//            System.out.println("Id"+ userBody.getProctorId());
//            System.out.println("yay");
//            userRepository.save(user);
//        }
//        return response;
//    }

    @GetMapping("/getId")
    public Integer currentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int id = 0;
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String name = authentication.getName();
            User user = userRepository.findByUsername(name);
            id = user.getId();
            System.out.println(name + " is Logged In");
        }
        else {
            System.out.println("Error - No One Logged In");
        }
        return id;
    }

    @GetMapping("/getRole")
    public Set<Role> currentUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Set<Role> role= new HashSet<>();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String name = authentication.getName();
            User user = userRepository.findByUsername(name);
            role = user.getRoles();
            System.out.println("User: " + name + "s Roles are " + role);
        }
        else {
            System.out.println("Error - No One Logged In");
        }
        return role;
    }

    @GetMapping
    public List<User> listUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/role/{id}")
    public List<User> findUsersByRoleId(@PathVariable int id){
        return userRepository.findByRoles(id);
    }

    @GetMapping("/{id}")
    public User findUserById(@PathVariable int id){
//        Optional<User> optionalUser = userRepository.findById(id);
//        return optionalUser.isPresent() ? optionalUser.get() : null;
        return userRepository.findById(id).orElse(null);
    }

    @GetMapping("/user/{username}")
    public Integer getUserId(@PathVariable String username){
        Integer id = 0;
        User user = userRepository.findByUsername(username);
        if (user.getId() != null){
            id = user.getId();
        }
        return id;
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User userUpdate){
        Optional<User> optionalUser = userRepository.findById(userUpdate.getId());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(userUpdate.getUsername());
            user.setEnabled(userUpdate.isEnabled());

            userRepository.save(user);
        }
        return userUpdate;
        //User user = userRepository.findById(id).orElseThrow(e => "asset not found");
    }

    @PutMapping("/{userId}/{proctorId}")
    public User updateUsersProctorId(@PathVariable int userId, @PathVariable int proctorId){
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setProctorId(proctorId);
            userRepository.save(user);
        }
        return optionalUser.get();
        //User user = userRepository.findById(id).orElseThrow(e => "asset not found");
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
    }

    @GetMapping("/assign")
    public List<User> getNewUsers(){
        return userRepository.findAllByProctorIdIsNull();
    }
}
