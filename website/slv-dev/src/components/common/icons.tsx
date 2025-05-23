import appInfo from '@appInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faDiscord,
  faGithub,
  faXTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'

export function TwitterIconLink() {
  return (
    <a
      href={`https://x.com/${appInfo.twitterId}`}
      className="hover:opacity-80"
      rel="noopener noreferrer"
      target="_blank"
    >
      <FontAwesomeIcon
        icon={faXTwitter}
        className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
      />
    </a>
  )
}

export function DiscordIconLink() {
  return (
    <a
      href={`${appInfo.discordInviteURL}`}
      className="hover:opacity-80"
      rel="noopener noreferrer"
      target="_blank"
    >
      <FontAwesomeIcon
        icon={faDiscord}
        className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
      />
    </a>
  )
}

export function YouTubeLink() {
  return (
    <a
      href={`https://www.youtube.com/${appInfo.youtubeChannelId}`}
      className="hover:opacity-80"
      rel="noopener noreferrer"
      target="_blank"
    >
      <FontAwesomeIcon
        icon={faYoutube}
        className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
      />
    </a>
  )
}

export function GitHubLink() {
  return (
    <a
      href={`https://github.com/${appInfo.githubId}`}
      className="hover:opacity-80"
      rel="noopener noreferrer"
      target="_blank"
    >
      <FontAwesomeIcon
        icon={faGithub}
        className="h-5 w-5 text-zinc-500 dark:text-zinc-300"
      />
    </a>
  )
}
