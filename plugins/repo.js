import axios from "axios";
import config from '../config.cjs';

const repo = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  if (["repo", "sc", "script", "info"].includes(cmd)) {
    const githubRepoURL = "https://github.com/Waseem-Tech-Sigma/ROX-LEDEND";

    try {
      const match = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!match) return m.reply("❌ Invalid GitHub URL format.");

      const [, username, repoName] = match;

      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
      if (!response.data) throw new Error("GitHub API request failed.");

      const repoData = response.data;

      const formattedInfo = `*BOT NAME:*\n> ${repoData.name}\n\n*OWNER NAME:*\n> ${repoData.owner.login}\n\n*STARS:*\n> ${repoData.stargazers_count}\n\n*FORKS:*\n> ${repoData.forks_count}\n\n*GITHUB LINK:*\n> ${repoData.html_url}\n\n*DESCRIPTION:*\n> ${repoData.description || "No description"}\n\n*Don't Forget To Star and Fork Repository*\n\n> *© Powered By JawadTechX 🖤*`;

      await gss.sendMessage(
        m.from,
        {
          image: { url: "https://i.postimg.cc/GmZgP9k0/openart-image-pqw8-Zgtv-1751900699391-raw.jpg" },
          caption: formattedInfo,
          contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363354023106228@newsletter",
              newsletterName: "LEGEND-WASEEM",
              serverMessageId: 143,
            },
          },
        },
        { quoted: m }
      );

    } catch (error) {
      console.error("Error in repo command:", error);
      m.reply("❌ Failed to fetch repository info. Try again later.");
    }
  }
};

export default repo;
