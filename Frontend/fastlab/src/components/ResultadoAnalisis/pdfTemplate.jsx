import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  patientInfo: {
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: '#000',
    fontSize: 10,
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
    fontSize: 10,
  },
  labelColumn: {
    width: '40%',
    textAlign: 'left',
    fontSize: 10,
  },
  valueColumn: {
    width: '30%',
    textAlign: 'right',
    fontSize: 10,
  },
  referenceColumn: {
    width: '30%',
    textAlign: 'right',
    color: '#666',
    fontSize: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
});

function ResultRow({ result }) {
  return (
    <View style={styles.row}>
      <Text style={styles.labelColumn}>{result.parameter || 'N/A'}</Text>
      <Text style={styles.valueColumn}>{result.valueResult || 'N/A'}</Text>
      <Text style={styles.referenceColumn}>{result.reference || 'N/A'}</Text>
    </View>
  );
}

export function PDFTemplate({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          Mariano Boedo 23 - Tel.(0387)-4215440 - 4400 Salta
        </Text>

        <View style={styles.patientInfo}>
          <Text>
            Paciente: {data.patient.firstName} {data.patient.lastName}
          </Text>
          <Text>
            Fecha del Examen: {new Date(data.dateExam).toLocaleDateString('es-AR')}
          </Text>
          <Text>Observaciones: {data.observations || 'Sin observaciones'}</Text>
          <Text>Prioridad: {data.priority || 'Normal'}</Text>
        </View>

        <View style={styles.columnHeaders}>
          <Text style={styles.labelColumn}>Parámetro</Text>
          <Text style={styles.valueColumn}>Valores Obtenidos</Text>
          <Text style={styles.referenceColumn}>Valores de referencia</Text>
        </View>

        {data.results.map((result) => (
          <ResultRow key={result.id} result={result} />
        ))}
      </Page>
    </Document>
  );
}
