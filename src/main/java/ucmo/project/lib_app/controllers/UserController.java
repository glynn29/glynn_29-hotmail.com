package ucmo.project.lib_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ucmo.project.lib_app.models.Info;
import ucmo.project.lib_app.models.Role;
import ucmo.project.lib_app.models.User;
import ucmo.project.lib_app.repositories.InfoRepository;
import ucmo.project.lib_app.repositories.UserRepository;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    InfoRepository infoRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping
    public User create(@RequestBody User user) {
        Role role = new Role(2);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        User proctor = new User(user.getUsername(),bCryptPasswordEncoder.encode(user.getPassword()),user.isEnabled(), roles);
        return userRepository.save(proctor);
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
    public User findUsersById(@PathVariable int id){
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
            userRepository.save(userUpdate);
        }
        return userUpdate;
        //User user = userRepository.findById(id).orElseThrow(e => "asset not found");
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
    }

    //info controls
    @PostMapping("/info/{id}")
    public Info create(@PathVariable int id, @RequestBody Info info) {
        Optional<User> user = userRepository.findById(id);
        Info newInfo = new Info();
        if (user.isPresent()) {
            newInfo.setUser(user.get());
            newInfo.setCompletedHours(info.getCompletedHours());
            newInfo.setWeeklyHours(info.getWeeklyHours());
            newInfo.setGPA(info.getGPA());
        }

        return infoRepository.save(newInfo);
    }

    @GetMapping("/info/{id}")
    public Info getInfo(@PathVariable int id){
        return infoRepository.findById(id).orElse(null);
    }

    @PutMapping("/info/{id}")
    public Info updateInfo(@PathVariable int id, @RequestBody Info infoUpdate){
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            Info info = infoRepository.findByUser(optionalUser.get());
            if(info != null) {
                info.setGPA(infoUpdate.getGPA());
                info.setWeeklyHours(infoUpdate.getWeeklyHours());
                info.setCompletedHours(infoUpdate.getCompletedHours());
                infoRepository.save(info);
            }
        }
        return infoUpdate;
    }

    @DeleteMapping("/info/{id}")
    public void deleteInfo(@PathVariable int id){
        Optional<User> user = userRepository.findById(id);
        Info info = new Info();
        if (user.isPresent()) {
            infoRepository.delete(infoRepository.findByUser(user.get()));
        }
    }
}
