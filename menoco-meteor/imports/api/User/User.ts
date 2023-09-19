declare module "meteor/meteor" {
    namespace Meteor {
        interface User {
            /**
             * Extending the User type
             */
            authRoles?: Array<string>
            subscription?: {
                totalAPIRequests?: number,
                planId?: string,
                isPlanCurrent?: boolean,
                stripe?: object // here we store different bs stripe sends us
            }
            profile?: {
                name?: string
            }

        }
    }
}