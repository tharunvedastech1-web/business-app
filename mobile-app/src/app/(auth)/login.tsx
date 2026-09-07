import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { login } from '@/store/slices/authSlice';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [errorDismissed, setErrorDismissed] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const { height } = useWindowDimensions();
  const compact = height < 680;
  const spacious = height > 860;

  const bannerDuration = 3500;

  useEffect(() => {
    if (!user || bannerDismissed) return;

    const timer = setTimeout(() => {
      setBannerDismissed(true);
      router.replace('/(tabs)');
    }, bannerDuration);

    return () => clearTimeout(timer);
  }, [user, bannerDismissed]);

  useEffect(() => {
    if (!error || errorDismissed) return;

    const timer = setTimeout(() => {
      setErrorDismissed(true);
    }, bannerDuration);

    return () => clearTimeout(timer);
  }, [error, errorDismissed]);

  const sizes = {
    screenPad: spacious ? 32 : 20,
    title: spacious ? 36 : compact ? 26 : 32,
    subtitle: spacious ? 17 : compact ? 14 : 16,
    subtitleGap: spacious ? 36 : compact ? 20 : 30,
    control: spacious ? 58 : compact ? 48 : 54,
    fieldGap: spacious ? 18 : compact ? 12 : 16,
    buttonGap: spacious ? 18 : compact ? 8 : 14,
  };

  const handleLogin = () => {
    setErrorDismissed(false);
    setBannerDismissed(false);
    dispatch(login({ phone, password }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {user && !bannerDismissed && (
          <View style={styles.successBanner}>
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>
            <View style={styles.successContent}>
              <Text style={styles.successTitle}>Login Successful</Text>
              <Text style={styles.successText}>
                Welcome, {user.name || 'User'}! You are logged in.
              </Text>
            </View>
          </View>
        )}

        {error && !errorDismissed && (
          <View style={styles.errorBanner}>
            <View style={styles.errorIcon}>
              <Text style={styles.errorIconText}>✕</Text>
            </View>
            <View style={styles.successContent}>
              <Text style={styles.errorTitle}>Login Failed</Text>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </View>
        )}

        <View
          style={[
            styles.card,
            { paddingHorizontal: sizes.screenPad },
          ]}
        >
          <Text
            style={[
              styles.title,
              { fontSize: sizes.title, marginTop: spacious ? 8 : 28 },
            ]}
          >
            Fish Wholesale
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                fontSize: sizes.subtitle,
                marginBottom: sizes.subtitleGap,
              },
            ]}
          >
            Login to your account
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                height: sizes.control,
                marginBottom: sizes.fieldGap,
              },
            ]}
            placeholder="Phone number"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <View
            style={[
              styles.passwordWrapper,
              { height: sizes.control, marginBottom: sizes.buttonGap },
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.eyeIcon}>
                {showPassword ? '🙈' : '👁️'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { height: sizes.control },
            ]}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {loading && (
            <Text style={styles.loadingText}>Logging in...</Text>
          )}

          <TouchableOpacity>
            <Text style={styles.registerText}>
              Don&apos;t have an account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderColor: '#43A047',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },

  successIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#43A047',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  successIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  successContent: {
    flex: 1,
  },

  successTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  successText: {
    fontSize: 13,
    color: '#388E3C',
    marginTop: 2,
  },

  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDECEA',
    borderColor: '#E53935',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },

  errorIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  errorIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C62828',
  },

  errorText: {
    fontSize: 13,
    color: '#D32F2F',
    marginTop: 2,
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 28,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    color: '#666',
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },

  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
  },

  eyeButton: {
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },

  eyeIcon: {
    fontSize: 20,
  },

  button: {
    backgroundColor: '#208AEF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  loadingText: {
    color: '#208AEF',
    textAlign: 'center',
    marginTop: 14,
    fontSize: 14,
  },

  registerText: {
    color: '#208AEF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
});