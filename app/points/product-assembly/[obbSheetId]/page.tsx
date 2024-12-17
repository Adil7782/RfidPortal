import ProductAssembleSection from "./_components/product-assemble-section";
import ProductAssembleSummary from "./_components/product-assemble-summary";

const AssemblyQCScanningPointPage = async ({
    params
}: {
    params: { obbSheetId: string }
}) => {

    return (
        <>
            <ProductAssembleSection obbSheetId={params.obbSheetId} />
            <ProductAssembleSummary obbSheetId={params.obbSheetId}/>
        </>
    );
}

export default AssemblyQCScanningPointPage;