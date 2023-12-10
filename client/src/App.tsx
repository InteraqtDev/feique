import {atom, computed, InjectHandles} from 'axii'
import {post} from './post';

/* @jsx createElement */
export function App({}, { createElement }: InjectHandles) {

    const createdRequestId = atom(null)
    const request = atom(null)
    const userA = atom(null)
    const userB = atom(null)
    const userC = atom(null)


    const getUsers = () => {
        return post('/data/getUsers', [], '')
    }

    getUsers().then(users => {
        userA(users.find((u:any) => u.name === 'A'))
        userB(users.find((u:any) => u.name === 'B'))
        userC(users.find((u:any) => u.name === 'C'))
    })

    const getRequest = async() => {
        request(await post('/data/getRequestById', [createdRequestId()!], userA.id))
    }


    const sendLeaveRequestAsUserC = async () => {
        const response= await post('/api',{
            interaction: 'createRequest',
            payload: {
                request: {
                    reason: 'i need a vacation',
                }
            }
        }, userC()?.id)
        createdRequestId(response.event.args.payload.request.id)
        await getRequest()
    }

    const approveRequestAsUserB = async() => {
        await  post('/api',{
            interaction: 'approve',
            payload: {
                request: {
                    id: request()?.id
                }
            }
        }, userB()?.id)
        await getRequest()
    }

    const approveRequestAsUserA = async() => {
        await post('/api',{
            interaction: 'approve',
            payload: {
                request: {
                    id: request()?.id
                }
            }
        }, userA()?.id)
        await getRequest()
    }


    return <div className="h-full">
        <div className="lg:ml-full-menu sm:ml-mini-menu flex flex-col h-full">
            <div>
                <div>userA:{() => userA()?.id}</div>
                <div>userB:{() => userB()?.id}</div>
                <div>userC:{() => userC()?.id}</div>
            </div>
            <button onClick={sendLeaveRequestAsUserC}>
                create request as user c
            </button>
            <button onClick={approveRequestAsUserB}>
                approve as user b
            </button>
            <button onClick={approveRequestAsUserA}>
                approve as user a
            </button>
            <div>
                <div>request id: {createdRequestId}</div>
                <div>request result: {() => request()?.result}</div>
            </div>
        </div>
    </div>
}