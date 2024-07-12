import { ReactElement } from "react";
import { Image } from "react-bootstrap";

export class Link {
    name:  string;
    href:  string;
    icon?: string;

    static from(that: Link) {
        return new Link(that.name, that.href, that.icon)
    }

    constructor(name: string, href: string, icon?: string) {
        this.name = name;
        this.href = href;
        this.icon = icon;
    }

    intoElement(raw: boolean = false): ReactElement {
        let content = <>{this.name}</>;
        if (this.icon !== undefined && !raw) {
            content = (
                <Image
                    src={this.icon}
                    id="link-icon"
                    className="vlb-icon"
                    alt={this.name}
                />
            )
        }
        return (
            <a href={this.href} target="_blank" rel="noreferrer">{content}</a>
        )
    }
}
