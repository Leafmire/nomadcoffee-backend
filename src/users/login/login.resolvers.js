import client from '../../client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
    Mutation: {
        login: async (_, {username, password}) => {
            // find user with argument
            const user = await client.user.findFirst({where: {username}})
            if (!user) {
                return {
                    ok: false,
                    error: "User not found."
                };
            }
            // check password
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Wrong password."
                };                
            }
            // send token
            const token = await jwt.sign({id:user.id, username}, process.env.SECRET_KEY);
            return {
                ok: true,
                token: token
            }
        }
    },
};