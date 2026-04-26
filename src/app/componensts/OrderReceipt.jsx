import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Register fonts (optional - if you want custom fonts)
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/helvetica/v15/NNUaON5PLuX4SDVL.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/helvetica/v15/NNQgON5PLuX4SDVL_gew.woff2",
      fontWeight: 700,
    },
  ],
});

// Professional PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#333",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    padding: 30,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 30,
    borderBottom: "1px solid #e0e0e0",
    paddingBottom: 20,
  },
  logo: {
    width: 150,
    height: "auto",
    marginBottom: 15,
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
    color: "#2c3e50",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "black",
    marginBottom: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2c3e50",
    borderBottom: "1px solid #eee",
    paddingBottom: 4,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  gridColumn: {
    width: "48%",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 3,
    color: "#34495e",
  },
  value: {
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottom: "1px solid #eee",
  },
  col1: { width: "40%", paddingRight: 5 },
  col2: { width: "15%", textAlign: "center" },
  col3: { width: "20%", textAlign: "right", paddingRight: 5 },
  col4: { width: "25%", textAlign: "right" },
  summary: {
    marginTop: 20,
    paddingTop: 15,
    borderTop: "1px solid #ddd",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  totalLabel: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  totalAmount: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#e74c3c",
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTop: "1px solid #eee",
    fontSize: 10,
    textAlign: "center",
    color: "#95a5a6",
  },
  statusBadge: {
    backgroundColor: "#2ecc71",
    color: "white",
    padding: "3px 10px",
    borderRadius: 10,
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 1,
    alignSelf: "flex-start",
  },
});

export function OrderReceiptPDF({ order }) {
  const { user, items, totalAmount, orderId, createdAt, status } = order;

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Calculate subtotal

  // Status badge color
  const statusColors = {
    completed: "#2ecc71",
    processing: "#3498db",
    cancelled: "#e74c3c",
    shipped: "#f39c12",
  };

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              style={styles.logo}
              src="/black-logo.png" 
            />
            <Text style={styles.title}>ORDER RECEIPT</Text>
            <Text style={styles.subtitle}>Thank you for your purchase</Text>

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Order ID:</Text>
                <Text style={styles.value}>{orderId}</Text>
              </View>
              <View>
                <Text style={styles.label}>Order Date:</Text>
                <Text style={styles.value}>{formattedDate}</Text>
              </View>
              <View>
                <Text style={styles.label}>Status:</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        statusColors[status.toLowerCase()] || "#7f8c8d",
                    },
                  ]}
                >
                  <Text>{status.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Customer and Order Info */}
          <View style={styles.grid}>
            <View style={styles.gridColumn}>
              <Text style={styles.sectionTitle}>Customer Information</Text>
              <Text style={styles.value}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={styles.value}>{user.email}</Text>
              <Text style={styles.value}>{user.contact}</Text>
              <Text style={styles.value}>
                {user.address}, {user.city}
              </Text>
              <Text style={styles.value}>
                {user.country}, {user.postalCode}
              </Text>
            </View>

            <View style={styles.gridColumn}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Items:</Text>
                <Text>{items.length}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal:</Text>
                <Text>Rs {totalAmount.toLocaleString()}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Shipping:</Text>
                <Text>Rs 0.00</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax:</Text>
                <Text>Rs 0.00</Text>
              </View>
              <View style={[styles.totalRow, { marginTop: 5 }]}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>
                  Rs {totalAmount.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          {/* Items Table */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Details</Text>

            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.col1}>Product</Text>
              <Text style={styles.col2}>Qty</Text>
              <Text style={styles.col3}>Unit Price</Text>
              <Text style={styles.col4}>Total</Text>
            </View>

            {/* Table Rows */}
            {items?.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.col1}>{item?.productId?.name || "No Name"}</Text>
                <Text style={styles.col2}>{item?.quantity || "N/A"}</Text>
                <Text style={styles.col3}>
                  Rs {item?.productId?.Sellprice?.toLocaleString() || "No sell price"}
                </Text>
                <Text style={styles.col4}>Rs {totalAmount || "N/A"}</Text>
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>
              If you have any questions about this receipt, please contact our
              customer support info.zalvox@gmail.com.
            </Text>
            <Text style={{ marginTop: 5 }}>
              © {new Date().getFullYear()} Zalvox. All rights
              reserved.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
