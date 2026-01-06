import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Chip } from '../../components/Chip';

const mockMessages = [
  { id: 1, text: 'On my way, will reach in 15 minutes', sender: 'mechanic', time: '10:15 AM' },
  { id: 2, text: 'Thanks!', sender: 'user', time: '10:16 AM' },
  { id: 3, text: 'How much time left?', sender: 'user', time: '10:30 AM' },
];

const quickReplies = ['Share current location', 'Call me', 'ETA?'];

const ChatScreen = ({ route, navigation }) => {
  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState('');
  const mechanicName = route.params?.mechanicName || 'Rahul Auto Works';
  const status = route.params?.status || 'On the way';

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: inputText,
          sender: 'user',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{mechanicName}</Text>
          <Text style={styles.headerStatus}>{status}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="call" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.sender === 'user' && styles.messageUser,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleMechanic,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === 'user' && styles.messageTextUser,
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  message.sender === 'user' && styles.messageTimeUser,
                ]}
              >
                {message.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Quick Replies */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quickReplies}
        contentContainerStyle={styles.quickRepliesContent}
      >
        {quickReplies.map((reply) => (
          <Chip
            key={reply}
            label={reply}
            onPress={() => setInputText(reply)}
            style={styles.quickReplyChip}
          />
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.inputButton}>
          <Ionicons name="image-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputButton}>
          <Ionicons name="location-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={Colors.textLight}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputText.trim() ? Colors.white : Colors.textLight}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  headerStatus: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.lg,
  },
  messageContainer: {
    marginBottom: Spacing.md,
    alignItems: 'flex-start',
  },
  messageUser: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.grey,
  },
  messageBubbleUser: {
    backgroundColor: Colors.primary,
  },
  messageBubbleMechanic: {
    backgroundColor: Colors.grey,
  },
  messageText: {
    ...Typography.body,
    color: Colors.text,
  },
  messageTextUser: {
    color: Colors.white,
  },
  messageTime: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    fontSize: 10,
  },
  messageTimeUser: {
    color: Colors.white + 'CC',
  },
  quickReplies: {
    maxHeight: 50,
    marginBottom: Spacing.sm,
  },
  quickRepliesContent: {
    paddingHorizontal: Spacing.lg,
  },
  quickReplyChip: {
    marginRight: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.white,
  },
  inputButton: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    maxHeight: 100,
    paddingHorizontal: Spacing.md,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
});

export default ChatScreen;
