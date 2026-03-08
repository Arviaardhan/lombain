import { redirect } from "next/navigation";

export default async function AuthPage() {
  redirect("/auth/login"); // Redirects if data is not found or unauthenticated
}
