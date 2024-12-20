import React from 'react';
import moment from 'moment-timezone';
import { GmtData, Product, Rfid } from '@prisma/client';
import { Page, Text, View, Document, StyleSheet, Image, Svg, Line } from '@react-pdf/renderer';

import { hameemLogoInBase64, logoInBase64 } from '@/constants';

interface DayEndLineNonQcAssemblyReportTemplateProps {
    details: { label: string, value: string }[];
    reportData: (Product & {
        frontGmt: GmtData;
        rfid: Rfid;
    })[];
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
    rfidCell: {
        width: '200px',
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

const DayEndLineNonQcAssemblyReportTemplate: React.FC<DayEndLineNonQcAssemblyReportTemplateProps> = ({ details, reportData }) => (
    <Document>
        <Page size="A3" orientation="landscape" style={styles.page}>
            <View style={styles.header}>
                <Image src={hameemLogoInBase64} style={styles.logo} fixed />
                <Text style={styles.title}>Assembly section | Non-QC Inspection Report</Text>
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
            <View style={styles.body}>
                <Text style={styles.tableTitle}>Total: {reportData.length}</Text>
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.noCell}>No</Text>
                        <Text style={styles.rfidCell}>RFID</Text>
                        <Text style={styles.tableCell}>Color</Text>
                        <Text style={styles.tableCell}>Shade</Text>
                        <Text style={styles.tableCell}>Size</Text>
                        <Text style={styles.tableCell}>Style</Text>
                        <Text style={styles.tableCell}>Buyer</Text>
                        <Text style={styles.tableCell}>Time</Text>
                    </View>

                    {/* Table Rows */}
                    {reportData.map((data, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.noCell}>{index + 1}</Text>
                            <Text style={styles.rfidCell}>{data.rfid.rfid}</Text>
                            <Text style={styles.tableCell}>{data.frontGmt.color}</Text>
                            <Text style={styles.tableCell}>{data.frontGmt.shade}</Text>
                            <Text style={styles.tableCell}>{data.frontGmt.size}</Text>
                            <Text style={styles.tableCell}>{data.frontGmt.styleNo}</Text>
                            <Text style={styles.tableCell}>{data.frontGmt.buyerName}</Text>
                            <Text style={styles.tableCell}>{data.timestampAssembled?.split(" ")[1]}</Text>
                        </View>
                    )).slice(0, 100)}
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

export default DayEndLineNonQcAssemblyReportTemplate;