import React, { useRef, useState, useContext } from "react";
import { Text, Image, View, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./styles";
import Logo from "../../Assets/logo.png";
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from "../../components/input";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../global/AuthContext";

export default function Login() {
  const navigation = useNavigation<any>();
  const { entrar } = useContext(AuthContext);

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  // Função de login usando AuthContext
  async function handleLogin() {
    if (!usuario.trim() || !password.trim()) {
      return Alert.alert('Atenção', 'Preencha todos os campos!');
    }

    try {
      setLoading(true);

      // Chama o AuthContext para login
      await entrar(usuario.trim(), password.trim());

      // Limpar campos
      setUsuario('');
      setPassword('');
      Keyboard.dismiss();

      // Navegar para Home
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });

    } catch (error: any) {
      console.log('[Login] erro:', error.message || error);

      Alert.alert(
        'Erro ao entrar',
        error.message || 'Usuário ou senha inválidos!'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80' }}
        style={styles.fundo}
        resizeMode="cover"
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.containerLogin}>
            <View style={styles.boxLogo}>
              <Image source={Logo} />
              <Text style={styles.text}>
                Entre para continuar sua jornada na programação !!
              </Text>
            </View>

            <View>
              <Input
                value={usuario}
                onChangeText={setUsuario}
                title="E-mail"
                placeholder="Digite seu e-mail"
                IconRightName="email"
                IconRight={MaterialIcons}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />

              <Input
                value={password}
                onChangeText={setPassword}
                title="Senha"
                placeholder="Digite sua senha"
                secureTextEntry={!passwordVisible}
                IconRightName={passwordVisible ? "eye" : "eye-closed"}
                onIconRightPress={() => setPasswordVisible(!passwordVisible)}
                IconRight={Octicons}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                ref={passwordRef}
              />
            </View>

            <View style={styles.boxButton}>
              <Button
                type="primary"
                title={loading ? 'Carregando...' : 'Entrar'}
                onPress={handleLogin}
                disabled={loading}
                loading={loading}
                style={styles.button}
              />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.textButtonCadastrar}>
                Não possui uma conta?{' '}
                <Text style={styles.textButtonCadastrarAqui}>Cadastre-se aqui!</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}