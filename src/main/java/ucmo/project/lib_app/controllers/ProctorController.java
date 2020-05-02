package ucmo.project.lib_app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ucmo.project.lib_app.models.*;
import ucmo.project.lib_app.repositories.InfoRepository;
import ucmo.project.lib_app.repositories.OrganizationRepository;
import ucmo.project.lib_app.repositories.UserRepository;
import ucmo.project.lib_app.services.ValidatorService;
import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/proctor")
public class ProctorController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    InfoRepository infoRepository;

    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    ValidatorService validatorService;

    @GetMapping("{proctorId}")
    public Person getProctorById(@PathVariable Integer proctorId){
        Optional<User> optionalUser = userRepository.findById(proctorId);
        Person person = new Person();
        if (optionalUser.isPresent()) {
            User proctor = optionalUser.get();
            Info info = infoRepository.findByUser(proctor);
            person.setUser(proctor);
            person.setInfo(info);
        }
        return person;
    }

    @PostMapping()
    public ApiResponse createProctor(@Valid @RequestBody Person person) {
        Role role = new Role(2);//id for role_proctor
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        ApiResponse response = new ApiResponse();
        User proctor = person.getUser();
        Info info = person.getInfo();
        info.setCompletedHours(0);

        ArrayList<String> list = validatorService.validateAddUser(proctor,info);
        if (list.size()>=1) {
            response.setStatus(HttpStatus.BAD_REQUEST);
            response.setList(list);
            System.out.println("fail: " +  list);
            return response;
        }else {
            System.out.println("Saving proctor : " + proctor.getUsername());
            proctor.setRoles(roles);
            proctor.setPassword(bCryptPasswordEncoder.encode(proctor.getPassword()));

            User savedProctor = userRepository.save(proctor);
            info.setUser(savedProctor);


            infoRepository.save(info);
        }
        return response;
    }

    @PutMapping("/{proctorId}")
    public ApiResponse editProctor(@Valid @RequestBody Person person, @PathVariable Integer proctorId){
        User proctorUpdate = person.getUser();
        Info infoUpdate = person.getInfo();
        ApiResponse response = new ApiResponse();

        Optional<User> optionalUser = userRepository.findById(proctorId);
        if(optionalUser.isPresent()) {
            User proctor = optionalUser.get();
            System.out.println("user " + proctor.getUsername() + " is present, editing");

            proctor.setOrganization(proctorUpdate.getOrganization());
            proctor.setEnabled(proctorUpdate.isEnabled());
            proctor.setUsername(proctorUpdate.getUsername());

            if (proctorUpdate.getPassword().length() > 0){
                System.out.println("password change");
                proctor.setPassword(proctorUpdate.getPassword());
            }

            Info info = infoRepository.findByUser(proctor);
            info.setGPA(infoUpdate.getGPA());
            info.setCompletedHours(infoUpdate.getCompletedHours());
            info.setWeeklyHours(infoUpdate.getWeeklyHours());

            ArrayList<String> list = validatorService.validateEditUser(proctor,info);
            if (list.size()>=1) {
                response.setStatus(HttpStatus.BAD_REQUEST);
                response.setList(list);
                System.out.println("fail: " +  list);
                return response;
            }else {
                System.out.println("Edit Success, Saving proctor : " + proctor.getUsername());
                if (proctorUpdate.getPassword().length() > 0) {
                    proctor.setPassword(bCryptPasswordEncoder.encode(proctorUpdate.getPassword()));
                }
                userRepository.save(proctor);
                infoRepository.save(info);
            }
        }
        return response;
    }

    @GetMapping("/{proctorId}/users")
    public List<User> findUsersByProctorId(@PathVariable int proctorId){
        return userRepository.findByProctorId(proctorId);
    }


}
