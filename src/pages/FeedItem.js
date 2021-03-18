import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCodeBranch } from "@fortawesome/free-solid-svg-icons";

const FeedItem = ({ repo }) => {
  return (
    <a href={repo.html_url} className="repo-card">
      <header className="title clamp">{repo.name}</header>
      <p>{repo.description}</p>
      <span class="repo-card__meta">
        <FontAwesomeIcon icon={faStar} className="repo-star-icon" />
        <span>{repo.stargazers_count}</span>
      </span>
      <span class="repo-card__meta">
        <FontAwesomeIcon icon={faCodeBranch} />
        <span>2</span>
      </span>
    </a>
  );
};

export default FeedItem;
