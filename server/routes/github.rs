use octocrab::{models::{repos::{Content, RepoCommit}, Repository}, Octocrab};
use rocket::{response::status::NotFound, routes, serde::json::Json, Build, Rocket};

use crate::config::{
    github_access_token,
    github_user,
};

pub fn mount(rck: Rocket<Build>) -> Rocket<Build> {
    rck.mount("/github", routes![
        find_commits,
        find_commits_this,
        find_readme,
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

#[rocket::get("/<repo>/commits/<commit>", rank = 18)]
async fn find_commits(repo: &str, commit: &str) -> Result<Json<Vec<RepoCommit>>, NotFound<String>> {
    let repo = match get_one_repository(repo).await {
        Some(r) => r,
        None    => return Err(NotFound("repository not found".to_string()))
    };

    let commit = client()
        .commits(github_user(), repo.name)
        .get(commit)
        .await;

    match commit {
        Ok(c)  => Ok(Json(vec![c])),
        Err(e) => Err(NotFound(e.to_string()))
    }
}

#[rocket::get("/this/commits/<commit>")]
async fn find_commits_this(commit: &str) -> Result<Json<Vec<RepoCommit>>, NotFound<String>> {
    let commit = client()
        .commits(github_user(), env!("CARGO_PKG_NAME"))
        .get(commit)
        .await;

    match commit {
        Ok(c)  => Ok(Json(vec![c])),
        Err(e) => Err(NotFound(e.to_string()))
    }
}

#[rocket::get("/<repo>/readme")]
async fn find_readme(repo: &str) -> Result<Json<Content>, NotFound<String>> {
    let repo = match get_one_repository(repo).await {
        Some(r) => r,
        None  => return Err(NotFound("repository not found".to_string()))
    };

    client()
        .repos(github_user(), repo.name)
        .get_readme()
        .r#ref("main")
        .send()
        .await
        .map(Json)
        .map_err(|e| NotFound(e.to_string()))
}

#[rocket::get("/<repo>/commits?<page>", rank = 18)]
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

#[rocket::get("/this/commits?<page>")]
async fn list_commits_this(page: Option<u32>) -> Json<Vec<RepoCommit>> {
    let found = client()
        .repos(github_user(), env!("CARGO_PKG_NAME"))
        .list_commits()
        .branch("main")
        .page(page.unwrap_or(1))
        .send()
        .await
        .expect("Project commits must exist");
    Json(found.items)
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
        Ok(r) if r.private.is_some_and(|p| !p) => Some(r),
        Err(_) => {
            log::error!("could not get repository `{repo}` from GitHub");
            None
        },
        _ => None
    }
}
