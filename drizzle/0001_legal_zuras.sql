ALTER TABLE `user` DROP INDEX `unique_username_password`;--> statement-breakpoint
ALTER TABLE `compte` ADD `title` varchar(255);--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_username_unique` UNIQUE(`username`);