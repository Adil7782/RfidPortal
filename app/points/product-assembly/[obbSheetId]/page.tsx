import ProductAssembleSection from "./_components/product-assemble-section";

const AssemblyQCScanningPointPage = async ({
    params
}: {
    params: { obbSheetId: string }
}) => {

    return <ProductAssembleSection obbSheetId={params.obbSheetId}/>;
}

export default AssemblyQCScanningPointPage;