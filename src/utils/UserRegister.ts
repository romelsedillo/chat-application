import { account, ID } from "@/appwrite/appwrite";
import addUser from "./AddUser";

function generateRandomString(length = 20) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Generate a random string of length 20
const randomString = generateRandomString();

export const userRegister = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const response = await account.create(
      ID.custom(randomString),
      email,
      password,
      name
    );
    await account.createEmailPasswordSession(email, password);
    await addUser(randomString, name, email);

    console.log("Register successful");
  } catch (error: any) {
    console.error("error register", error.message);
  }
};
