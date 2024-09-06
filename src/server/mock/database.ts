import {users} from "./readyUsers.ts";
import {digestMessage} from "../../utils/utils.ts";

interface UsersDatabase {
  [uniqueKey: Email]: {
    email: Email,
    passwordHash: PasswordHash
  }
}

async function createMockUserDatabase(users: Map<Email, Password>) {
  const database: UsersDatabase = {}

  for (const oneUser of users.entries()) {
    const [email, password] = oneUser;
    const passwordHash = await digestMessage(password)

    database[email] = {email, passwordHash}
  }

  return database
}

const usersDatabase = await createMockUserDatabase(users)

export {usersDatabase}