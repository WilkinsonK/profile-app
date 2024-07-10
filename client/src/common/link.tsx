import { ReactElement } from "react";

export class Link {
    name: string;
    href: string;

    static from(that: Link) {
        return new Link(that.name, that.href)
    }

    constructor(name: string, href: string) {
        this.name = name;
        this.href = href;
    }

    intoElement(): ReactElement {
        return (
            <a href={this.href} target="_blank" rel="noreferrer">{this.name}</a>
        )
    }
}
