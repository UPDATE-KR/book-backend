# Migration `20200724005954`

This migration has been generated at 7/24/2020, 12:59:54 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `book`.`Book` ADD COLUMN `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ,
ADD COLUMN `updatedAt` datetime(3) NOT NULL  ;

ALTER TABLE `book`.`Note` MODIFY `contents` varchar(191) NOT NULL  DEFAULT '';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200723235132..20200724005954
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -43,16 +43,20 @@
   title   String
   user    User    @relation(references: [id], fields: [userId])
   userId  Int
   private Boolean @default(false)
-  notes   Note[]
+
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+
+  notes Note[]
 }
 model Note {
   id        Int      @default(autoincrement()) @id
   userId    Int
   bookId    Int?
-  contents  String
+  contents  String   @default("")
   private   Boolean  @default(false)
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
```


