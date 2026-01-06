import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const MechanicProfileScreen = ({ route, navigation }) => {
  const { mechanic } = route.params || {
    mechanic: {
      id: 1,
      name: 'Rahul Auto Works',
      rating: 4.8,
      experience: '5+ yrs',
      completedJobs: 1247,
      skills: ['Engine Repair', 'AC Service', 'Brake Service'],
      brands: ['Maruti', 'Hyundai', 'Honda', 'Hero', 'Bajaj'],
      languages: ['Hindi', 'English'],
      reviews: [
        { id: 1, name: 'Amit', rating: 5, comment: 'Great service, very professional!' },
        { id: 2, name: 'Priya', rating: 4, comment: 'Quick and reliable' },
      ],
    },
  };

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👨‍🔧</Text>
          </View>
          <Text style={styles.name}>{mechanic.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{mechanic.experience}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color={Colors.warning} />
            <Text style={styles.rating}>{mechanic.rating}</Text>
            <Text style={styles.jobsCount}> • {mechanic.completedJobs} jobs</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'overview' && styles.tabActive]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.tabTextActive]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.tabActive]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.tabTextActive]}>
              Reviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'gallery' && styles.tabActive]}
            onPress={() => setActiveTab('gallery')}
          >
            <Text style={[styles.tabText, activeTab === 'gallery' && styles.tabTextActive]}>
              Gallery
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'overview' && (
            <Card style={styles.contentCard}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.chipsContainer}>
                  {mechanic.skills.map((skill) => (
                    <View key={skill} style={styles.skillChip}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Vehicle Brands</Text>
                <View style={styles.chipsContainer}>
                  {mechanic.brands.map((brand) => (
                    <View key={brand} style={styles.brandChip}>
                      <Text style={styles.brandText}>{brand}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                <Text style={styles.languages}>{mechanic.languages.join(', ')}</Text>
              </View>
            </Card>
          )}

          {activeTab === 'reviews' && (
            <View>
              {mechanic.reviews.map((review) => (
                <Card key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <View style={styles.reviewRating}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={star <= review.rating ? 'star' : 'star-outline'}
                          size={16}
                          color={Colors.warning}
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </Card>
              ))}
            </View>
          )}

          {activeTab === 'gallery' && (
            <View style={styles.gallery}>
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.galleryItem}>
                  <View style={styles.galleryPlaceholder}>
                    <Ionicons name="image-outline" size={32} color={Colors.textLight} />
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Fixed Book Button */}
      <View style={styles.footer}>
        <Button
          title="Book this mechanic"
          onPress={() => navigation.navigate('ServiceDetails', { mechanic })}
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatar: {
    fontSize: 48,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  badge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginLeft: Spacing.xs,
  },
  jobsCount: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  tabContent: {
    padding: Spacing.lg,
  },
  contentCard: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  skillChip: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  skillText: {
    ...Typography.caption,
    color: Colors.primary,
  },
  brandChip: {
    backgroundColor: Colors.grey,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  brandText: {
    ...Typography.caption,
    color: Colors.text,
  },
  languages: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  reviewCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reviewName: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  galleryItem: {
    width: '47%',
    aspectRatio: 1,
  },
  galleryPlaceholder: {
    flex: 1,
    backgroundColor: Colors.grey,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});

export default MechanicProfileScreen;
