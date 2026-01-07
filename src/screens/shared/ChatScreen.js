import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { sendMessage } from '../../store/slices/chatSlice';

export default function ChatScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { threads, messagesByThreadId } = useSelector((s) => s.chat);
  const threadId = route.params?.threadId || null;
  const [text, setText] = useState('');

  const activeThread = useMemo(() => threads.find((t) => t.id === threadId) || null, [threadId, threads]);
  const messages = useMemo(() => (threadId ? messagesByThreadId[threadId] || [] : []), [messagesByThreadId, threadId]);

  if (!threadId) {
    return (
      <View style={styles.safe}>
        <FlatList
          data={threads}
          keyExtractor={(t) => t.id}
          contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                const parent = navigation.getParent?.();
                if (parent) parent.navigate('ChatThread', { threadId: item.id });
                else navigation.navigate('ChatThread', { threadId: item.id });
              }}
            >
              <Card style={{ marginBottom: Spacing.lg }}>
                <Text style={styles.threadTitle}>{item.title}</Text>
                <Text style={styles.threadSub}>{item.lastMessage}</Text>
              </Card>
            </Pressable>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No chats yet.</Text>}
        />
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{activeThread?.title ?? 'Chat'}</Text>
        <Text style={styles.headerSub}>Typically replies in a few minutes</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 140 }}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.from === 'me' ? styles.me : styles.them]}>
            <Text style={[styles.msg, item.from === 'me' ? styles.msgMe : styles.msgThem]}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.composer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Message…"
          placeholderTextColor={Colors.muted}
          style={styles.input}
        />
        <View style={{ width: Spacing.sm }} />
        <Button
          title="Send"
          onPress={() => {
            const t = text.trim();
            if (!t) return;
            dispatch(sendMessage({ threadId, text: t }));
            setText('');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  empty: { ...Typography.sub, color: Colors.subtext, padding: Spacing.xl },
  threadTitle: { ...Typography.h3, color: Colors.text },
  threadSub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  header: { padding: Spacing.xl, paddingBottom: Spacing.sm },
  headerTitle: { ...Typography.h3, color: Colors.text },
  headerSub: { ...Typography.cap, color: Colors.subtext, marginTop: Spacing.xs },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
    marginBottom: Spacing.sm,
  },
  me: { alignSelf: 'flex-end', backgroundColor: Colors.primary },
  them: { alignSelf: 'flex-start', backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  msg: { ...Typography.sub },
  msgMe: { color: '#fff' },
  msgThem: { color: Colors.text },
  composer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: Spacing.lg,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: 14,
    color: Colors.text,
    ...Typography.sub,
  },
});

