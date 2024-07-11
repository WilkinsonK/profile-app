use rocket::{Build, Rocket};

pub fn mount(rck: Rocket<Build>) -> Rocket<Build> {
    rck
}
