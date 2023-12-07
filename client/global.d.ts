import{createElement, Context} from 'axii'

export type Props = {
    [k: string]: any,
    children?: ChildNode[]
}

export type EffectHandle = () => (void | (() => void))

type InjectHandles = {
    createElement: typeof createElement,
    useLayoutEffect: (arg: EffectHandle) => void
    ref: {
        [k: string]: HTMLElement
    },
    context: Context
}

export type Component = (props?: Props, injectHandles?: InjectHandles) => HTMLElement|Text|DocumentFragment|null|undefined|string|number|Function|JSX.Element
export type ComponentNode = {
    type: Component,
    props : Props,
    children: any
}

declare global {
    var __DEV__: boolean
    namespace JSX {
        interface IntrinsicElements {
            // allow arbitrary elements
            // @ts-ignore suppress ts:2374 = Duplicate string index signature.
            [name: string]: any
        }
        interface Element extends  ComponentNode {}
    }
}