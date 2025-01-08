import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const WHITELISTED_EMAILS = process.env.WHITELISTED_EMAILS?.split(',').map(email => email.trim()) || [];

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return user.email ? WHITELISTED_EMAILS.includes(user.email) : false;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST }; 