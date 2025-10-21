import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProvedorAuth } from './src/global/AuthContext';
import api from './src/services/api';

export default function App() {
  const [pronto, setPronto] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/usuarios')
      .then(response => {
        console.log('Usuários:', response.data);
        setPronto(true);
      })
      .catch(error => console.log(error));
  }, []);

  if (!pronto) return null; // ou coloque um spinner se quiser

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