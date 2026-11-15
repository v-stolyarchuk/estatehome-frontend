import type { IconType } from 'react-icons'
import { FaFacebook, FaInstagram, FaTelegram, FaXTwitter, FaYoutube } from 'react-icons/fa6'

export interface SocialLink {
    label: string
    href: string
    Icon: IconType
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/estatehome',
        Icon: FaFacebook,
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/estatehome',
        Icon: FaInstagram,
    },
    {
        label: 'X',
        href: 'https://x.com/estatehome',
        Icon: FaXTwitter,
    },
    {
        label: 'Telegram',
        href: 'https://t.me/estatehome',
        Icon: FaTelegram,
    },
    {
        label: 'YouTube',
        href: 'https://www.youtube.com/@estatehome',
        Icon: FaYoutube,
    },
]
