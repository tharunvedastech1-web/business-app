import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.title}>Fresh seafood</Text>
        </View>

        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationIcon}>📍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>
          Search fish, prawns, crabs...
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>

      <View style={styles.categories}>
        <View style={styles.categoryCard}>
          <Text style={styles.categoryIcon}>🐟</Text>
          <Text style={styles.categoryText}>Sea Fish</Text>
        </View>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryIcon}>🐠</Text>
          <Text style={styles.categoryText}>River Fish</Text>
        </View>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryIcon}>🦐</Text>
          <Text style={styles.categoryText}>Prawns</Text>
        </View>

        <View style={styles.categoryCard}>
          <Text style={styles.categoryIcon}>🦀</Text>
          <Text style={styles.categoryText}>Crabs</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Today&apos;s Fresh Catch</Text>

      <View style={styles.emptyProducts}>
        <Text style={styles.emptyText}>
          Products will appear here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  locationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EEF7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  locationIcon: {
    fontSize: 22,
  },

  searchBox: {
    height: 52,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchPlaceholder: {
    color: '#999',
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 14,
  },

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryCard: {
    width: '23%',
    aspectRatio: 0.9,
    borderRadius: 12,
    backgroundColor: '#F5F9FC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryIcon: {
    fontSize: 28,
    marginBottom: 8,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },

  emptyProducts: {
    height: 120,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    color: '#999',
  },
});