package ucmo.project.lib_app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ucmo.project.lib_app.models.Organization;

public interface OrganizationRepository extends JpaRepository<Organization, Integer> {
}
