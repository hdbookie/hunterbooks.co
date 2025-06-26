exports.handler = async (event, context) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const username = 'hdbookie';
  
  const headers = {
    'Authorization': `token ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  try {
    // Fetch user data including private contributions
    const userResponse = await fetch(`https://api.github.com/user`, { headers });
    const userData = await userResponse.json();
    
    // Fetch all repos including private
    const reposResponse = await fetch(`https://api.github.com/user/repos?per_page=100&type=all`, { headers });
    const repos = await reposResponse.json();
    
    // Calculate stats
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const publicRepos = repos.filter(repo => !repo.private).length;
    const privateRepos = repos.filter(repo => repo.private).length;
    
    // Get contribution stats using GraphQL API
    const graphqlQuery = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            totalCommitContributions
            totalIssueContributions
            totalPullRequestContributions
            totalPullRequestReviewContributions
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;
    
    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { username }
      })
    });
    
    const graphqlData = await graphqlResponse.json();
    const contributions = graphqlData.data.user.contributionsCollection;
    
    // Calculate current streak
    const weeks = contributions.contributionCalendar.weeks;
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    
    // Flatten all days and reverse to start from most recent
    const allDays = weeks.flatMap(week => week.contributionDays).reverse();
    
    for (const day of allDays) {
      if (day.contributionCount > 0) {
        tempStreak++;
        maxStreak = Math.max(maxStreak, tempStreak);
      } else {
        if (currentStreak === 0) {
          currentStreak = tempStreak;
        }
        tempStreak = 0;
      }
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        totalRepos: repos.length,
        publicRepos,
        privateRepos,
        totalStars,
        totalCommits: contributions.totalCommitContributions,
        totalPRs: contributions.totalPullRequestContributions,
        totalIssues: contributions.totalIssueContributions,
        totalContributions: contributions.contributionCalendar.totalContributions,
        currentStreak,
        maxStreak,
        contributionData: contributions.contributionCalendar.weeks
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}