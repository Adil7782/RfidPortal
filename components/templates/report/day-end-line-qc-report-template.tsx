import React from 'react';
import moment from 'moment-timezone';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

import { hameemLogoInBase64, logoInBase64 } from '@/constants';

interface DayEndLineQcReportTemplateProps {
    details: { label: string, value: string }[];
    data: HourlyQuantityFunctionReturnTypes2;
}

type HourGroupSummary = {
    inspectQty: number;
    passQty: number;
    reworkQty: number;
    rejectQty: number;
    DHU: string;
    [key: string]: string | number;
};

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        // fontFamily: 'Helvetica',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    country: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 10,
        marginBottom: 20,
    },
    logo: {
        width: "100px",
        height: "42px",
        marginBottom: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "extrabold",
        marginBottom: 10,
        alignItems: 'center',
    },
    separator: {
        marginBottom: 20,
    },
    detailContainer: {
        marginBottom: 20,
        width: "50%",
        gap: 6,
    },
    detailRow: {
        display: "flex",
        flexDirection: 'row',
        marginBottom: 4,
    },
    detailLabel: {
        width: 100,
        fontWeight: 'bold',
    },
    detailValue: {
        color: "#767676"
    },
    tableTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        alignItems: 'center',
    },
    body: {
        display: "flex",
        justifyContent: 'center',
    },
    table: {
        width: '100%',
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
    },
    signatureCell: {
        flex: 1,
        padding: 5,
        height: 40,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    tableCell: {
        flex: 1,
        padding: 5,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    noCell: {
        width: '30px',
        padding: 5,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    hourCell: {
        width: '130px',
        padding: 5,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    qtyCell: {
        width: '60px',
        padding: 5,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    tableHeader: {
        backgroundColor: '#D3D3D3',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        paddingHorizontal: 30,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: 'center',
    },
    footerLogo: {
        width: 80,
        height: 30,
        marginTop: 10,
    },
    footerLink: {
        fontSize: 10,
        color: 'gray',
        marginTop: 5,
    },
    footerTime: {
        fontSize: 8,
        marginTop: 10,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 8,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

const DayEndLineQcReportTemplate: React.FC<DayEndLineQcReportTemplateProps> = ({ details, data }) => {
    // Extract and Filter out hour groups where inspectQty is 0
    const filteredData = data.hourlyQuantity.filter((hour) => hour.inspectQty !== 0);
    const hourGroups = filteredData.map((hour) => hour.hourGroup);

    // Extract unique defect types
    const defectTypes = Array.from(
        new Set(data.hourlyQuantity.flatMap((hour) => hour.defectsAnalysis?.map((d) => d.defectType) || []))
    );

    // Total number of defects
    const totalDefects = filteredData.reduce((sum, hour) => sum + (hour.defectsAnalysis?.reduce((s, d) => s + d.count, 0) || 0), 0);

    // Build a defect matrix
    const defectMatrix = defectTypes.map((defectType) => {
        const row: { defectType: string;[key: string]: any } = { defectType };
        hourGroups.forEach((hourGroup, index) => {
            const hourData = filteredData[index];
            const defect = hourData.defectsAnalysis?.find((d) => d.defectType === defectType);
            row[hourGroup] = defect?.count || 0;
        });
        row.total = Object.values(row).reduce((sum, value) => (typeof value === 'number' ? sum + value : sum), 0);
        row.percentage = totalDefects > 0 ? ((row.total / totalDefects) * 100).toFixed(1) : "0.0";
        return row;
    });

    // Sort and extract top 5 defects
    const top5Defects = defectMatrix
        .sort((a, b) => b.total - a.total) // Sort by total defect count descending
        .slice(0, 5);

    // Calculate summary rows
    const summaryData: Array<HourGroupSummary> = hourGroups.map((hourGroup, index) => {
        const hourData = filteredData[index];
        return {
            hourGroup,
            inspectQty: hourData.inspectQty,
            passQty: hourData.passQty,
            reworkQty: hourData.reworkQty,
            rejectQty: hourData.rejectQty,
            DHU: hourData.DHU.toFixed(2),
            totalDefects: hourData.defectsAnalysis?.reduce((sum, defect) => sum + defect.count, 0) || 0,
        };
    });

    const summaryKeys: (keyof HourGroupSummary)[] = ['inspectQty', 'passQty', 'reworkQty', 'rejectQty', 'DHU'];

    const signatures = ["Line Chief", "QA incharge", "QAM", "PM", "QAGM", "Prod.GM"];

    return (
        <Document>
            <Page size="A3" orientation="landscape" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Image src={hameemLogoInBase64} style={styles.logo} fixed />
                    <Text style={styles.title}>Summary Inspection Report</Text>
                </View>

                {/* Details Section */}
                <View style={{ marginBottom: 30, width: "100%" }}>
                    <View style={styles.table}>
                        {/* First Row */}
                        <View style={styles.tableRow}>
                            {details.slice(0, Math.ceil(details.length / 2)).map((detail, index) => (
                                <React.Fragment key={index}>
                                    <Text style={[styles.tableCell, styles.tableHeader]}>{detail.label}</Text>
                                    <Text style={styles.tableCell}>{detail.value}</Text>
                                </React.Fragment>
                            ))}
                        </View>

                        {/* Second Row */}
                        <View style={styles.tableRow}>
                            {details.slice(Math.ceil(details.length / 2)).map((detail, index) => (
                                <React.Fragment key={index}>
                                    <Text style={[styles.tableCell, styles.tableHeader]}>{detail.label}</Text>
                                    <Text style={styles.tableCell}>{detail.value}</Text>
                                </React.Fragment>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Table */}
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.hourCell}>Defect Type</Text>
                        {hourGroups.map((hourGroup, index) => (
                            <Text key={index} style={styles.tableCell}>{hourGroup}</Text>
                        ))}
                        <Text style={styles.qtyCell}>Total</Text>
                        <Text style={styles.qtyCell}>%</Text>
                    </View>

                    {/* Table Body */}
                    {defectMatrix.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.tableRow}>
                            <Text style={styles.hourCell}>{row.defectType}</Text>
                            {hourGroups.map((hourGroup, index) => (
                                <Text key={index} style={styles.tableCell}>{row[hourGroup]}</Text>
                            ))}
                            <Text style={[styles.qtyCell, styles.tableHeader]}>{row.total}</Text>
                            <Text style={[styles.qtyCell, styles.tableHeader]}>{row.percentage}%</Text>
                        </View>
                    ))}

                    {/* Hour Group Total Defects Row */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.hourCell}>Total Defects</Text>
                        {summaryData.map((data, idx) => (
                            <Text key={idx} style={styles.tableCell}>{data.totalDefects}</Text>
                        ))}
                        <Text style={styles.qtyCell}>
                            {summaryData.reduce((sum, row) => sum + parseInt(row.totalDefects.toString()), 0)}
                        </Text>
                        <Text style={styles.qtyCell}></Text>
                    </View>

                    {/* Summary Rows */}
                    <View style={{ marginTop: 10 }}>
                        {summaryKeys.map((key, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.hourCell, styles.tableHeader]}>
                                    {key === "inspectQty" && "Inspected Gmt"}
                                    {key === "passQty" && "Passed Gmt"}
                                    {key === "reworkQty" && "Difective Gmt"}
                                    {key === "rejectQty" && "Rejected Gmt"}
                                    {key === "DHU" && "DHU %"}
                                </Text>
                                {summaryData.map((data, idx) => (
                                    <Text key={idx} style={styles.tableCell}>
                                        {key === 'DHU' ? data[key as 'DHU'] : data[key as keyof HourGroupSummary]}
                                    </Text>
                                ))}
                                <Text style={styles.qtyCell}>
                                    {key === 'DHU'
                                        ? (
                                            (summaryData.reduce((sum, row) => sum + (row.totalDefects as number), 0) /
                                                summaryData.reduce((sum, row) => sum + row.inspectQty, 0)
                                            ) * 100
                                        ).toFixed(2)
                                        : summaryData.reduce((sum, row) => {
                                            const value = row[key as keyof HourGroupSummary];
                                            return sum + (typeof value === 'number' ? value : 0);
                                        }, 0)}
                                </Text>
                                <Text style={styles.qtyCell}>-</Text>
                            </View>
                        ))}

                        {/* Add blank columns for each hourGroup */}
                        <View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.hourCell]}>Line QC Sign</Text>
                                {hourGroups.map((hourGroup, hourIndex) => (
                                    <Text key={hourIndex} style={[styles.tableCell]}>{" "}</Text>
                                ))}
                                <Text style={styles.qtyCell}></Text>
                                <Text style={styles.qtyCell}></Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.hourCell]}>Line Sup Sign</Text>
                                {hourGroups.map((hourGroup, hourIndex) => (
                                    <Text key={hourIndex} style={[styles.tableCell]}>{" "}</Text>
                                ))}
                                <Text style={styles.qtyCell}></Text>
                                <Text style={styles.qtyCell}></Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Top 5 Defects Table */}
                <View style={{ width: "40%", marginTop: 30 }}>
                    <Text style={styles.tableTitle}>Top-5 Defects</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.qtyCell}>No</Text>
                            <Text style={styles.tableCell}>Defect Type</Text>
                            <Text style={styles.qtyCell}>Quantity</Text>
                            <Text style={styles.qtyCell}>%</Text>
                        </View>

                        {top5Defects.map((row, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.qtyCell}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{row.defectType}</Text>
                                <Text style={styles.qtyCell}>{row.total}</Text>
                                <Text style={styles.qtyCell}>{row.percentage}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Signature Section */}
                <View style={{ marginTop: 30, width: "100%" }}>
                    <Text style={styles.tableTitle}>Signatures</Text>
                    <View style={styles.table}>
                        {/* First Row */}
                        <View style={styles.tableRow}>
                            {signatures.slice(0, Math.ceil(signatures.length / 2)).map((name, index) => (
                                <React.Fragment key={index}>
                                    <Text style={[styles.signatureCell, styles.tableHeader, { fontSize: "14px" }]}>{name}</Text>
                                    <Text style={styles.signatureCell}></Text>
                                </React.Fragment>
                            ))}
                        </View>

                        {/* Second Row */}
                        <View style={styles.tableRow}>
                            {signatures.slice(Math.ceil(signatures.length / 2)).map((name, index) => (
                                <React.Fragment key={index}>
                                    <Text style={[styles.signatureCell, styles.tableHeader, { fontSize: "14px" }]}>{name}</Text>
                                    <Text style={styles.signatureCell}></Text>
                                </React.Fragment>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View>
                        <Text style={styles.footerTime}>{moment().tz("Asia/Dhaka").format('YYYY-MM-DD, h:mm:ss a')}</Text>
                        <Text style={styles.footerLink}>https://rfid-tracker.eliot.global/</Text>
                    </View>
                    <Image src={logoInBase64} style={styles.footerLogo} />
                </View>

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    )
};

export default DayEndLineQcReportTemplate;