"use server";
import { currentUser } from "@clerk/nextjs/server";

export default async function ClerkDetails() {
  const user = await currentUser();
}
