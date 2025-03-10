
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `compte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
    `username` VARCHAR(255),
    `email` VARCHAR(255),
    `title` VARCHAR(255),
    `password` VARCHAR(255) NOT NULL,
    `user_id` INTEGER NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
        ON UPDATE NO ACTION ON DELETE NO ACTION
);
