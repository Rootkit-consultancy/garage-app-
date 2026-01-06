import { StyleSheet, Text, View } from "react-native";
import { Colors, Radius, Spacing } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectBookingDraft, setDraftProblem } from "../../store/slices/bookingsSlice";
import type { ProblemType } from "../../types/models";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BookingFlowStackParamList, RootStackParamList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<BookingFlowStackParamList, "ProblemType">;

const options: Array<{ label: string; value: ProblemType }> = [
  { label: "Engine issue", value: "engine_issue" },
  { label: "Battery", value: "battery" },
  { label: "Puncture", value: "puncture" },
  { label: "General service", value: "general_service" },
];

export function ProblemTypeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const draft = useAppSelector(selectBookingDraft);
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s the problem?</Text>
      <Text style={styles.sub}>Choose the issue to help the mechanic prepare.</Text>

      <View style={{ gap: 12, marginTop: 16 }}>
        {options.map((o) => {
          const active = draft.problemType === o.value;
          return (
            <Text
              key={o.value}
              style={[styles.item, active ? styles.itemActive : null]}
              onPress={() => {
                dispatch(setDraftProblem(o.value));
                navigation.navigate("ConfirmLocation");
              }}
            >
              {o.label}
            </Text>
          );
        })}
      </View>

      <Text style={styles.cancel} onPress={() => rootNav.goBack()}>
        Cancel
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.bg },
  title: { fontSize: 18, fontWeight: "900", color: Colors.text },
  sub: { marginTop: 6, fontSize: 13, fontWeight: "700", color: Colors.muted },
  item: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    fontWeight: "900",
    color: Colors.text,
    overflow: "hidden",
  },
  itemActive: { borderColor: "rgba(47,107,255,0.34)", backgroundColor: "rgba(47,107,255,0.10)", color: Colors.primary },
  cancel: { marginTop: 18, textAlign: "center", color: Colors.danger, fontWeight: "900" },
});

