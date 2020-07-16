# Migration `20200715195638`

This migration has been generated at 7/15/2020, 7:56:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
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

ALTER TABLE `book`.`Book` ADD FOREIGN KEY (`userId`) REFERENCES `book`.`Auth`(`id`) ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE `book`.`Note` ADD FOREIGN KEY (`bookId`) REFERENCES `book`.`Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200714214628..20200715195638
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -20,5 +20,22 @@
   lastLoggedIn DateTime?
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
+}
+
+model Book {
+  id Int @default(autoincrement()) @id
+  title String
+  user Auth @relation(references: [id], fields: [userId])
+  userId Int
+  notes Note[]
+}
+
+model Note {
+  id Int @default(autoincrement()) @id
+  book Book @relation(fields: [bookId], references: [id])
+  bookId Int
+  contents String
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
 }
```


