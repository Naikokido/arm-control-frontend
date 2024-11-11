import { UserDatasourceImpl, UserRepositoryImpl } from '../../infrastructure';
import { CreateUser,
 DeleteUserById, GetUserById, GetUsers,
  UpdateUser,
} from '../../domain';

const userDatasourceImpl = new UserDatasourceImpl();
const userRepositoryImpl = new UserRepositoryImpl(userDatasourceImpl);

export const getUsers = new GetUsers(userRepositoryImpl);
export const getUserById = new GetUserById(userRepositoryImpl);
export const createUser = new CreateUser(userRepositoryImpl);
export const updateUser = new UpdateUser(userRepositoryImpl);
export const deleteUserById = new DeleteUserById(userRepositoryImpl);
