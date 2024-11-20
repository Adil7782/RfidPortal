import React from 'react';
import moment from 'moment-timezone';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

import { hameemLogoInBase64, logoInBase64 } from '@/constants';

interface HourlyQuantityReportTemplateProps {
    details: { label: string, value: string }[];
    data: HourlyQuantityFunctionReturnTypes["hourlyQuantity"];
    totalDefectCounts: StatusCountTypes
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
        fontSize: 14,
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

const HourlyQuantityReportTemplate: React.FC<HourlyQuantityReportTemplateProps> = ({ details, data, totalDefectCounts }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image src={hameemLogoInBase64} style={styles.logo} fixed/>
                <Text style={styles.country} fixed>~ Bangladesh ~</Text>
                <Text style={styles.title}>Quality Control Report</Text>
            </View>

            <Svg height="2" width="100%" style={styles.separator}>
                <Line
                    x1="0"
                    y1="0"
                    x2="600"
                    y2="0"
                    strokeWidth={1}
                    stroke="rgb(128,128,128)"
                />
            </Svg>

            <View style={styles.detailContainer}>
                {details.map((detail, index) => {
                    if (detail.label !== "Total DHU") {
                        return (
                            <View key={index} style={styles.detailRow}>
                                <Text style={styles.detailLabel}>{detail.label}:</Text>
                                <Text style={styles.detailValue}>{detail.value}</Text>
                            </View>
                        )
                    } else return null;
                })}
            </View>

            <View style={styles.body}>
                <Text style={styles.tableTitle}>
                    ---------------------------------------- Quality Inspection Report ----------------------------------------
                </Text>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.noCell}>No</Text>
                        <Text style={styles.hourCell}>Hour Group</Text>
                        <Text style={styles.tableCell}>Inspect Qty</Text>
                        <Text style={styles.tableCell}>Pass Qty</Text>
                        <Text style={styles.tableCell}>Rework Qty</Text>
                        <Text style={styles.tableCell}>Reject Qty</Text>
                        <Text style={styles.tableCell}>DHU (%)</Text>
                    </View>
                    {data.map((row, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.noCell}>{index + 1}</Text>
                            <Text style={styles.hourCell}>{row.hourGroup}</Text>
                            <Text style={styles.tableCell}>{row.inspectQty}</Text>
                            <Text style={styles.tableCell}>{row.passQty}</Text>
                            <Text style={styles.tableCell}>{row.reworkQty}</Text>
                            <Text style={styles.tableCell}>{row.rejectQty}</Text>
                            <Text style={styles.tableCell}>{row.DHU.toFixed(2)}</Text>
                        </View>
                    ))}
                    <View style={styles.tableRow}>
                        <Text style={styles.noCell}></Text>
                        <Text style={styles.hourCell}></Text>
                        <Text style={styles.tableCell}>{totalDefectCounts.totalInspect}</Text>
                        <Text style={styles.tableCell}>{totalDefectCounts.pass}</Text>
                        <Text style={styles.tableCell}>{totalDefectCounts.rework}</Text>
                        <Text style={styles.tableCell}>{totalDefectCounts.reject}</Text>
                        <Text style={styles.tableCell}>{details.map(detail => (detail.label === "Total DHU" && detail.value))}</Text>
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

export default HourlyQuantityReportTemplate;