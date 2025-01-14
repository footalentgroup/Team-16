'use client'

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    patientInfo: {
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: 1,
        borderBottomColor: '#000',
    },
    columnHeaders: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: 1,
        borderBottomColor: '#000',
    },
    columnHeader: {
        flex: 1,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    labelColumn: {
        width: '40%',
    },
    valueColumn: {
        width: '30%',
        textAlign: 'right',
    },
    referenceColumn: {
        width: '30%',
        textAlign: 'right',
        color: '#666',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    subSection: {
        marginLeft: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
    },
})

function ResultRow({ data, level = 0 }) {
    return (
        <>
            <View style={[styles.row, level > 0 && styles.subSection]}>
                <Text style={styles.labelColumn}>{data.label}</Text>
                <Text style={styles.valueColumn}>{data.value}</Text>
                <Text style={styles.referenceColumn}>{data.reference}</Text>
            </View>
            {data.subItems?.map((item, index) => (
                <ResultRow key={index} data={item} level={level + 1} />
            ))}
        </>
    )
}

export function PDFTemplate({ data, patientName }) {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <Text style={styles.header}>Mariano Boedo 23 - Tel.(0387)-4215440 - 4400 Salta</Text>

                <View style={styles.patientInfo}>
                    <Text>Paciente: {patientName} - PROT. 78254</Text>
                </View>

                <View style={styles.columnHeaders}>
                    <Text style={styles.labelColumn}></Text>
                    <Text style={styles.valueColumn}>Valores Obtenidos</Text>
                    <Text style={styles.referenceColumn}>Valores de Referencia</Text>
                </View>

                {data.map((result, index) => (
                    <ResultRow key={index} data={result} />
                ))}
            </Page>
        </Document>
    )
}

// 'use client'

// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// const styles = StyleSheet.create({
//     page: {
//         padding: 30,
//         fontSize: 10,
//     },
//     header: {
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     title: {
//         fontSize: 14,
//         marginBottom: 10,
//     },
//     row: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 5,
//     },
//     label: {
//         width: '40%',
//         fontWeight: 'bold',
//     },
//     value: {
//         width: '30%',
//         textAlign: 'right',
//     },
//     reference: {
//         width: '30%',
//         textAlign: 'right',
//         color: '#666',
//     },
//     subItem: {
//         marginLeft: 20,
//     },
// })

// function ResultRow({ data, level = 0 }) {
//     return (
//         <View style={[styles.row, level > 0 && styles.subItem]}>
//             <Text style={[styles.label, { fontWeight: level === 0 ? 'bold' : 'normal' }]}>{data.label}</Text>
//             <Text style={styles.value}>{data.value}</Text>
//             <Text style={styles.reference}>{data.reference}</Text>
//             {data.subItems && data.subItems.map((subItem, index) => <ResultRow key={index} data={subItem} level={level + 1} />)}
//         </View>
//     )
// }

// export function PDFTemplate({ data, patientName }) {
//     return (
//         <Document>
//             <Page size='A4' style={styles.page}>
//                 <Text style={styles.header}>Mariano Boedo 23 - Tel.(0387)-4215440 - 4400 Salta</Text>

//                 <View style={styles.row}>
//                     <Text>Paciente: {patientName} - PROT. 78254</Text>
//                 </View>

//                 {data.map((result, index) => (
//                     <ResultRow key={index} data={result} />
//                 ))}
//             </Page>
//         </Document>
//     )
// }
