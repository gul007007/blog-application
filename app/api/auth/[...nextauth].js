import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

// Dummy user database (replace with a real database in production)
const users = [];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find((u) => u.email === credentials.email);
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-key",
});
