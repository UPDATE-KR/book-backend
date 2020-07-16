# Migration `20200714214628`

This migration has been generated at 7/14/2020, 9:46:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `book`.`Auth` (
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
`email` varchar(191) NOT NULL  ,
`id` int NOT NULL  AUTO_INCREMENT,
`lastLoggedIn` datetime(3)   ,
`nickname` varchar(191)   ,
`password` varchar(191) NOT NULL  ,
`updatedAt` datetime(3) NOT NULL  ,
`username` varchar(191) NOT NULL  ,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

CREATE UNIQUE INDEX `Auth.email` ON `book`.`Auth`(`email`)

DROP TABLE `book`.`User`;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200714212949..20200714214628
--- datamodel.dml
+++ datamodel.dml
@@ -2,16 +2,16 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
-model User {
+model Auth {
   id Int @default(autoincrement()) @id
   email String @unique
   password String
   username String
```


