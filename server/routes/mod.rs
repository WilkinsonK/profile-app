use rocket::{Build, Rocket};

mod github;
mod index;

type Mounter = fn(Rocket<Build>) -> Rocket<Build>;
const MOUNTERS: &[Mounter] = &[
    index::mount,
    github::mount,
];

pub fn mount_all(mut rck: Rocket<Build>) -> Rocket<Build> {
    for m in MOUNTERS {
        rck = (m)(rck)
    }
    rck
}
