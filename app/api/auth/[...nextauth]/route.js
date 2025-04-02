import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db';
import dotenv from 'dotenv';
dotenv.config();

export const authOptions = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { username, password } = credentials;

                try {
                    const client = await dbConnect();
                    const db = client.db();
                    const usersCollection = db.collection('users');

                    const user = await usersCollection.findOne({ username });
                    console.log(user); // Agregado para depuración

                    if (!user) {
                        return null; // Usuario no encontrado
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (!passwordMatch) {
                        return null; // Contraseña incorrecta
                    }

                    return {
                        id: user._id.toString(),
                        name: user.username,
                        email: user.email,
                        userType: user.userType,
                    };
                } catch (error) {
                    console.error('Error durante la autenticación:', error);
                    return null; // Manejar errores de la base de datos
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userType = user.userType;
                token.sub = user.id; // Añadido para pasar el id al token
            }
            console.log('JWT Token:', token);
            return token;
        },
        async session({ session, token }) {
            session.user.userType = token.userType;
            session.user.id = token.sub; // Añadido para pasar el id a la sesión
            console.log('Session:', session);
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt', // Usar JWT para las sesiones
    },
    useSecureCookies: process.env.NODE_ENV === 'production', // Cookies seguras en producción
    cookie: {
        name: 'next-auth.session-token',
        maxAge: 30 * 24 * 60 * 60, // 30 días
        sameSite: 'Lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };