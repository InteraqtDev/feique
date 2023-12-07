import {Controller, DataAPIThis, createDataAPI} from "@interaqt/runtime";
import {BoolExp} from "@interaqt/shared";

export async function createInitialData(controller: Controller) {
    const system = controller.system
    const userARef = await system.storage.create('User', {name: 'A'})
    const userBRef = await system.storage.create('User', {name: 'B', supervisor: userARef})
    const userCRef = await system.storage.create('User', {name: 'C', supervisor: userBRef})
}



export const apis = {
    getUsers: createDataAPI(function getUsers(this: DataAPIThis) {
        return this.system.storage.find('User', undefined, undefined, ['*'])
    }, { allowAnonymous: true }),
    getRequestById: createDataAPI(function getRequestById(this: DataAPIThis, id: string) {
        const match = BoolExp.atom({
            key: 'id',
            value: ['=', id]
        })
        return this.system.storage.findOne('Request', match, undefined, ['*'])
    }, { params: ['string']})
}
