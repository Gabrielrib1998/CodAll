import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProvedorAuth } from './src/global/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Simula carregamento inicial, por exemplo sessão do AuthContext
    const carregarInicial = async () => {
      setCarregando(false);
    };
    carregarInicial();
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ProvedorAuth>
          <Routes />
        </ProvedorAuth>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
