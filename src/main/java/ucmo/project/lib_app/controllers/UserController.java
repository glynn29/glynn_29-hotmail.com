package ucmo.project.lib_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ucmo.project.lib_app.models.Role;
import ucmo.project.lib_app.models.User;
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
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping
    public User create(@RequestParam String username, @RequestParam String password) {
        Role role = new Role(2);
        Set<Role> roles = new HashSet<Role>();
        roles.add(role);
        User proctor = new User(username,bCryptPasswordEncoder.encode(password),true, roles);
        return userRepository.save(proctor);
    }

    @GetMapping
    public List<User> listUsers(){
        return userRepository.findAll();
    }

//    @GetMapping("/{id}")
//    public List<User> findUsersByRoleId(@PathVariable int roleId){
//        return userRepository.findByRoles_Id(roleId);
//    }
    @GetMapping("/{id}")
    public User findUsersById(@PathVariable int id){
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.isPresent() ? optionalUser.get() : null;
    }

    @PutMapping("/{id}")
    public User updateUser(@RequestBody User userUpdate){
        Optional<User> optionalUser = userRepository.findById(userUpdate.getId());
        if (optionalUser.isPresent()) {
            userRepository.save(userUpdate);
        }
        return userUpdate;
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id){
        userRepository.deleteById(id);
    }
}
