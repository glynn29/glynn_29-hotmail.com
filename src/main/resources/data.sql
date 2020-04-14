INSERT INTO `role`( `role`) VALUES ("ROLE_ADMIN");
INSERT INTO `role`( `role`) VALUES ("ROLE_PROCTOR");
INSERT INTO `role`( `role`) VALUES ("ROLE_USER");

INSERT INTO `user`( `enabled`, `password`, `username`) VALUES (true, "$2a$10$0Gdl4wkmMSDDMjMAh9/PI.MVydfp0izSJx1tWDX3AP39xme0j1yWu","admin");
INSERT INTO `user`( `enabled`, `password`, `username`) VALUES (true, "$2a$10$gepQI61frUHCsEpXSy4w4urVyEYJUc5qRz7S4/FifF4H84paT9dFu", "bob");
INSERT INTO `user`( `enabled`, `password`, `username`) VALUES (true, "$2a$10$Q6oOO4VHCSinAG16bbZeZe0Qh0Qrh7HEcL8OZt8bgLZdZbkyveKbi","user");

INSERT INTO `user_role`(`user_id`, `role_id`) VALUES (1,1);
INSERT INTO `user_role`(`user_id`, `role_id`) VALUES (2,2);
INSERT INTO `user_role`(`user_id`, `role_id`) VALUES (3,3);

INSERT INTO `info`(`gpa`, `completed_hours`, `weekly_hours`, `user_info_id`) VALUES (4.0,'00:00:00','03:00:00', 1);
INSERT INTO `info`(`gpa`, `completed_hours`, `weekly_hours`, `user_info_id`) VALUES (2.0,'00:30:00','02:00:00', 2);
INSERT INTO `info`(`gpa`, `completed_hours`, `weekly_hours`, `user_info_id`) VALUES (1.0,'01:00:00','04:00:00', 3);
