import React from 'react';
import moment from 'moment-timezone';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

import { hameemLogoInBase64, logoInBase64 } from '@/constants';

type HourlyReportType = {
    hourGroup: string;
    totalBundles: number;
    totalGarmentQty: number;
};

type CuttingReportType = {
    cuttingNo: number;
    buyerName: string;
    style: string;
    color: string;
    shade: string;
    InputBundlQty: number;
    InputGarmentQty: number;
};

interface DayEndLineNonQcBundleReportTemplateProps {
    details: { label: string, value: string }[];
    reportDataByHour: HourlyReportType[];
    reportDataByCuttingNo: CuttingReportType[];
}

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
        fontWeight: 'bold'
    },
    tableHeader2: {
        backgroundColor: '#D3D3D3',
        fontWeight: 'bold',
        fontSize: 11
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

const DayEndLineNonQcBundleReportTemplate: React.FC<DayEndLineNonQcBundleReportTemplateProps> = ({ details, reportDataByHour, reportDataByCuttingNo }) => (
    <Document>
        <Page size="A3" orientation="landscape" style={styles.page}>
            <View style={styles.header}>
                <Image src={hameemLogoInBase64} style={styles.logo} fixed />
                <Text style={styles.title}>Non-QC Inspection Report</Text>
            </View>

            <View style={styles.detailContainer}>
                {details.map((detail, index) => {
                    return (
                        <View key={index} style={styles.detailRow}>
                            <Text style={styles.detailLabel}>{detail.label}:</Text>
                            <Text style={styles.detailValue}>{detail.value}</Text>
                        </View>
                    )
                })}
            </View>

            {/* Cutting No Wise Table */}
            <View style={{ width: "60%" }}>
                <View style={styles.body}>
                    <Text style={styles.tableTitle}>Cutting Wise Summary</Text>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={[styles.tableRow, styles.tableHeader]}>
                            <Text style={styles.tableCell}>Buyer</Text>
                            <Text style={styles.tableCell}>Style</Text>
                            <Text style={styles.tableCell}>Color</Text>
                            <Text style={styles.qtyCell}>Cutting No</Text>
                            <Text style={styles.tableCell}>Shade</Text>
                            <Text style={styles.qtyCell}>Bundle Qty</Text>
                            <Text style={styles.qtyCell}>Piece Qty</Text>
                        </View>

                        {/* Table Rows */}
                        {reportDataByCuttingNo.map((data, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{data.buyerName}</Text>
                                <Text style={styles.tableCell}>{data.style}</Text>
                                <Text style={styles.tableCell}>{data.color}</Text>
                                <Text style={styles.qtyCell}>{data.cuttingNo}</Text>
                                <Text style={styles.tableCell}>{data.shade}</Text>
                                <Text style={styles.qtyCell}>{data.InputBundlQty}</Text>
                                <Text style={styles.qtyCell}>{data.InputGarmentQty}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>


            {/* Hourly Table */}
            <View style={{ marginTop: 20 }}>
                <View style={styles.body}>
                    <Text style={styles.tableTitle}>Hourly Summary</Text>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={[styles.tableRow, styles.tableHeader2]}>
                            <Text style={styles.tableCell}></Text>
                            {reportDataByHour.map((data, index) => (
                                <Text key={index} style={styles.tableCell}>{data.hourGroup}</Text>
                            ))}
                        </View>

                        {/* Table Rows */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Bundles</Text>
                            {reportDataByHour.map((data, index) => (
                                <Text key={index} style={styles.tableCell}>{data.totalBundles}</Text>
                            ))}
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell}>Pieces</Text>
                            {reportDataByHour.map((data, index) => (
                                <Text key={index} style={styles.tableCell}>{data.totalGarmentQty}</Text>
                            ))}
                        </View>
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
);

export default DayEndLineNonQcBundleReportTemplate;