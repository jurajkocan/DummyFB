export namespace WebConfig {
    const min = 1000 * 60;
    const hour = min * 60;
    export namespace SessionConfiguration {
        /**
         * Secret for generate Jwt
         */
        export const SessionSecret: string = 'SessionSecret192168';
        /**
         * Expire timeout in milliseconds
         */
        export const ExpireLoginSession: number = hour;
    }

    export namespace JWT {
        export const JwtSecret: string = 'JwtSecret192168';
        /**
         * @description ((((60 == min) * 60 == hour) * 24 == day) * 7 == week)
        */
        export const JwtExpiration: number = 60 * 60 * 24 * 7
    }
}
