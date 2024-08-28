import ManageBulkProductDashboard from "./_components/manage-bulk-products-dashboard";

const ScanningPoint8Page = () => {
  function extractRFIDTags(hexString: string): string[] {
    const rfidPattern = /e28069950000[\da-f]{12}/ig;
    return [...hexString.matchAll(rfidPattern)].map(match => match[0]);
  }

  const stng = "a55a0019833000e280699500005014cca7398600d301760d0aa55a0019833000e280699500005014cca7355600d301763re3";

  const newTags = extractRFIDTags(stng);
  console.log("TAGS", newTags);

  return <ManageBulkProductDashboard />
}

export default ScanningPoint8Page