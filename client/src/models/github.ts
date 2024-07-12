export class Author {
    date!:  string;
    email!: string;
    login!: string;
    name!:  string;
}

export class Commit {
    commit!: CommitInner;
}

export class CommitInner {
    author!:    Author;
    committer!: Author;
    message!:   string;
    url!:       string;
}

export class License {
    key!:     string;
    name!:    string;
    spdx_id!: string;
}

export class Readme {
    content!:  string;
    encoding!: string;
    name!:     string;
    path!:     string;
}

export class Repository {
    clone_url!:      string;
    commits:         Commit[] = [];
    default_branch!: string;
    description?:    string;
    git_url!:        string;
    html_url!:       string;
    license?:        License;
    name!:           string;
    private!:        boolean;
    ssh_url!:        string;
}
