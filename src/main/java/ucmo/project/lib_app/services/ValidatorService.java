package ucmo.project.lib_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;
import ucmo.project.lib_app.models.Info;
import ucmo.project.lib_app.models.User;
import ucmo.project.lib_app.repositories.UserRepository;
import java.util.ArrayList;


@Service
    public class ValidatorService implements Validator {

        @Autowired
        private UserRepository userRepository;

        @Override
        public boolean supports(Class<?> aClass) {
            return User.class.equals(aClass);
        }

        @Override
        public void validate(Object o, Errors errors) {
            User user = (User) o;

            System.out.println("validating: " + user);
            ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "NotEmpty");
            if (user.getUsername().length() < 6 || user.getUsername().length() > 32) {
                errors.rejectValue("username", "Size.form-register.username");
            }
            if (userRepository.findByUsername(user.getUsername()) != null) {
                errors.rejectValue("username", "Duplicate.form-register.username");
            }

            ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "NotEmpty");
            if (user.getPassword().length() < 6 || user.getPassword().length() > 32) {
                errors.rejectValue("password", "Size.form-register.password");
            }

            if (!user.getPasswordConfirm().equals(user.getPassword())) {
                errors.rejectValue("passwordConfirm", "Diff.form-register.passwordConfirm");
            }
        }

    public ArrayList<String> validateAddUser(User user, Info info) {
        System.out.println("validating: " + user.getUsername());
        ArrayList<String> errorMap = validateAddInfo(info);//validate info

        if (user.getUsername().length() < 6 || user.getUsername().length() > 32) {
            errorMap.add("Username must be between 6 and 32 characters.");
        }
        if (userRepository.findByUsername(user.getUsername()) != null) {
            errorMap.add("Someone already has that username");
        }

        if (user.getPassword().length() < 6 || user.getPassword().length() > 32) {
            errorMap.add("Password must be at least 6 characters");
        }

        return errorMap;
    }

    public ArrayList<String> validateEditUser(User user, Info info) {
        System.out.println("validating: " + user.getUsername());
        ArrayList<String> errorMap = validateAddInfo(info);//validate info

        if (user.getUsername().length() < 6 || user.getUsername().length() > 32) {
            errorMap.add("Username must be between 6 and 32 characters.");
        }
        if (userRepository.findByUsernameAndIdNot(user.getUsername(), user.getId()) != null) {
            User user1 = userRepository.findByUsernameAndIdNot(user.getUsername(), user.getId());
            System.out.println("User " + user1.getUsername() + " with id " + user1.getId());
            System.out.println("Same as User " + user.getUsername() + " with id " + user.getId());

            errorMap.add("Someone already has that username");
        }

        if (user.getPassword().length() < 6 || user.getPassword().length() > 64) {
            System.out.println("Validating password: " + user.getPassword().length());
            errorMap.add("Password must be at least 6 characters");
        }

        return errorMap;
    }

    public ArrayList<String> validateAddInfo(Info info) {
        ArrayList<String> errorMap = new ArrayList<>();

        if (info.getWeeklyHours() < 0 || info.getCompletedHours() < 0 || info.getGPA() < 0) {
            errorMap.add("Hours cant be negative");
        }

        if (info.getGPA() < 0 || info.getGPA() > 4) {
            errorMap.add("GPA should be between 0.0 - 4.0");
        }

        return errorMap;
    }
}

