package ucmo.project.lib_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ucmo.project.lib_app.models.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}

