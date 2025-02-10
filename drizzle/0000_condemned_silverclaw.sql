CREATE TABLE `compte` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255),
	`email` varchar(255),
	`password` varchar(255) NOT NULL,
	`user_id` bigint unsigned,
	CONSTRAINT `compte_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `compte` ADD CONSTRAINT `compte_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;