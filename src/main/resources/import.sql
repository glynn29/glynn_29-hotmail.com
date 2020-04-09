INSERT INTO `role`( `role`) VALUES ("ROLE_ADMIN");
INSERT INTO `role`( `role`) VALUES ("ROLE_PROCTOR");
INSERT INTO `role`( `role`) VALUES ("ROLE_USER");

INSERT INTO `user`( `enabled`, `password`, `username`) VALUES (true, "$2a$10$0Gdl4wkmMSDDMjMAh9/PI.MVydfp0izSJx1tWDX3AP39xme0j1yWu","admin");#admin
INSERT INTO `user`( `enabled`, `password`, `username`) VALUES (true, "$2a$10$TpVK.idJW9Ycqmz.1DhtNOAxJ4TlAWP9wP7S59pzzD9uT3YRkeCEK", "bob");#poop
INSERT INTO `user`( `enabled`, `password`, `username`) VALUES (true, "$2a$10$Q6oOO4VHCSinAG16bbZeZe0Qh0Qrh7HEcL8OZt8bgLZdZbkyveKbi","user");#user

INSERT INTO `user_role`(`user_id`, `role_id`) VALUES (1,1);
INSERT INTO `user_role`(`user_id`, `role_id`) VALUES (2,2);
INSERT INTO `user_role`(`user_id`, `role_id`) VALUES (3,3);

#INSERT INTO `info`(`gpa`, `completed_hours`, `weekly_hours`, `user_info_id`) VALUES (3,0,4,3)
# DROP DATABASE IF EXISTS checkin;
# CREATE DATABASE checkin;
# USE checkin;
#