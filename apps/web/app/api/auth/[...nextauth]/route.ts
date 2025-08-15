import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
// Passkeys provider scaffold placeholder

export const authOptions = {
	session: {
		strategy: 'jwt' as const,
	},
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER as string,
			from: process.env.EMAIL_FROM as string,
		}),
		// Add passkeys provider when available or custom credential flow
	],
	pages: {
		signIn: '/auth/sign-in',
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };