import { ObbSheetRoute } from "@prisma/client";

type FunctionReturnType = {
    slug: string;
    label: string;
    position: number;
    isActive: boolean;
}[];

export function formatRoutes(route: ObbSheetRoute | null): FunctionReturnType {
    return [
        {
            slug: "cuttingIn",
            label: "Cutting IN",
            position: 1,
            isActive: route?.cuttingIn ?? false,
        },
        {
            slug: "cuttingOut",
            label: "Cutting OUT",
            position: 2,
            isActive: route?.cuttingOut ?? false,
        },
        {
            slug: "gmtLineInFront",
            label: "GMT Line In Front",
            position: 3,
            isActive: route?.gmtLineInFront ?? false,
        },
        {
            slug: "gmtLineInBack",
            label: "GMT Line In Back",
            position: 4,
            isActive: route?.gmtLineInBack ?? false,
        },
        {
            slug: "gmtLineQcFront",
            label: "GMT Line QC Front",
            position: 5,
            isActive: route?.gmtLineQcFront ?? false,
        },
        {
            slug: "gmtLineQcBack",
            label: "GMT Line QC Back",
            position: 6,
            isActive: route?.gmtLineQcBack ?? false,
        },
        {
            slug: "assembleSection",
            label: "Assemble Section",
            position: 7,
            isActive: route?.assembleSection ?? false,
        },
        {
            slug: "assembleQc",
            label: "Assemble QC",
            position: 8,
            isActive: route?.assembleQc ?? false,
        },
        {
            slug: "endQc",
            label: "End QC",
            position: 9,
            isActive: route?.endQc ?? false,
        },
        {
            slug: "buttonQc",
            label: "Button QC",
            position: 10,
            isActive: route?.buttonQc ?? false,
        },
        {
            slug: "buttonOut",
            label: "Button OUT",
            position: 11,
            isActive: route?.buttonOut ?? false,
        },
        {
            slug: "washIn",
            label: "Wash IN",
            position: 12,
            isActive: route?.washIn ?? false,
        },
        {
            slug: "wetQcBefore",
            label: "Wet QC Before",
            position: 13,
            isActive: route?.wetQcBefore ?? false,
        },
        {
            slug: "wetQcAfter",
            label: "Wet QC After",
            position: 14,
            isActive: route?.wetQcAfter ?? false,
        },
        // {
        //     slug: "dryQcbefore",
        //     label: "Dry QC Before",
        //     position: 15,
        //     isActive: route?.dryQcbefore ?? false,
        // },
        // {
        //     slug: "dryQcAfter",
        //     label: "Dry QC After",
        //     position: 16,
        //     isActive: route?.dryQcAfter ?? false,
        // },
        {
            slug: "washOut",
            label: "Wash OUT",
            position: 15,
            isActive: route?.washOut ?? false,
        },
        {
            slug: "finishIn",
            label: "Finish IN",
            position: 16,
            isActive: route?.finishIn ?? false,
        },
        {
            slug: "finishLineIn",
            label: "Finish Line IN",
            position: 17,
            isActive: route?.finishLineIn ?? false,
        },
        {
            slug: "finishLineQc",
            label: "Finish Line QC",
            position: 18,
            isActive: route?.finishLineQc ?? false,
        },
        {
            slug: "finishOut",
            label: "Finish OUT",
            position: 19,
            isActive: route?.finishOut ?? false,
        },
        {
            slug: "packIn",
            label: "Pack IN",
            position: 20,
            isActive: route?.packIn ?? false,
        },
    ];
}