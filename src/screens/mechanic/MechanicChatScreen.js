import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import ChatScreen from '../shared/ChatScreen';

const MechanicChatScreen = ({ route, navigation }) => {
  // Reuse the shared ChatScreen component
  return <ChatScreen route={route} navigation={navigation} />;
};

export default MechanicChatScreen;
