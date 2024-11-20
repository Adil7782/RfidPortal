import React from 'react';
import moment from 'moment-timezone';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

import { hameemLogoInBase64, logoInBase64 } from '@/constants';

interface DayEndLineQcReportTemplateProps {
    details: { label: string, value: string }[];
    data: { label: string; data: HourlyQuantityFunctionReturnTypes }[];
}

// Helper function to calculate totals for each label group
const calculateTotals = (hourlyData: HourlyQuantityDataTypes[]) => {
    return hourlyData.reduce(
        (totals, current) => {
            totals.inspectQty += current.inspectQty;
            totals.passQty += current.passQty;
            totals.reworkQty += current.reworkQty;
            totals.rejectQty += current.rejectQty;
            totals.totalDefectsCount += current.totalDefectsCount || 0;
            return totals;
        },
        {
            inspectQty: 0,
            passQty: 0,
            reworkQty: 0,
            rejectQty: 0,
            totalDefectsCount: 0,
        }
    );
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
        width: '150px',
        padding: 5,
        borderStyle: 'solid',
        borderColor: '#000',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    qtyCell: {
        width: '80px',
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

const DayEndLineQcReportTemplate: React.FC<DayEndLineQcReportTemplateProps> = ({ details, data }) => (
    <Document>
        <Page size="A3" orientation="landscape" style={styles.page}>
            <View style={styles.header}>
                <Image src={hameemLogoInBase64} style={styles.logo} fixed />
                <Text style={styles.title}>Detailed Quality Inspection Report</Text>
            </View>

            <View style={styles.detailContainer}>
                {details.map((detail, index) => {
                    return (
                        <View key={index} style={styles.detailRow}>
                            <Text style={styles.detailLabel}>{detail.label}:</Text>
                            <Text style={styles.detailValue}>{detail.value}</Text>
                        </View>
                    )
                    // if (detail.label !== "Total DHU") {
                    // } else return null;
                })}
            </View>

            {/* Summary Table */}
            <View style={{ marginBottom: 30, width: "70%" }}>
                <Text style={styles.tableTitle}>Point-wise Summary</Text>
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.hourCell}>Point</Text>
                        <Text style={styles.tableCell}>Total Inspect Qty</Text>
                        <Text style={styles.tableCell}>Total Pass Qty</Text>
                        <Text style={styles.tableCell}>Total Rework Qty</Text>
                        <Text style={styles.tableCell}>Total Reject Qty</Text>
                        <Text style={styles.tableCell}>Total DHU (%)</Text>
                        <Text style={styles.tableCell}>Total Defects</Text>
                    </View>

                    {/* Table Rows */}
                    {data.map((rowData, labelIndex) => {
                        const totals = calculateTotals(rowData.data.hourlyQuantity);

                        return (
                            <View key={labelIndex} style={styles.tableRow}>
                                <Text style={styles.hourCell}>{rowData.label}</Text>
                                <Text style={styles.tableCell}>{totals.inspectQty}</Text>
                                <Text style={styles.tableCell}>{totals.passQty}</Text>
                                <Text style={styles.tableCell}>{totals.reworkQty}</Text>
                                <Text style={styles.tableCell}>{totals.rejectQty}</Text>
                                <Text style={styles.tableCell}>{rowData.data.totalDHU.toFixed(2)}</Text>
                                <Text style={styles.tableCell}>{totals.totalDefectsCount}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* Detailed Table */}
            <View style={styles.body}>
                {data.map((rowData, labelIndex) => (
                    <View key={labelIndex} style={{ marginBottom: 20 }}>
                        {/* Table Label */}
                        <Text style={styles.tableTitle}>
                            {`- ${rowData.label} [Total DHU: ${rowData.data.totalDHU.toFixed(2)}]`}
                        </Text>

                        {/* Main Table */}
                        <View style={styles.table}>
                            {/* Table Header */}
                            <View style={[styles.tableRow, styles.tableHeader]}>
                                <Text style={styles.noCell}>No</Text>
                                <Text style={styles.hourCell}>Hour Group</Text>
                                <Text style={styles.qtyCell}>Inspect Qty</Text>
                                <Text style={styles.qtyCell}>Pass Qty</Text>
                                <Text style={styles.qtyCell}>Rework Qty</Text>
                                <Text style={styles.qtyCell}>Reject Qty</Text>
                                <Text style={styles.qtyCell}>DHU (%)</Text>
                                <Text style={styles.qtyCell}>Total Defects</Text>
                                <Text style={styles.tableCell}>Operator Name</Text>
                                <Text style={styles.tableCell}>Operation Name</Text>
                                <Text style={styles.tableCell}>Defects</Text>
                                <Text style={styles.qtyCell}>Defects QTY</Text>
                            </View>
                            {/* Table Rows */}
                            {rowData.data.hourlyQuantity.map((hourlyData, hourIndex) => {
                                const defectsAnalysis = hourlyData.defectsAnalysis || [];
                                const rowsToRender = defectsAnalysis.length || 1;

                                return Array.from({ length: rowsToRender }).map((_, defectIndex) => {
                                    const defectData = defectsAnalysis[defectIndex] || {};

                                    return (
                                        <View key={`${hourIndex}-${defectIndex}`} style={styles.tableRow}>
                                            {defectIndex === 0 && (
                                                <>
                                                    <Text style={styles.noCell}>{hourIndex + 1}</Text>
                                                    <Text style={styles.hourCell}>{hourlyData.hourGroup}</Text>
                                                    <Text style={styles.qtyCell}>{hourlyData.inspectQty}</Text>
                                                    <Text style={styles.qtyCell}>{hourlyData.passQty}</Text>
                                                    <Text style={styles.qtyCell}>{hourlyData.reworkQty}</Text>
                                                    <Text style={styles.qtyCell}>{hourlyData.rejectQty}</Text>
                                                    <Text style={styles.qtyCell}>{hourlyData.DHU.toFixed(2)}</Text>
                                                    <Text style={styles.qtyCell}>
                                                        {hourlyData.totalDefectsCount ?? "N/A"}
                                                    </Text>
                                                </>
                                            )}
                                            {defectIndex > 0 && (
                                                <>
                                                    <Text style={styles.noCell}></Text>
                                                    <Text style={styles.hourCell}></Text>
                                                    <Text style={styles.qtyCell}></Text>
                                                    <Text style={styles.qtyCell}></Text>
                                                    <Text style={styles.qtyCell}></Text>
                                                    <Text style={styles.qtyCell}></Text>
                                                    <Text style={styles.qtyCell}></Text>
                                                    <Text style={styles.qtyCell}></Text>
                                                </>
                                            )}
                                            <Text style={styles.tableCell}>
                                                {defectData.operatorName ?? ""}
                                            </Text>
                                            <Text style={styles.tableCell}>
                                                {defectData.operationName ?? ""}
                                            </Text>
                                            <Text style={styles.tableCell}>
                                                {defectData.defects ? defectData.defects.join(", ") : ""}
                                            </Text>
                                            <Text style={styles.qtyCell}>
                                                {defectData.numberOfDefects ?? ""}
                                            </Text>
                                        </View>
                                    );
                                });
                            })}
                        </View>
                    </View>
                ))}
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
);

export default DayEndLineQcReportTemplate;