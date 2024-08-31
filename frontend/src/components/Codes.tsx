import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

interface AllStudentData {
  Subject: 'Math' | 'Reading';
  LastName: string;
  FirstName: string;
  qrID: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  qrCodeContainer: {
    margin: 10,
    padding: 10,
    border: '1 solid black',
  },
  qrCode: {
    width: 70,
    height: 70,
  },
  text: {
    fontSize: 10,
    marginTop: 5,
  },
});

const QRCodePDF = ({ qrCodes }: { qrCodes: AllStudentData[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {qrCodes.map((qrCode, index) => (
        <View key={index} style={styles.qrCodeContainer}>
          <Image
            style={styles.qrCode}
            source={QRCode.toDataURL(qrCode.qrID)}
          />
          <Text style={styles.text}>{`${qrCode.FirstName} ${qrCode.LastName} (${qrCode.Subject})`}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default QRCodePDF;