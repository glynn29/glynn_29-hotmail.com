package ucmo.project.lib_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ucmo.project.lib_app.models.Role;
import ucmo.project.lib_app.models.User;
import ucmo.project.lib_app.repositories.InfoRepository;
import ucmo.project.lib_app.repositories.UserRepository;

import java.security.Principal;
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
    public User create(@RequestBody User userBody) {
        Role role = new Role(3);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        User user = new User(userBody.getUsername(),bCryptPasswordEncoder.encode(userBody.getPassword()),userBody.isEnabled(), roles);
        user.setProctorId(userBody.getProctorId());
        System.out.println(userBody.getProctorId());
        return userRepository.save(user);
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
            userRepository.save(userUpdate);
        }
        return userUpdate;
        //User user = userRepository.findById(id).orElseThrow(e => "asset not found");
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
    }
}
