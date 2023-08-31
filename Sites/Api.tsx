import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";

interface Currency {
  currency: string;
  code: string;
  bid: number;
  ask: number;
}

const Api = () => {
  const [data, setData] = useState<Currency[]>([]);
  const [apiDate, setApiDate] = useState<string>("");

  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  const fetchCurrencyRates = async () => {
    try {
      const response = await fetch(
        "https://api.nbp.pl/api/exchangerates/tables/C?format=json"
      );
      const json = await response.json();
      setData(json[0].rates);
      setApiDate(json[0].effectiveDate);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const renderCurrencyItem = ({ item }: { item: Currency }) => (
    <View style={styles.currencyRow}>
      <Text style={styles.currencyText}>{item.currency}</Text>
      <Text style={styles.currencyText}>{item.code}</Text>
      <Text style={styles.currencyText}>{item.bid.toFixed(2)}</Text>
      <Text style={styles.currencyText}>{item.ask.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>
        Zastosowałem tutaj funkcję API do wyświetlania kursów walut.
      </Text>
      <Text style={styles.title}>
        Currency Rates{" "}
        {apiDate &&
          `(${apiDate.substr(8, 2)}/${apiDate.substr(5, 2)}/${apiDate.substr(
            0,
            4
          )})`}
      </Text>
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Currency</Text>
        <Text style={styles.columnHeader}>Code</Text>
        <Text style={styles.columnHeader}>Bid</Text>
        <Text style={styles.columnHeader}>Ask</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderCurrencyItem}
        keyExtractor={(item) => item.code}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#888",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  columnHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  currencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 8,
  },
  currencyText: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
});

export default Api;
