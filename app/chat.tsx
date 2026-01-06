import { useLocalSearchParams, router } from "expo-router";
import { useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { TitleAppBar } from "./_components/AppBar";
import { mechanics } from "./_data/mock";
import { Colors, Radius, Shadow } from "./_theme";

type Msg = {
  id: string;
  from: "user" | "mech";
  text: string;
  time: string;
};

export default function ChatScreen() {
  const params = useLocalSearchParams<{ mechanic?: string }>();
  const mechanicId = params.mechanic ?? "rahul";
  const mechanic = useMemo(() => mechanics.find((m) => m.id === mechanicId) ?? mechanics[0], [mechanicId]);

  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: "m1", from: "mech", text: "Hi! I’m on the way. Can you share your exact landmark?", time: "10:24" },
    { id: "m2", from: "user", text: "Sure — near City Pride, Kothrud. I’ll be outside.", time: "10:25" },
    { id: "m3", from: "mech", text: "Great. Please keep the key ready.", time: "10:26" },
  ]);

  function send() {
    const t = draft.trim();
    if (!t) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((prev) => [...prev, { id: `u${prev.length + 1}`, from: "user", text: t, time }]);
    setDraft("");
  }

  return (
    <View style={styles.container}>
      <TitleAppBar title="" onBack={() => router.back()} />

      <View style={styles.headerRow}>
        <View style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{mechanic.name}</Text>
          <Text style={styles.status}>On the way</Text>
        </View>
        <Pressable style={styles.iconBtn} accessibilityLabel="Call">
          <Feather name="phone" size={18} color={Colors.accent} />
        </Pressable>
        <Pressable style={styles.iconBtn} accessibilityLabel="Info">
          <Feather name="info" size={18} color={Colors.muted} />
        </Pressable>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={{ alignItems: item.from === "user" ? "flex-end" : "flex-start" }}>
            <View style={[styles.bubble, item.from === "user" ? styles.bubbleUser : styles.bubbleMech]}>
              <Text style={[styles.bubbleText, item.from === "user" ? { color: "#fff" } : { color: "rgba(15,23,42,0.90)" }]}>
                {item.text}
              </Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />

      <View style={styles.inputBar}>
        <Pressable style={styles.iconBtn} accessibilityLabel="Add attachment">
          <Feather name="plus" size={18} color={Colors.muted} />
        </Pressable>
        <Pressable style={styles.iconBtn} accessibilityLabel="Camera">
          <Feather name="camera" size={18} color={Colors.muted} />
        </Pressable>

        <View style={styles.inputPill}>
          <TextInput
            placeholder="Type a message…"
            placeholderTextColor="rgba(15,23,42,0.42)"
            style={styles.input}
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={send}
            returnKeyType="send"
          />
        </View>

        <Pressable style={styles.send} accessibilityLabel="Send" onPress={send}>
          <Feather name="send" size={16} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
  },
  name: { fontSize: 14, fontWeight: "900", color: Colors.text },
  status: { fontSize: 11, fontWeight: "800", color: Colors.muted, marginTop: 2 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { paddingHorizontal: 14, paddingBottom: 10, gap: 10 },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 18,
    ...Shadow.soft,
  },
  bubbleUser: { backgroundColor: Colors.accent, borderBottomRightRadius: 8 },
  bubbleMech: { backgroundColor: "#EEF2F7", borderBottomLeftRadius: 8 },
  bubbleText: { fontSize: 14, fontWeight: "700", lineHeight: 18 },
  time: { fontSize: 10, fontWeight: "700", color: "rgba(15,23,42,0.46)", marginTop: 4 },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(15,23,42,0.08)",
    backgroundColor: "rgba(247,248,252,0.90)",
  },
  inputPill: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
  },
  input: { fontSize: 14, fontWeight: "600", color: Colors.text },
  send: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    ...Shadow.soft,
  },
});

