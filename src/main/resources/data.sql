INSERT INTO `role`( `role`) VALUES ("ROLE_ADMIN");
INSERT INTO `role`( `role`) VALUES ("ROLE_PROCTOR");
INSERT INTO `role`( `role`) VALUES ("ROLE_USER");

INSERT INTO `user`( `enabled`, `password`, `username`, `proctor_id`) VALUES (true, "$2a$10$0Gdl4wkmMSDDMjMAh9/PI.MVydfp0izSJx1tWDX3AP39xme0j1yWu","admin",1);
INSERT INTO `user`( `enabled`, `password`, `username`,`proctor_id`) VALUES (true, "$2a$10$gepQI61frUHCsEpXSy4w4urVyEYJUc5qRz7S4/FifF4H84paT9dFu", "bob",1);
INSERT INTO `user`( `enabled`, `password`, `username`,`proctor_id`) VALUES (true, "$2a$10$Q6oOO4VHCSinAG16bbZeZe0Qh0Qrh7HEcL8OZt8bgLZdZbkyveKbi","user",2);

INSERT INTO `user_role`(`user_id`, `role_id`) VALUES (1,1);
INSERT INTO `user_role`(`user_id`, `role_id`) VALUES (2,2);
INSERT INTO `user_role`(`user_id`, `role_id`) VALUES (3,3);

INSERT INTO `info`(`gpa`, `completed_hours`, `weekly_hours`,  `user_info_id`) VALUES (4.0, 0, 360, 1);
INSERT INTO `info`(`gpa`, `completed_hours`, `weekly_hours`, `user_info_id`) VALUES (2.0, 0, 120, 2);
INSERT INTO `info`(`gpa`, `completed_hours`, `weekly_hours`, `user_info_id`) VALUES (1.0, 0, 60, 3);
