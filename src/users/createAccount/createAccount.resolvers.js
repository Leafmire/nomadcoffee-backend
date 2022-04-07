import client from '../../client';
import bcrypt from 'bcrypt';

export default {
    Mutation: {
        createAccount: async (_, { username, password, name, email }) =>
        {
            try {
                            // check if username or email already exist
            const existingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {username},
                        {email},
                    ],
                }
            });
            if (existingUser) {
                throw new Error("This username/email is already exist.");
            }
            // hash password
            const uglyPassword = await bcrypt.hash(password, 10);
            // save and return user
            await client.user.create({ data: {
                username,
                password: uglyPassword,
                name,
                email,
                },
            });
            return {
                ok: true
            }
            } catch (e) {
                return {
                    ok: false,
                    error: "Can not create account"
                }
            }
        },
    }
}