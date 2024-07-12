import { Product } from "@prisma/client";

export function countProductsBySection(products: Product[]): SectionCountsType[] {
    const sections = [
        { section: "Assemble section", key: "timestampAssembled" },
        { section: "Assemble QC section", key: "timestampAssembleQc" },
        { section: "Button QC section", key: "timestampButtonQc" },
        { section: "Button OUT section", key: "timestampButtonOut" },
        { section: "Wash IN section", key: "timestampWashIn" },
        { section: "Dry QC section", key: "timestampDryQc" },
        { section: "Wet QC section", key: "timestampWetQc" },
        { section: "Wash OUT section", key: "timestampWashOut" },
        { section: "Finish IN section", key: "timestampFinishIn" },
        { section: "Finish Line IN section", key: "timestampFinishLineIn" },
        { section: "Finish Line QC section", key: "timestampFinishLineQc" },
        { section: "Finish OUT section", key: "timestampFinishOut" },
        { section: "Pack IN section", key: "timestampPackIn" },
    ];

    const sectionCounts: SectionCountsType[] = sections.map(({ section, key }) => {
        const count = products.filter((product) => product[key as keyof Product] !== null).length;
        return { section, productCount: count > 0 ? count : null };
    });

    return sectionCounts;
}