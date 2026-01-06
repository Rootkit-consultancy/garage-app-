import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const mockEarnings = {
  today: { amount: 1250, jobs: 3 },
  week: { amount: 8750, jobs: 18 },
  month: { amount: 32500, jobs: 65 },
};

const mockJobs = [
  { id: 1, date: 'Today', service: 'Brake Repair', amount: 800, status: 'completed' },
  { id: 2, date: 'Today', service: 'AC Service', amount: 1200, status: 'completed' },
  { id: 3, date: 'Today', service: 'Oil Change', amount: 500, status: 'completed' },
  { id: 4, date: 'Yesterday', service: 'Battery Replacement', amount: 2000, status: 'completed' },
];

const EarningsScreen = () => {
  const [activeTab, setActiveTab] = useState('today');

  const earnings = mockEarnings[activeTab];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Summary Card */}
      <Card style={styles.summaryCard}>
        <View style={styles.tabs}>
          {['today', 'week', 'month'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.earningsDisplay}>
          <Text style={styles.earningsAmount}>₹{earnings.amount}</Text>
          <Text style={styles.earningsLabel}>
            {earnings.jobs} {earnings.jobs === 1 ? 'job' : 'jobs'} completed
          </Text>
        </View>

        {/* Simple Bar Graph Placeholder */}
        <View style={styles.graphContainer}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <View key={day} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  { height: `${Math.random() * 60 + 20}%` },
                ]}
              />
              <Text style={styles.barLabel}>{day}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Jobs List */}
      <View style={styles.jobsSection}>
        <Text style={styles.sectionTitle}>Recent Jobs</Text>
        {mockJobs.map((job) => (
          <Card key={job.id} style={styles.jobCard}>
            <View style={styles.jobRow}>
              <View style={styles.jobInfo}>
                <Text style={styles.jobService}>{job.service}</Text>
                <Text style={styles.jobDate}>{job.date}</Text>
              </View>
              <View style={styles.jobAmountContainer}>
                <Text style={styles.jobAmount}>₹{job.amount}</Text>
                <View style={styles.statusBadge}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                  <Text style={styles.statusText}>Paid</Text>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* Withdraw Button */}
      <View style={styles.footer}>
        <Button
          title="Withdraw to bank/UPI"
          onPress={() => {}}
          fullWidth
        />
        <Text style={styles.footerNote}>
          Available balance: ₹{earnings.amount}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  summaryCard: {
    margin: Spacing.lg,
    padding: Spacing.xl,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.grey,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  tabActive: {
    backgroundColor: Colors.white,
  },
  tabText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  earningsDisplay: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  earningsAmount: {
    ...Typography.h1,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  earningsLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  graphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  bar: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
  },
  barLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  jobsSection: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  jobCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  jobRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobInfo: {
    flex: 1,
  },
  jobService: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  jobDate: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  jobAmountContainer: {
    alignItems: 'flex-end',
  },
  jobAmount: {
    ...Typography.h3,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statusText: {
    ...Typography.small,
    color: Colors.success,
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  footerNote: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

export default EarningsScreen;
