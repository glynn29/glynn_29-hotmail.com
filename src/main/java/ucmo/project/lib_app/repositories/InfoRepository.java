package ucmo.project.lib_app.repositories;

import ucmo.project.lib_app.models.Info;
import org.springframework.data.jpa.repository.JpaRepository;
import ucmo.project.lib_app.models.User;

public interface InfoRepository extends JpaRepository<Info, Integer> {
    Info findByUser(User user);
}
