
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("better-auth-db");

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword:async({ user, url, token })=>{
            void resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,  
                subject: "Reset your password",
                html: `
                    <h1>Reset your password</h1>
                    <p>
                        Click <a href="${url}">here</a>
                        to reset your password.
                    </p>
                `,     
            })
        }
    },

    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            console.log("Sending email to:", user.email);

            const { data, error } = await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Verify your email address",
                html: `
                    <h1>Please Verify your email address</h1>
                    <p>
                        Click <a href="${url}">here</a>
                        to verify your email.
                    </p>
                `,
            });

            if (error) {
                console.error("Resend Error:", error);
                throw new Error(error.message);
            }

            console.log("Email sent successfully:", data);
        },

        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 7 * 24 * 3600,
    },

    socialProviders: {
        google: {
            clientId: process.env.BETTER_AUTH_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_CLIENT_SECRET,
        },
        github: {
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
});
