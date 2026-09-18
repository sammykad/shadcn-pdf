import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Sponsor = {
    name: string
    description: string
    href: string
    domain: string
    iconLight: string
    iconDark: string
}

const sponsors: Sponsor[] = [
    {
        name: 'Tracwell',
        description: 'Turn visitor insights into growth',
        href: 'https://tracwell.app/?utm_source=beui&utm_medium=referral&utm_campaign=sponsorship&utm_content=diamond_sponsor',
        domain: 'tracwell.app',
        iconLight: '/favicon.svg',
        iconDark: '/sponsors/tracwell-icon-dark.svg',
    },
]

function SponsorsCard({ sponsor }: { sponsor: Sponsor }) {
    return (
        <Link
            href={sponsor.href}
            target="_blank"
            rel="noreferrer noopener"
            className="block min-w-0 rounded-3xl border border-border bg-background p-2 transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
            <div className="flex min-h-40 items-center justify-center gap-3 rounded-2xl border border-border bg-linear-to-t from-accent/30 to-card px-4 py-6">
                <Image
                    src={sponsor.iconLight}
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 shrink-0 dark:hidden"
                />
                <Image
                    src={sponsor.iconDark}
                    alt=""
                    width={56}
                    height={56}
                    className="hidden size-14 shrink-0 dark:block"
                />
                <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                        {sponsor.name}
                    </h3>
                    <p className="mt-1 max-w-44 text-xs leading-relaxed text-muted-foreground">
                        {sponsor.description}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 px-3 py-4">
                <span className="text-sm font-medium text-foreground">
                    {sponsor.domain}
                </span>
                <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
            </div>
        </Link>
    )
}

const sponsorsPage = () => {
    return (
        <div className="mt-5 grid gap-4 md:grid-cols-3">
            {sponsors.map((sponsor) => (
                <SponsorsCard key={sponsor.name} sponsor={sponsor} />
            ))}
        </div>
    )
}

export default sponsorsPage
