import React, { useRef, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { BorderRadius, Colors, Spacing, Typography } from '../../constants/theme';
import { completeOnboarding } from '../../store/slices/authSlice';

const W = Dimensions.get('window').width;

const slides = [
  {
    title: 'Book a mechanic in minutes',
    body: 'Find nearby verified mechanics, compare ETA and rating, and book instantly.',
  },
  {
    title: 'Live tracking & repair updates',
    body: 'Track the mechanic en route and get step-by-step status updates.',
  },
  {
    title: 'Chat, photos, and receipts',
    body: 'Chat 1:1, share images, and keep your booking history in one place.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);

  const onNext = () => {
    if (idx < slides.length - 1) {
      const next = idx + 1;
      ref.current?.scrollTo({ x: next * W, animated: true });
      setIdx(next);
      return;
    }
    dispatch(completeOnboarding());
    navigation.replace('Auth');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.top}>
        <Text style={styles.brand}>Garage App</Text>
        <Text style={styles.cap}>Mechanic booking • Live tracking • Chat</Text>
      </View>

      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const n = Math.round(e.nativeEvent.contentOffset.x / W);
          setIdx(n);
        }}
      >
        {slides.map((s) => (
          <View key={s.title} style={[styles.slide, { width: W }]}>
            <View style={styles.art} />
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.body}>{s.body}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={String(i)} style={[styles.dot, i === idx && styles.dotActive]} />
          ))}
        </View>
        <Button title={idx === slides.length - 1 ? 'Get started' : 'Next'} onPress={onNext} fullWidth />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  top: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, paddingBottom: Spacing.md },
  brand: { ...Typography.h2, color: Colors.text },
  cap: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  slide: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg },
  art: {
    height: 220,
    borderRadius: BorderRadius.xl,
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.18)',
    marginBottom: Spacing.xl,
  },
  title: { ...Typography.h2, color: Colors.text, marginBottom: Spacing.sm },
  body: { ...Typography.body, color: Colors.subtext, lineHeight: 22 },
  footer: { padding: Spacing.xl },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: Spacing.lg },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.border, marginHorizontal: 4 },
  dotActive: { backgroundColor: Colors.primary },
});

