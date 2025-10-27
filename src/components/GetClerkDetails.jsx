"use server";
import { currentUser } from "@clerk/nextjs/server";

export async function getClerkDetails() {
  const user = await currentUser();
  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    email: user.emailAddresses?.[0]?.emailAddress,
    imageUrl: user.imageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}
