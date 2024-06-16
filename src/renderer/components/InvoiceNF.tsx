/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
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
  id: number;
  name: String;
  invoice: String;
  address: String;
  housename: String;
  unit: String;
  formdate: Date;
  dateOfHolymass: Date;
  amount: number;
  note: String;
  invoiceItems: [InvoiceItemsObject];
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function InvoiceNF({ data }: { data: Report[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>
            {data.map((item) => (
              <div key={item.id}>
                <div>{item.invoice}</div>
                <div>{item.name}</div>
                <div>{item.address}</div>
                <div>{item.housename}</div>
                <div>{item.unit}</div>
                <div>{item.formdate.toDateString()}</div>
                <div>{item.dateOfHolymass.toDateString()}</div>
                <table>
                  <th>
                    <td>Function Name</td>
                    <td>Price</td>
                    <td>Booked</td>
                    <td>Total</td>
                  </th>
                  {item.invoiceItems.map((invoiceItem) => (
                    <tr key={invoiceItem.id}>
                      <td>{invoiceItem.functionName}</td>
                      <td>{invoiceItem.price}</td>
                      <td>{invoiceItem.Booked}</td>
                      <td>{invoiceItem.total}</td>
                    </tr>
                  ))}
                </table>
                <td>{item.amount}</td>
                <td>{item.note}</td>
              </div>
            ))}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

