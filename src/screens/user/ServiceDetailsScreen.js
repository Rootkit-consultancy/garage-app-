import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';

const serviceTypes = ['Repair', 'Regular Service', 'Emergency'];

const ServiceDetailsScreen = ({ route, navigation }) => {
  const { mechanic } = route.params || {};
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [problemDescription, setProblemDescription] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [asap, setAsap] = useState(false);

  const vehicles = [
    { id: 1, brand: 'Maruti Swift', year: '2020', plate: 'DL-01-AB-1234' },
    { id: 2, brand: 'Honda Activa', year: '2019', plate: 'DL-01-CD-5678' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigation.navigate('BookingSummary', {
        mechanic,
        vehicle: selectedVehicle,
        problemDescription,
        serviceType: selectedServiceType,
        date: selectedDate,
        time: selectedTime,
        asap,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Stepper Header */}
      <View style={styles.stepper}>
        {[1, 2, 3].map((s) => (
          <View key={s} style={styles.stepContainer}>
            <View style={[styles.stepCircle, step >= s && styles.stepCircleActive]}>
              {step > s ? (
                <Ionicons name="checkmark" size={20} color={Colors.white} />
              ) : (
                <Text style={[styles.stepNumber, step >= s && styles.stepNumberActive]}>
                  {s}
                </Text>
              )}
            </View>
            <Text style={[styles.stepLabel, step >= s && styles.stepLabelActive]}>
              {s === 1 ? 'Details' : s === 2 ? 'Schedule' : 'Confirm'}
            </Text>
            {s < 3 && (
              <View
                style={[
                  styles.stepLine,
                  step > s && styles.stepLineActive,
                ]}
              />
            )}
          </View>
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {step === 1 && (
          <View style={styles.content}>
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Vehicle</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  // TODO: Show vehicle picker
                }}
              >
                <Text style={selectedVehicle ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {selectedVehicle
                    ? `${selectedVehicle.brand} (${selectedVehicle.plate})`
                    : 'Select vehicle'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
              <Button
                title="Add new vehicle"
                variant="outline"
                size="small"
                onPress={() => {}}
                style={styles.addButton}
              />
            </Card>

            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Problem Description</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe the issue..."
                placeholderTextColor={Colors.textLight}
                multiline
                numberOfLines={4}
                value={problemDescription}
                onChangeText={setProblemDescription}
              />
              <TouchableOpacity style={styles.attachButton}>
                <Ionicons name="camera-outline" size={20} color={Colors.primary} />
                <Text style={styles.attachText}>Attach photos</Text>
              </TouchableOpacity>
            </Card>

            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Service Type</Text>
              <View style={styles.chipsContainer}>
                {serviceTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    selected={selectedServiceType === type}
                    onPress={() => setSelectedServiceType(type)}
                    variant={selectedServiceType === type ? 'primary' : 'default'}
                    style={styles.serviceChip}
                  />
                ))}
              </View>
            </Card>
          </View>
        )}

        {step === 2 && (
          <View style={styles.content}>
            <Card style={styles.card}>
              <Text style={styles.cardTitle}>Date & Time</Text>
              <TouchableOpacity
                style={styles.asapButton}
                onPress={() => setAsap(!asap)}
              >
                <View style={styles.asapContent}>
                  <Ionicons
                    name={asap ? 'checkmark-circle' : 'circle-outline'}
                    size={24}
                    color={asap ? Colors.primary : Colors.textSecondary}
                  />
                  <Text style={styles.asapText}>ASAP (Emergency)</Text>
                </View>
              </TouchableOpacity>

              {!asap && (
                <>
                  <TouchableOpacity style={styles.dateTimeButton}>
                    <Ionicons name="calendar-outline" size={20} color={Colors.textSecondary} />
                    <Text style={styles.dateTimeText}>
                      {selectedDate || 'Select date'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.dateTimeButton}>
                    <Ionicons name="time-outline" size={20} color={Colors.textSecondary} />
                    <Text style={styles.dateTimeText}>
                      {selectedTime || 'Select time'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Card>

            <Card style={styles.card}>
              <View style={styles.estimateHeader}>
                <Text style={styles.cardTitle}>Cost Estimate</Text>
                <Ionicons name="information-circle-outline" size={20} color={Colors.textSecondary} />
              </View>
              <Text style={styles.estimateRange}>₹500 – ₹1,500</Text>
              <Text style={styles.estimateNote}>
                Final cost may vary based on actual work required
              </Text>
            </Card>
          </View>
        )}

        {step === 3 && (
          <View style={styles.content}>
            <Card style={styles.card}>
              <Text style={styles.summaryTitle}>Booking Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Mechanic:</Text>
                <Text style={styles.summaryValue}>{mechanic?.name || 'Rahul Auto Works'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service:</Text>
                <Text style={styles.summaryValue}>{selectedServiceType || 'Repair'}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Vehicle:</Text>
                <Text style={styles.summaryValue}>
                  {selectedVehicle?.brand || 'Maruti Swift'}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Time:</Text>
                <Text style={styles.summaryValue}>
                  {asap ? 'ASAP' : `${selectedDate || 'Today'} ${selectedTime || '10:00 AM'}`}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Estimated Cost:</Text>
                <Text style={styles.summaryValue}>₹500 – ₹1,500</Text>
              </View>
            </Card>

            <Card style={styles.card}>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>
                  Allow live location tracking for mechanic
                </Text>
                <TouchableOpacity style={styles.toggle}>
                  <View style={[styles.toggleCircle, styles.toggleCircleActive]} />
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {step > 1 && (
          <Button
            title="Back"
            variant="outline"
            onPress={() => setStep(step - 1)}
            style={styles.backButton}
          />
        )}
        <Button
          title={step === 3 ? 'Confirm Booking' : 'Next'}
          onPress={handleNext}
          style={styles.nextButton}
          fullWidth={step === 1}
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
  stepper: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepNumber: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  stepNumberActive: {
    color: Colors.white,
  },
  stepLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  stepLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  stepLine: {
    position: 'absolute',
    top: 20,
    left: '60%',
    right: '-40%',
    height: 2,
    backgroundColor: Colors.border,
    zIndex: -1,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  card: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  cardTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    marginBottom: Spacing.sm,
  },
  dropdownText: {
    ...Typography.body,
    color: Colors.text,
  },
  dropdownPlaceholder: {
    ...Typography.body,
    color: Colors.textLight,
  },
  addButton: {
    marginTop: Spacing.xs,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Typography.body,
    color: Colors.text,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: Spacing.sm,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  attachText: {
    ...Typography.body,
    color: Colors.primary,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  serviceChip: {
    marginRight: Spacing.sm,
  },
  asapButton: {
    marginBottom: Spacing.md,
  },
  asapContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  asapText: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  dateTimeText: {
    ...Typography.body,
    color: Colors.text,
  },
  estimateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  estimateRange: {
    ...Typography.h3,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  estimateNote: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  summaryTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  summaryLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  summaryValue: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primary,
    padding: 2,
  },
  toggleCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.white,
    alignSelf: 'flex-end',
  },
  toggleCircleActive: {
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.md,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});

export default ServiceDetailsScreen;
