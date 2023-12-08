// 1. 初始化 controller
// 2. 用程序注册 logto user postRegister webhook ？如果不存在的话
import { IncomingHttpHeaders } from 'http';
import {MonoSystem,Controller, startServer, SQLiteDB} from "@interaqt/runtime";
import { entities, relations, interactions } from './app/leaveRequestSimple.js'
import {apis, createInitialData} from "./data.js";
import {port} from "./config.js";

const system = new MonoSystem()
const controller = new Controller(system, entities, relations, [], interactions, [])
await controller.setup(true)
await createInitialData(controller)

startServer(controller, {
    port,
    parseUserId: async (headers: IncomingHttpHeaders) => {
        return headers['x-user-id'] as string
    }
}, apis)
