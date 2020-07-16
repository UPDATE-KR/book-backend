import { Auth } from "@prisma/client"

export class User {
    id: number
    email: string
    username: string
    nickname: string | null
    createdAt: Date
    updatedAt: Date

    static of(auth: Auth): User {
        const user = new User();
        user.id = auth.id;
        user.email = auth.email;
        user.username = auth.username;
        user.nickname = auth.nickname;
        user.createdAt = auth.createdAt;
        user.updatedAt = auth.updatedAt;

        return user;
    }
}