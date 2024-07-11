use octocrab::{models::{repos::RepoCommit, Repository}, Octocrab};
use rocket::{response::{status::NotFound, Redirect}, routes, serde::json::Json, Build, Rocket};

use crate::config::{
    github_access_token,
    github_user,
};

pub fn mount(rck: Rocket<Build>) -> Rocket<Build> {
    rck.mount("/github", routes![
        list_commits,
        list_commits_this,
        repository,
        repository_this,
    ])
}

#[rocket::get("/<repo>")]
async fn repository(repo: &str) -> Result<Json<Repository>, NotFound<String>> {
    match get_one_repository(repo).await {
        Some(r) => Ok(Json(r)),
        None    => Err(NotFound("repository not found".to_string()))
    }
}

#[rocket::get("/this")]
async fn repository_this() -> Json<Repository> {
    let repo = env!("CARGO_PKG_NAME");
    let found = client()
        .repos(github_user(), repo)
        .get()
        .await
        .expect("Projects repository must exist");
    Json(found)
}

#[rocket::get("/<repo>/commits?<page>", rank = 2)]
async fn list_commits(repo: &str, page: Option<u32>) -> Result<Json<Vec<RepoCommit>>, NotFound<String>> {
    let repo = match get_one_repository(repo).await {
        Some(r) => r,
        None    => return Err(NotFound("repository not found".to_string()))
    };

    let commits = client()
        .repos(github_user(), repo.name)
        .list_commits()
        .branch("main")
        .page(page.unwrap_or(1))
        .send()
        .await;

    match commits {
        Ok(c)  => Ok(Json(c.items)),
        Err(e) => Err(NotFound(e.to_string()))
    }
}

#[rocket::get("/this/commits?<page>", rank = 1)]
async fn list_commits_this(page: Option<u32>) -> Redirect {
    let repo = env!("CARGO_PKG_NAME");
    let uri  = match page {
        Some(p) => format!("/github/{repo}/commits?page={p}"),
        None    => format!("/github/{repo}/commits")
    };
    Redirect::permanent(uri)
}

fn client() -> Octocrab {
    Octocrab::builder()
        .personal_token(github_access_token())
        .build()
        .expect("Must be able to construct GitHub client")
}

async fn get_one_repository(repo: &str) -> Option<Repository> {
    let found = client()
        .repos(github_user(), repo)
        .get()
        .await;

    match found {
        Ok(r) if r.visibility.as_ref().is_some_and(|v| v == "public") => Some(r),
        Err(_) => {
            log::error!("could not get repository `{repo}` from GitHub");
            None
        },
        _ => None
    }
}
