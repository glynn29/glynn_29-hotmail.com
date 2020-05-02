package ucmo.project.lib_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ucmo.project.lib_app.models.*;
import ucmo.project.lib_app.repositories.InfoRepository;
import ucmo.project.lib_app.repositories.UserRepository;
import ucmo.project.lib_app.services.ValidatorService;

import javax.validation.Valid;
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
    ValidatorService validatorService;

    @PostMapping("/user")
    public ApiResponse createUser(@Valid @RequestBody Person person, BindingResult result) {
        Role role = new Role(3);//id for role_user
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        ApiResponse response = new ApiResponse();
        User user = person.getUser();
        Info info = person.getInfo();
        info.setCompletedHours(0);
        ArrayList<String> list = validatorService.validateAddUser(user,info);//new ArrayList<>();
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

    @PutMapping("/{userId}")
    public ApiResponse editUser(@Valid @RequestBody Person person, @PathVariable Integer userId){
        User userUpdate = person.getUser();
        Info infoUpdate = person.getInfo();
        ApiResponse response = new ApiResponse();

        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            System.out.println("user " + user.getUsername() + " is present, editing");

            user.setEnabled(userUpdate.isEnabled());
            user.setUsername(userUpdate.getUsername());

            if (userUpdate.getPassword().length() > 0){
                System.out.println("password change");
                user.setPassword(userUpdate.getPassword());
            }

            Info info = infoRepository.findByUser(user);
            info.setGPA(infoUpdate.getGPA());
            info.setCompletedHours(infoUpdate.getCompletedHours());
            info.setWeeklyHours(infoUpdate.getWeeklyHours());

            ArrayList<String> list = validatorService.validateEditUser(user,info);
            if (list.size()>=1) {
                response.setStatus(HttpStatus.BAD_REQUEST);
                response.setList(list);
                System.out.println("fail: " +  list);
                return response;
            }else {
                System.out.println("Edit Success, Saving user : " + user.getUsername());
                if (userUpdate.getPassword().length() > 0) {
                    user.setPassword(bCryptPasswordEncoder.encode(userUpdate.getPassword()));
                }
                userRepository.save(user);
                infoRepository.save(info);
            }
        }
        return response;
    }

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
            System.out.println("User: " + name + "s Roles are " + role.iterator());
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

    @GetMapping("/{userId}")
    public Person getUserById(@PathVariable Integer userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        Person person = new Person();
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Info info = infoRepository.findByUser(user);
            person.setUser(user);
            person.setInfo(info);
        }
        return person;
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

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
    }

    @GetMapping("/assign")
    public List<User> getNewUsers(){
        return userRepository.findAllByProctorIdIsNull();
    }
}
