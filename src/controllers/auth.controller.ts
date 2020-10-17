import { validate } from 'class-validator';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { User } from '../database/models/user.model';
import { JWT_ACCESS_SECRET } from '../environments';

class AuthController {
    static register = async (req: Request, res: Response) => {
        let { username, password } = req.body;

        // Verify if body exists
        if (!(username && password)) {
            return res.status(400).send({ "message": "Failed to register user" });
        }

        try {
            // Verify if user already exists
            let user = await getRepository(User).findOne({ username: `${username}` }).catch(err => {
                throw new Error(err);
            });
            if (user) {
                return res.status(404).send({ "message": "Failed to register user" });
            }

            // Create new user
            const userRepository = getRepository(User);
            const newUser = new User;
            newUser.username = username;
            newUser.password = password;
            newUser.role = "USER";

            // Validate new user
            const errors = await validate(newUser);
            if (errors.length > 0) {
                return res.status(400).send(errors);
            }

            // Save user in database
            await userRepository.save(newUser).then(user => {
                delete user.role;
                delete user.password;
                return res.status(200).send(user);
            });

        } catch (err) {
            return res.status(404).send({ "message": "Failed to register user" });
        }
    };

    static login = async (req: Request, res: Response) => {
        let { username, password } = req.body;

        // Verify if body exists
        if (!(username && password)) {
            return res.status(400).send({ "message": "Failed to login" });
        }

        try {
            // Verify if user already exists
            const userRepository = getRepository(User);
            let user = await userRepository.findOneOrFail({ where: { username } }).catch(err => {
                throw new Error(err);
            })
            if (!user) {
                return res.status(400).send({ "message": "Failed to login" });
            }

            // Verify password
            if (!(await user.checkPassword(password))) {
                return res.status(400).send({ "message": "Failed to login" });
            }

            // Create jwt token
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                JWT_ACCESS_SECRET,
                { expiresIn: "7d" }
            );

            return res.status(200).send({ "token": token });

        } catch (err) {
            return res.status(400).send({ "message": "Failed to login" });
        }
    };

    static changePassword = async (req: Request, res: Response) => {
        const { username, oldPassword, newPassword } = req.body;

        // Verify if body exists
        if (!(username && oldPassword && newPassword)) {
            res.status(400).send();
        }

        try {
            // Verify if user exists
            const userRepository = getRepository(User);
            let user = await userRepository.findOneOrFail({ where: { username } }).catch(err => {
                throw new Error(err);
            })
            if(!user){
                return res.status(401).send({ "message": "Failed to change password" });
            }

            // Verify password
            if (!user.checkPassword(oldPassword)) {
                return res.status(401).send({ "message": "Failed to change password" });
            }

            // Assign new password
            user.password = newPassword;

            // Validate new user
            const errors = await validate(user);
            if (errors.length > 0) {
                return res.status(400).send(errors);
            }

            // Save user in database
            await userRepository.save(user);

            return res.status(204).send({ "message": "Successfully changed password" });
        } catch (err) {
            return res.status(400).send({ "message": "Failed to change password" });
        }
    };
}
export default AuthController;