# Migration `20200717215556`

This migration has been generated at 7/17/2020, 9:55:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `book`.`Auth` (
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`email` varchar(191) NOT NULL  ,
`id` int NOT NULL  AUTO_INCREMENT,
`lastLoggedIn` datetime(3)   ,
`password` varchar(191) NOT NULL  ,
`updatedAt` datetime(3) NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `book`.`User` (
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`email` varchar(191) NOT NULL  ,
`id` int NOT NULL ,
`nickname` varchar(191)   ,
`updatedAt` datetime(3) NOT NULL  ,
`username` varchar(191) NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `book`.`Book` (
`id` int NOT NULL  AUTO_INCREMENT,
`title` varchar(191) NOT NULL  ,
`userId` int NOT NULL ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE TABLE `book`.`Note` (
`bookId` int NOT NULL ,
`contents` varchar(191) NOT NULL  ,
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`id` int NOT NULL  AUTO_INCREMENT,
`updatedAt` datetime(3) NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `Auth.email` ON `book`.`Auth`(`email`)

CREATE UNIQUE INDEX `User.email` ON `book`.`User`(`email`)

ALTER TABLE `book`.`User` ADD FOREIGN KEY (`id`) REFERENCES `book`.`Auth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `book`.`Book` ADD FOREIGN KEY (`userId`) REFERENCES `book`.`User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `book`.`Note` ADD FOREIGN KEY (`bookId`) REFERENCES `book`.`Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200717215556
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,55 @@
+// pretier-ignore-start
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "mysql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Auth {
+  id       Int    @default(autoincrement()) @id
+  email    String @unique
+  password String
+
+  lastLoggedIn DateTime?
+
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  User      User[]
+}
+
+model User {
+  id    Int    @id
+  email String @unique
+
+  username String
+  nickname String?
+
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+
+  auth Auth   @relation(references: [id], fields: [id])
+  Book Book[]
+}
+
+model Book {
+  id     Int    @default(autoincrement()) @id
+  title  String
+  user   User   @relation(references: [id], fields: [userId])
+  userId Int
+  notes  Note[]
+}
+
+model Note {
+  id        Int      @default(autoincrement()) @id
+  book      Book     @relation(fields: [bookId], references: [id])
+  bookId    Int
+  contents  String
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
```


