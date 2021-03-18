import React, { useState, useEffect, useRef } from "react";
import FeedItem from "./FeedItem";
import "../icons/search.css";
import Loader from "../components/Loader";

const Feed = () => {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef();

  useEffect(() => {
    async function getRepoRequest(query) {
      if (controllerRef.current) {
        console.log("aborting");
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;
      try {
        const url = `https://api.github.com/orgs/${query}/repos`;
        setLoading(true);
        setError(null);
        const res = await fetch(url, {
          signal: controllerRef.current?.signal,
        });
        const data = await res.json();
        if (data.length) setRepos(data);
        else setError(data.message);
        controllerRef.current = null;
      } catch (e) {
        if (e.name === "AbortError") {
          setError("Request Aborted");
        } else {
          setError("Failed to fetch repos");
        }
        setRepos([]);
      } finally {
        setLoading(false);
      }
    }
    if (query) getRepoRequest(query);
  }, [query]);

  return (
    <div className="page feed_page">
      <form action="" className="form feed">
        <div className="form__field">
          <label htmlFor="login_username">
            <span className="gg-search"></span>
            <span class="hidden">Username</span>
          </label>
          <input
            type="text"
            className="form__input"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="i.e. Opsmx"
          />
        </div>
      </form>

      {loading && (
        <p className="flash info">
          <Loader />
        </p>
      )}
      {error && <p className="flash error">{error}</p>}
      {!loading && !error && (
        <div className="repo-list">
          {repos && repos.map((repo) => <FeedItem key={repo.id} repo={repo} />)}
        </div>
      )}
    </div>
  );
};

export default Feed;
