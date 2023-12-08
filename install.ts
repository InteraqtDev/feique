import {Controller, MonoSystem, SQLiteDB} from "@interaqt/runtime";
import {entities, interactions, relations} from './app/leaveRequestSimple.js'


try {
    const db = new SQLiteDB('database.db')
    const system = new MonoSystem(db)
    const controller = new Controller(system, entities, relations, [], interactions, [])
    await controller.setup(true)

    console.log("install successfully")
} catch (e) {
    console.error(e)
    process.exit(1)
}
