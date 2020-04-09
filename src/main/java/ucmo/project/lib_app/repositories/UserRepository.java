package ucmo.project.lib_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ucmo.project.lib_app.models.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    List<User> findByRoles_Id(Integer id);
}
