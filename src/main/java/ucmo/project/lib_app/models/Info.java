package ucmo.project.lib_app.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;

@Entity
@Table(name = "info")
public class Info {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_info_id", referencedColumnName = "id")
    private User user;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    //@JsonFormat(pattern = "hh:mm:ss")
    @JsonFormat(pattern = "HH:mm")
    @Column(nullable = false)
    @NotNull
    LocalTime weeklyHours;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @JsonFormat(pattern = "HH:mm")
    //@JsonFormat(pattern = "hh:mm:ss")
    LocalTime completedHours;

    @Column(nullable = false,  precision = 2, scale = 2)
    @NotNull
    Float GPA;


    public Info() { }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalTime getWeeklyHours() {
        return weeklyHours;
    }

    public void setWeeklyHours(LocalTime weeklyHours) {
        this.weeklyHours = weeklyHours;
    }

    public LocalTime getCompletedHours() {
        return completedHours;
    }

    public void setCompletedHours(LocalTime completedHours) {
        this.completedHours = completedHours;
    }

    public Float getGPA() {
        return GPA;
    }

    public void setGPA(Float GPA) {
        this.GPA = GPA;
    }
}
