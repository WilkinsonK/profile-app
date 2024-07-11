import { Children, Component } from "react";

type ComponentChildren = JSX.Element | readonly JSX.Element[] | string;

class LinkedHeaderProps {
    children?: ComponentChildren;
    href?:     string;
}

export function LinkedH1(props: LinkedHeaderProps) {
    return (
        <h1>
            <a href={props.href} className="heading-anchor-link">
                <i className="fas fa-link"></i>
            </a>
            {Children.map(props.children, child => child)}
        </h1>
    )
}

export function LinkedH3(props: LinkedHeaderProps) {
    return (
        <h3>
            <a href={props.href} className="heading-anchor-link">
                <i className="fas fa-link"></i>
            </a>
            {Children.map(props.children, child => child)}
        </h3>
    )
}

export function LinkedH5(props: LinkedHeaderProps) {
    return (
        <h5>
            <a href={props.href} className="heading-anchor-link">
                <i className="fas fa-link"></i>
            </a>
            {Children.map(props.children, child => child)}
        </h5>
    )
}

/**
 * Renders elements as having an anchor and an
 * optional `href` link associated with it.
 */
export default class Linked extends Component {
    props!: LinkedHeaderProps;

    constructor(props: LinkedHeaderProps) {
        super(props);
        this.props = props;
    }

    static H1 = LinkedH1;
    static H3 = LinkedH3;
    static H5 = LinkedH5;

    render() {
        let inner = <></>;
        if (this.props.children !== undefined) {
            inner = <>{Children.map(this.props.children, child => child)}</>;
        }
        return <Linked.H1 href={this.props.href}>{inner}</Linked.H1>
    }
}
