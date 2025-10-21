import React, { useContext, useEffect, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import Cadastro from '../pages/Cadastro/Index';
import Home from '../pages/Home/Index';
import Perfil from '../pages/Perfil/Index';
// import ConfigurarServidor from '../pages/ConfigurarServidor/Index';
import { AuthContext } from '../global/AuthContext';
import Cabecalho from '../components/Cabecalho';

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
  Perfil: undefined;
  ConfigurarServidor: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Routes() {
  const { usuario, carregando } = useContext(AuthContext);
  const rotaInicial = useMemo(() => (usuario ? 'Home' : 'Login'), [usuario]);

  return (
    <Stack.Navigator initialRouteName={rotaInicial}>
      
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cadastro" 
        component={Cadastro} 
  options={{ title: 'Crie sua conta', headerShown: false }} 
      />

        <Stack.Screen 
        name="Home" 
        component={Home} 
          options={{ headerShown: true, header: () => <Cabecalho /> }} 
      />
        <Stack.Screen 
          name="Perfil" 
          component={Perfil} 
            options={{ headerShown: true, header: () => <Cabecalho /> }} 
        />
        {/* <Stack.Screen 
          name="ConfigurarServidor" 
          component={ConfigurarServidor} 
          options={{ title: 'Configurar Servidor', headerShown: true }} 
        /> */}
      
    </Stack.Navigator>
  );
}