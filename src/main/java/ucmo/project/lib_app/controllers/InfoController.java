//package ucmo.project.lib_app.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//import ucmo.project.lib_app.models.Info;
//import ucmo.project.lib_app.models.Role;
//import ucmo.project.lib_app.models.User;
//import ucmo.project.lib_app.repositories.InfoRepository;
//
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
//@RestController
//@RequestMapping("/info")
//public class InfoController {
//    @Autowired
//    InfoRepository infoRepository;
//
//    @Autowired
//    BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    @PostMapping("/{id}")
//    public Info create(@PathVariable int id, @RequestBody Info info) {
//        User user = new User();
//        user.setId(id);
//        Info newInfo = info;
//        newInfo.setUser(user);
//        return infoRepository.save(newInfo);
//    }
//
//    @GetMapping
//    public List<Info> listInfo(){
//        return infoRepository.findAll();
//    }
//
//}
