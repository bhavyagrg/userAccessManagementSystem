import { UserDao } from '../dao/userDao';
import bcrypt from 'bcryptjs';
import { User } from '../entities/User';
import { USER_ROLES } from '../constants/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    async signup(data: { username: string; password: string }): Promise<User> {
        // Hash the password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create user with default role Employee
        const user = new User();
        user.username = data.username;
        user.password = hashedPassword;

        // Save user to database
        return await this.userDao.saveUser(user);
    }

    async login(data: { username: string; password: string }): Promise<{ jwtToken: string; role: USER_ROLES }> {

        const user = await this.userDao.findUserByUsername(data.username);

        if(!user)
        {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY is not configured in environment variables');
        }

        const jwtToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY as string);

        return { jwtToken: jwtToken, role: user.role };
    }

}
