import { Layers } from "lucide-react"
import { AppWindow } from "lucide-react"
import { AreaChart } from "lucide-react"

type NavLink = {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const links: Array<NavLink> = [
    {
        href: '/add-job',
        label: 'Add Job',
        icon: <Layers />,
    },
    {
        href: '/jobs',
        label: 'Jobs',
        icon: <AppWindow />,
    },
    {
        href: '/stats',
        label: 'Stats',
        icon: <AreaChart />,
    },
]

export default links;