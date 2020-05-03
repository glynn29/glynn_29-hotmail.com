package ucmo.project.lib_app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    @NotEmpty
    private String username;

    @Column(nullable = false)
    @NotEmpty
    private String password;

    @Transient
    private String passwordConfirm;

    //private String organization;
    @ManyToOne(targetEntity = Organization.class)
    //@JoinColumn(name = "organization_id", referencedColumnName = "id")
    private Organization organization;

    private boolean enabled;

    private Integer proctorId;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "user_role", joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")}, inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "id")})
    private Set<Role> roles;

    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Info info;

    public User(){}

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, boolean enabled, Set<Role> roles) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.roles = roles;
    }

    public Integer getProctorId() {
        return proctorId;
    }

    public void setProctorId(Integer proctorId) {
        this.proctorId = proctorId;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

//    public String getOrganization() {
//        return organization;
//    }
//
//    public void setOrganization(String organization) {
//        this.organization = organization;
//    }


    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Info getInfo() {
        return info;
    }

    public void setInfo(Info info) {
        this.info = info;
    }

    public void SetOrganization_id(Integer id){
        this.organization.setId(id);
    }
}
