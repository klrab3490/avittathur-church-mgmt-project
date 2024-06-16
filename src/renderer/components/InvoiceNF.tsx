import React from "react";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";

// Define interface for your form data
interface InvoiceItemsObject {
  id: string;
  functionName: string;
  price: number;
  Booked: number;
  total: number;
}

interface Report {
  name: string;
  invoice: string;
  address: string;
  housename: string;
  unit: string;
  formdate: Date;
  dateOfHolymass: Date;
  amount: number;
  note: string;
  invoiceItems: InvoiceItemsObject[];
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

const InvoiceNF: React.FC<{ data: Report }> = ({ data }) => {
  console.log(data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Invoice: {data.invoice}</Text>
          <Text>Name: {data.name}</Text>
          <Text>Address: {data.address}</Text>
          <Text>House Name: {data.housename}</Text>
          <Text>Unit: {data.unit}</Text>
          <Text>Form Date: {data.formdate.toDateString()}</Text>
          <Text>Date Of Holy Mass: {data.dateOfHolymass.toDateString()}</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Function Name</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Price</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Booked</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
            </View>
            {data.invoiceItems.map((item) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.functionName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.price}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.Booked}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.total}</Text>
                </View>
              </View>
            ))}
          </View>
          <Text>Total Amount: ₹{data.amount}</Text>
          <Text>Note: {data.note}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceNF;
