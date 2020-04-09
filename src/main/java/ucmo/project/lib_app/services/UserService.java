package ucmo.project.lib_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ucmo.project.lib_app.models.Role;
import ucmo.project.lib_app.models.User;
import ucmo.project.lib_app.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userName) {
        User user = userRepository.findByUsername(userName);
        if(user == null) {
            throw new UsernameNotFoundException(String.format("The username %s doesn't exist", userName));
        }
        List<GrantedAuthority> authorities = getUserAuthority(user.getRoles());
        return buildUserForAuthentication(user, authorities);
    }

    private List<GrantedAuthority> getUserAuthority(Set<Role> userRoles) {
        Set<GrantedAuthority> roles = new HashSet<>();
        for (Role role : userRoles) {
            roles.add(new SimpleGrantedAuthority(role.getRole()));
        }
        return new ArrayList<>(roles);
    }

    private UserDetails buildUserForAuthentication(User user, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                user.isEnabled(), true, true, true, authorities);
    }

}
/**
 https://hellokoding.com/registration-and-login-example-with-spring-security-spring-boot-spring-data-jpa-hsql-jsp/
 https://www.tutorialspoint.com/jsp/jstl_core_foreach_tag.htm
 https://docs.spring.io/spring-security/site/docs/current/reference/html5/#user-schema
 https://mkyong.com/spring-security/spring-security-form-login-using-database/
 https://www.javainuse.com/spring/boot_form_security
 https://www.baeldung.com/spring-boot-data-sql-and-schema-sql
 https://www.baeldung.com/spring-mvc-and-the-modelattribute-annotation
 https://spring.io/guides/gs/accessing-data-mysql/

 https://dzone.com/articles/spring-security-5-form-login-with-database-provide
 https://www.javaguides.net/2018/09/spring-boot-spring-mvc-role-based-spring-security-jpa-thymeleaf-mysql-tutorial.html
 https://dzone.com/articles/introduction-to-jpa-using-spring-boot-data-jpa
 https://hellokoding.com/jpa-one-to-many-relationship-mapping-example-with-spring-boot-maven-and-mysql/
 https://hellokoding.com/registration-and-login-example-with-spring-security-spring-boot-spring-data-jpa-hsql-jsp/
 https://www.javainuse.com/spring/boot_security_jdbc_authentication
 **/