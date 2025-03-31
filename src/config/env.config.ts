

export const envConfig = () => ({
    port: process.env.PORT || 3002,
    postgres_url: process.env.POSTGRES_URL,
    postgres_user: process.env.POSTGRES_USER,
    postgres_password: process.env.POSTGRES_PASSWORD,
    postgres_db: process.env.POSTGRES_DB,
})