import { HoverCardTrigger } from "@radix-ui/react-hover-card"
import { HoverCard, HoverCardContent } from "./ui/hover-card"

const Footer = () => {
	return (
		<footer className="border-t border-border/40 py-2 dark:border-border md:px-8 md:py-0 mt-6">
			<div className="container flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
				<p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
					Built by{" "}
					<a href="https://junaidanjum.com" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
						Junaid A
					</a>
					. The source code is available on{" "}
					<a href="https://github.com/junaidanjum/webrew" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
						GitHub
					</a>
					. We also got featured on{" "}
					<HoverCard>
						<HoverCardTrigger className="font-medium underline underline-offset-4 cursor-pointer">Product Hunt</HoverCardTrigger>
						<HoverCardContent>
							<a href="https://www.producthunt.com/posts/webrew?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-webrew" target="_blank">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=842646&theme=light&t=1738580551194"
									alt="Webrew - A&#0032;no&#0045;frills&#0032;brewing&#0032;timer&#0032;purely&#0032;for&#0032;the&#0032;love&#0032;of&#0032;coffee | Product Hunt"
									style={{ width: "250px", height: "54px" }}
								/>
							</a>
						</HoverCardContent>
					</HoverCard>
					.
				</p>
			</div>
		</footer>
	)
}

export default Footer
