package ucmo.project.lib_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ucmo.project.lib_app.models.Role;
import ucmo.project.lib_app.models.User;
import ucmo.project.lib_app.repositories.InfoRepository;
import ucmo.project.lib_app.repositories.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users/proctor")
public class ProctorController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    InfoRepository infoRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping
    public User create(@RequestBody User proctorBody) {
        Role role = new Role(2);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        User proctor = new User(proctorBody.getUsername(),bCryptPasswordEncoder.encode(proctorBody.getPassword()),proctorBody.isEnabled(), roles);
        proctor.setProctorId(proctorBody.getProctorId());
        return userRepository.save(proctor);
    }

    @GetMapping("/{id}")
    public List<User> findUsersByProctorId(@PathVariable int id){
        return userRepository.findByProctorId(id);
    }
}
