import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors, Radius, Spacing } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ensureThread, selectMessagesForBooking, sendMessage } from "../../store/slices/chatSlice";
import { selectBookingById } from "../../store/slices/bookingsSlice";
import { selectMechanics } from "../../store/slices/mechanicsSlice";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ChatStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<ChatStackParamList, "ChatThread">;

export function ChatThreadScreen({ route }: Props) {
  const { bookingId } = route.params;
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessagesForBooking(bookingId));
  const booking = useAppSelector(selectBookingById(bookingId));
  const mechanics = useAppSelector(selectMechanics);
  const mechanicName = useMemo(() => {
    if (!booking) return "Mechanic";
    return mechanics.find((m) => m.id === booking.mechanicId)?.name ?? "Mechanic";
  }, [booking, mechanics]);

  const [draft, setDraft] = useState("");

  useEffect(() => {
    dispatch(ensureThread({ bookingId }));
  }, [bookingId, dispatch]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    dispatch(sendMessage({ bookingId, sender: "user", text }));
    setDraft("");
    // Mock reply
    setTimeout(() => {
      dispatch(
        sendMessage({
          bookingId,
          sender: "mechanic",
          text: "Got it. I’ll be there shortly.",
        }),
      );
    }, 900);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{mechanicName}</Text>
        <Text style={styles.sub}>On the way</Text>
      </View>

      <FlatList
        data={[...messages].sort((a, b) => a.createdAt - b.createdAt)}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: Spacing.md, gap: 10 }}
        renderItem={({ item }) => (
          <View style={{ alignItems: item.sender === "user" ? "flex-end" : "flex-start" }}>
            <View style={[styles.bubble, item.sender === "user" ? styles.bubbleUser : styles.bubbleMech]}>
              <Text style={[styles.bubbleText, item.sender === "user" ? { color: "#fff" } : { color: "rgba(15,23,42,0.90)" }]}>
                {item.text}
              </Text>
            </View>
            <Text style={styles.time}>{new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
          </View>
        )}
      />

      <View style={styles.inputBar}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Type a message…"
          placeholderTextColor="rgba(15,23,42,0.42)"
          style={styles.input}
        />
        <Pressable onPress={send} style={styles.send}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { padding: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.border, backgroundColor: Colors.bg },
  title: { fontSize: 16, fontWeight: "900", color: Colors.text },
  sub: { marginTop: 2, fontSize: 11, fontWeight: "800", color: Colors.muted },
  bubble: { maxWidth: "78%", paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18 },
  bubbleUser: { backgroundColor: Colors.primary, borderBottomRightRadius: 8 },
  bubbleMech: { backgroundColor: "#EEF2F7", borderBottomLeftRadius: 8 },
  bubbleText: { fontSize: 14, fontWeight: "700", lineHeight: 18 },
  time: { marginTop: 4, fontSize: 10, fontWeight: "700", color: "rgba(15,23,42,0.46)" },
  inputBar: { flexDirection: "row", gap: 10, padding: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.bg },
  input: { flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "rgba(15,23,42,0.10)", borderRadius: Radius.pill, paddingHorizontal: 12, paddingVertical: 10, fontWeight: "700", color: Colors.text },
  send: { backgroundColor: Colors.primary, borderRadius: Radius.pill, paddingHorizontal: 14, alignItems: "center", justifyContent: "center" },
  sendText: { color: "#fff", fontWeight: "900" },
});

