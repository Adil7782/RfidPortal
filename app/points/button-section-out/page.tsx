import ManageBulkProductDashboard from "./_components/manage-bulk-products-dashboard";

const ScanningPoint8Page = () => {
  const rfidPattern = /e28069150000.{12}/g;
  function extractRFIDTags(hexString: string): string[] {
    return [...hexString.matchAll(rfidPattern)].map(match => match[0]);
  }

  const stng = "a55a0019833000e280699500005014cca7398600d301760d0a";

  const newTags = extractRFIDTags(stng);
  console.log("TAGS", newTags);

  return <ManageBulkProductDashboard />
}

export default ScanningPoint8Page