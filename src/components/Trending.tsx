import { useState, useEffect, FC } from "react";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";

interface Repo {
  id: number;
  name: string;
  description: string;
  commitCount: number;
  lastCommitDate: string;
  repoLink: string;
  html_url: string;
  full_name: string;
}

const Trending: FC = () => {
  const [reposWithCommits, setReposWithCommits] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchTopRepos = async () => {
      try {
        const token: string = import.meta.env.VITE_PERSONAL_ACCESS_TOKEN;
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch all repositories for the user
        const response = await axios.get(
          "https://api.github.com/users/Dinujaya-Sandaruwan/repos?simple=yes&per_page=100&page=1",
          {
            headers,
          }
        );

        // Get commit details for all repositories with a delay
        const reposWithCommits = await Promise.all(
          response.data.map(async (repo: Repo) => {
            // Introduce a delay (e.g., 1000 milliseconds) before fetching commit details
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const commitsResponse = await axios.get(
              `https://api.github.com/repos/${repo.full_name}/commits`,
              { headers }
            );

            return {
              id: repo.id,
              name: repo.name,
              description: repo.description,
              commitCount: commitsResponse.data.length,
              lastCommitDate: commitsResponse.data[0]?.commit.author.date,
              repoLink: repo.html_url,
            };
          })
        );

        // Sort repositories by the most recent commit date
        const sortedRepos = reposWithCommits.sort(
          (a, b) =>
            new Date(b.lastCommitDate).getTime() -
            new Date(a.lastCommitDate).getTime()
        );

        // Take the top 5 repositories
        const top5Repos = sortedRepos.slice(0, 4);

        // Update state with top repositories
        setReposWithCommits(top5Repos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTopRepos();
  }, []);

  return (
    <div className="rightSide__trending">
      <div className="trendingNav">
        <p>Today Trending</p>
        <BiChevronDown />
      </div>

      {reposWithCommits.map((repo) => (
        <a
          href={repo.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          key={repo.id}
        >
          <div className="trendingItem">
            <div className="trendingLeft">
              <h3>
                {repo.name.length > 20
                  ? `${repo.name.slice(0, 20)}...`
                  : repo.name}
              </h3>
              <p>
                {repo.description && repo.description.length > 20
                  ? `${repo.description.slice(0, 20)}...`
                  : repo.description}
              </p>
            </div>
            <div className="trendingSlat">
              {repo.commitCount < 10
                ? `0${repo.commitCount}`
                : repo.commitCount}{" "}
              commits
            </div>
          </div>
        </a>
      ))}

      <a
        href="https://github.com/Dinujaya-Sandaruwan?tab=repositories"
        target="_blank"
      >
        <div className="trendingFooter">See all</div>
      </a>
    </div>
  );
};

export default Trending;
