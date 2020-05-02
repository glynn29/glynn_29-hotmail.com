package ucmo.project.lib_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ucmo.project.lib_app.models.ApiResponse;
import ucmo.project.lib_app.models.Info;
import ucmo.project.lib_app.models.Organization;
import ucmo.project.lib_app.models.User;
import ucmo.project.lib_app.repositories.InfoRepository;
import ucmo.project.lib_app.repositories.OrganizationRepository;
import ucmo.project.lib_app.repositories.UserRepository;
import ucmo.project.lib_app.services.ValidatorService;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/info")
public class InfoController {
    @Autowired
    InfoRepository infoRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    ValidatorService validatorService;

    @PostMapping("/{userId}/proctor/{proctorId}")
    public ApiResponse createInfo(@PathVariable Integer userId, @PathVariable Integer proctorId, @RequestBody Info info) {
        ApiResponse response = new ApiResponse();
        Optional<User> optionalUser = userRepository.findById(userId);
        Info newInfo = new Info();
        if (optionalUser.isPresent()) {
            ArrayList<String> list = validatorService.validateAddInfo(info);
            if (list.size()>=1) {
                response.setStatus(HttpStatus.BAD_REQUEST);
                response.setList(list);
                System.out.println("fail: " +  list);
                return response;
            }else {
                User user = optionalUser.get();
                user.setProctorId(proctorId);
                user.setEnabled(true);

                newInfo.setUser(user);
                newInfo.setCompletedHours(0);
                newInfo.setWeeklyHours(info.getWeeklyHours());
                newInfo.setGPA(info.getGPA());
                infoRepository.save(newInfo);
            }
        }
        return response;
    }

    @GetMapping("/{userId}")
    public Info getInfo(@PathVariable Integer userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.map(user -> infoRepository.findByUser(user)).orElse(null);
    }

    @PutMapping("/{userId}")
    public Info updateInfo(@PathVariable Integer userId, @RequestBody Info infoUpdate){
        Optional<User> optionalUser = userRepository.findById(userId);

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

    @PutMapping("/{userId}/{time}")
    public Info updateTime(@PathVariable Integer userId, @PathVariable Integer time ){
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            Info info = infoRepository.findByUser(optionalUser.get());
            if(info != null) {
                int completedTime = info.getCompletedHours();
                info.setCompletedHours((completedTime + time));//add old time and new time
                return infoRepository.save(info);
            }
        }
        return null;
    }

    @DeleteMapping("/{userId}")
    public void deleteInfo(@PathVariable Integer userId){
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            infoRepository.delete(infoRepository.findByUser(user.get()));
            System.out.println("User " + user.get().getUsername() + " was deleted successfully");
        }
    }

    @GetMapping("/organization")
    public List<Organization> getAllOrganizations(){
        return organizationRepository.findAll();
    }

    @GetMapping("/organization/{proctorId}")
    public Organization getOrganization(@PathVariable int proctorId){
        return userRepository.findById(proctorId).get().getOrganization();
    }
}
