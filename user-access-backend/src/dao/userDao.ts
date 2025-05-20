import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';

export class UserDao {
    private userRepository = AppDataSource.getRepository(User);

    async saveUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }
}