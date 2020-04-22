package ucmo.project.lib_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ucmo.project.lib_app.models.Info;
import ucmo.project.lib_app.models.User;
import ucmo.project.lib_app.repositories.InfoRepository;
import ucmo.project.lib_app.repositories.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/users/info")
public class InfoController {
    @Autowired
    InfoRepository infoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/{id}")
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

    @GetMapping("/{id}")
    public Info getInfo(@PathVariable int id){
        return infoRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
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

    @PutMapping("/{id}/{time}")
    public Info updateTime(@PathVariable int id, @PathVariable Integer time ){
        Optional<User> optionalUser = userRepository.findById(id);
        Info info = new Info();
        if (optionalUser.isPresent()) {
            info = infoRepository.findByUser(optionalUser.get());
            if(info != null) {
                int completedTime = info.getCompletedHours();
                info.setCompletedHours((completedTime + time));//add old time and new time
                infoRepository.save(info);
            }
        }
        return info;
    }

    @DeleteMapping("/{id}")
    public void deleteInfo(@PathVariable int id){
        Optional<User> user = userRepository.findById(id);
        Info info = new Info();
        if (user.isPresent()) {
            infoRepository.delete(infoRepository.findByUser(user.get()));
        }
    }

}
