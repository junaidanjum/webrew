import { Bean, Coffee, NotepadText, Bookmark, User, Telescope, Plus, Settings } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "./ui/button"

const menuItems = [
	{
		label: "Brew",
		href: "/",
		icon: Coffee
	},
	{
		label: "Explore",
		href: "/explore",
		icon: Telescope
	},
	{
		label: "Stock",
		href: "/stock",
		icon: Bean
	},
	{
		label: "Journal",
		href: "/journal",
		icon: NotepadText
	},
	{
		label: "Bookmark",
		href: "/bookmark",
		icon: Bookmark
	},
	{
		label: "Login",
		href: "/login",
		icon: User
	},
	{
		label: "Settings",
		href: "/settings",
		icon: Settings
	},
	{
		label: "Create Recipe",
		href: "/create",
		icon: Plus
	}
]

const MenuBar = () => {
	return (
		<div className="px-8 pb-2">
			<nav className="flex flex-col gap-2">
				{menuItems.map(item => (
					<Link href={item.href} key={item.label}>
						<TooltipProvider>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<Button variant={item.href === "/" ? "secondary" : "link"}>
										<item.icon />
									</Button>
								</TooltipTrigger>
								<TooltipContent side="left">{item.label}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Link>
				))}
			</nav>
		</div>
	)
}

export default MenuBar
