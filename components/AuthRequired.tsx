import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;

  title?: string;
  message?: string;
};

const AuthRequiredModal = ({
  visible,
  onClose,
  onLogin,
  onRegister,
  title = "Login Required",
  message = "Please login or create an account to continue your purchase.",
}: Props) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Icon */}
          <Text style={styles.icon}>🔒</Text>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* Buttons */}
          <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
            <Text style={styles.registerText}>Create Account</Text>
          </TouchableOpacity>

          {/* Close */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>Maybe later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AuthRequiredModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  registerBtn: {
    width: "100%",
    backgroundColor: "#f1f1f1",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "600",
  },
  registerText: {
    color: "#333",
    fontWeight: "500",
  },
  closeText: {
    marginTop: 5,
    color: "#888",
    fontSize: 13,
  },
});

//! Usage Example:
/*
const [showAuthModal, setShowAuthModal] = useState(false);

const handleCheckout = () => {
  if (!user) {
    setShowAuthModal(true);
    return;
  }

  // proceed to checkout
};

<AuthRequiredModal
  visible={showAuthModal}
  onClose={() => setShowAuthModal(false)}
  onLogin={() => {
    setShowAuthModal(false);
    router.push("/login");
  }}
  onRegister={() => {
    setShowAuthModal(false);
    router.push("/register");
  }}
/>
*/
