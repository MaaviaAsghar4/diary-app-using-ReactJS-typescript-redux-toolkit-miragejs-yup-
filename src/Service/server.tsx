import {Server,hasMany,belongsTo,Response,Factory, Model} from 'miragejs'

export const handleError = (error: any, message='An error occured'):Response => {
    return new Response(400,undefined,{
        data: {
            message,
            isError: true,
        }
    })
}

export const setupServer = (env?:string):Server => {
    return new Server({
        environment: env ?? 'development',

        models: {
            entry: Model.extend({
                dairy: belongsTo(),
            });
            diary: Model.extend({
                entry: hasMany(),
                user: belongsTo(),
            });
            user: Model.extend({
                diary: hasMany(),
            });
        },

        factories: {
            user: Factory.extend({
                username: 'test',
                password: 'test1234',
                email: 'test@gmail.com'
            });
        },

        seeds: (server):any => {
            server.create('user');
        },

        routes(): void {
            this.urlPrefix = 'https://diaries.app'
        }
    })
}