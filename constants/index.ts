import { AlignLeft, LayoutDashboard, LineChart, Users } from "lucide-react";

export const UNITS = [
    { id: 'unit-1', name: 'Unit 1' },
    { id: 'unit-2', name: 'Unit 2' },
    { id: 'unit-3', name: 'Unit 3' },
    { id: 'unit-4', name: 'Unit 4' },
    { id: 'unit-5', name: 'Unit 5' }
];

export const LOCAL_SERVER_URL: string = 'http://localhost:8080/api'

export const SAMPLE_DEFECTS = [
    {id: 1, name: "Broken Stitch"},
    {id: 2, name: "Skip Stitch"},
    {id: 3, name: "Open Stitch"},
    {id: 4, name: "Over Stitch"},
    {id: 5, name: "Un-Even Stitch"},
    {id: 6, name: "Run of Stitch"},
    {id: 7, name: "Incomplete Stitch"},
    {id: 8, name: "Tension Loose"},
    {id: 9, name: "Puckering"},
    {id: 10, name: "Rawedge"},
    {id: 11, name: "Slanted/Miss Placed"},
    {id: 12, name: "SPI Irregular"},
    {id: 13, name: "Twisted"},
    {id: 14, name: "Size Mistake"},
    {id: 15, name: "Wrong Thread"},
    {id: 16, name: "Needle Mark"},
    {id: 17, name: "Hi-Low"},
    {id: 18, name: "Poor Shape"},
    {id: 19, name: "Missing Parts"},
    {id: 20, name: "Poor Joint Stitch"},
    {id: 21, name: "Dirty/Stain/Oil Mark"},
    {id: 22, name: "Fabric Defect"},
    {id: 23, name: "Fusing Mark"},
    {id: 24, name: "Color Shading"},
    {id: 25, name: "Number Mistake"},
    {id: 27, name: "Joint Stitch"},
    {id: 28, name: "Loop/PKT Slanted"},
    {id: 29, name: "Loop Missing"},
    {id: 30, name: "Needle Cut"}
]

export const SIDEBAR_ROUTES = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard
    },
    {
        label: "Manage Users",
        href: "/admin/manage-users",
        icon: Users
    },
    // {
    //     label: "Manage Lines",
    //     href: "/admin/manage-lines",
    //     icon: AlignLeft
    // },
    {
        label: "Analytics",
        href: "/admin/analytics",
        icon: LineChart
    },
]