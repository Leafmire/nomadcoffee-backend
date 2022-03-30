import client from "../client"
import bcrypt from "bcrypt"

export default {
	Mutation: {
		createAccount: async (_, { username, password, name, email }) => {
			// check if username and email are duplicated
			const existingUser = await client.user.findFirst({
				where: {
					OR: [
						{
							username
						},
						{
							email
						}
					]
				}
			});
			if (existingUser) {
				return {
					ok:false,
					error: "This username/email already exist."
				}
			}
			else {
				// hash password
				const hashPassword = await bcrypt.hash(password, 10);
				const makeUser = await client.user.create({
					data: {
						username,
						password: hashPassword,
						name,
						email,
					}
				});
				if (makeUser.id) {
					return {
						ok: true
					}
				} else {
					return {
						ok: false,
						error: "Could not create account."
					}
				}
			}
		},
	}
};