import { useState, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import { getAuth } from "firebase/auth"

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

const Codes = () => {
  const [qrCodes, setQrCodes] = useState<AllStudentData[]>([]);

  useEffect(() => {
    const getQRCodes = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error("User not authenticated");
        }
        const idToken = await currentUser.getIdToken();
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/all/get_all_students`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${idToken}`,
          },
          credentials: "include"
        });
        if (!response.ok) throw new Error(JSON.stringify(response));
        const data = await response.json();
        setQrCodes(data.students);
      } catch (error) {
        console.error(error);
      }
    }
    getQRCodes();
  }, [])

  return (
    <div className='main-container'>
      <h1 className='big-header'>QRCodes</h1>
      <PDFDownloadLink 
        document={<QRCodePDF qrCodes={qrCodes} />} 
        fileName="qrcodes.pdf"
        className="download-link"
      >
        {({ loading }) =>
          loading ? 'Loading document...' : 'Download/Print QR Codes'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default Codes;