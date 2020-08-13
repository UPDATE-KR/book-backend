# BOOK

## TODO:

1. `Prisma`
   1. `Transaction` 기능 추가 (Prisma에서 지원하지 않는 기능)
   2. `MariaDB`에서 `Text` 타입 추가 (Prisma에서 지원하지 않는 기능)
2. Test Case 작성

## How to run?

This project developed with [prisma2](https://www.prisma.io)

### Require
1. MariaDB or Mysql

So, you must install prisma
```
> yarn global add @prisma/cli
or
> npm install -g @prisma/cli

and

> prisma migrate up --experimental
# This will be make a tables in database.
```
Database is done.

### Preinstall
```bash
> npm i
or
> yarn
```

### Environments setting
Please run
```bash
> cp .env.template .env
```
and fill up this settings.

and also prisma/.env.template too.

### Run application
```
> npm start
or
> yarn start
```