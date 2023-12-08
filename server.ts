import { IncomingHttpHeaders } from 'http';
import {MonoSystem,Controller, startServer, SQLiteDB} from "@interaqt/runtime";
import { entities, relations, interactions } from './app/leaveRequestSimple.js'
import {apis, createInitialData} from "./data.js";
import {port} from "./config.js";

const db = new SQLiteDB('database.db')
const system = new MonoSystem(db)
const controller = new Controller(system, entities, relations, [], interactions, [])
await controller.setup()
await createInitialData(controller)

startServer(controller, {
    port,
    parseUserId: async (headers: IncomingHttpHeaders) => {
        return headers['x-user-id'] as string
    }
}, apis)
