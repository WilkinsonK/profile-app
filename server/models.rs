use rocket::serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ContactItem {
    availability: Vec<String>,
    email:        String,
    full_name:    String,
    links:        Vec<Link>,
    phone:        String,
    title:        String,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase", crate = "rocket::serde")]
pub struct FAQItem {
    question: String,
    answer:   String,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(rename_all = "camelCase", crate = "rocket::serde")]
pub struct Link {
    name: String,
    href: String,
}
