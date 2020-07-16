# Migration `20200714212949`

This migration has been generated at 7/14/2020, 9:29:49 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `book`.`User` (
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

CREATE UNIQUE INDEX `User.email` ON `book`.`User`(`email`)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200714212949
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,24 @@
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
+model User {
+  id Int @default(autoincrement()) @id
+  email String @unique
+  password String
+  username String
+  nickname String?
+
+  lastLoggedIn DateTime?
+
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
```


