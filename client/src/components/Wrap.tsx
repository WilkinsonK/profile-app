/**
 * Dummy wrapper surrounds it's children without
 * affecting the render. Allows for rendered items
 * to have properties like `key` available to
 * `React`.
 */
export default function Wrap(props: { key?: string, children: any[] }) {
    return <>{props.children}</>
}
