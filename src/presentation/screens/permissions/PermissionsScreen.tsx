import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { globalStyles } from '../../../config/theme/styles'
import { usePermissionStore } from '../../store/permissions/usePermissionStore'
import { Map } from '../../components/maps/Map';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const PermissionsScreen = () => {

  const {locationStatus, requestLocationPermission} = usePermissionStore();

  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  if(locationStatus === 'granted') {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
        <Text>Elija la pantalla a navegar</Text>
        <Pressable
          style={globalStyles.btnPrimary}
          onPress={() => navigation.navigate('MapScreen')}
        >
          <Text style={{color:  'white', textAlign: 'center'}}>Mapa</Text>
        </Pressable>
        <Pressable
          style={{...globalStyles.btnPrimary, marginTop: 4}}
          onPress={() => navigation.navigate('MapeoScreen')}
        >
          <Text style={{color:  'white', textAlign: 'center'}}>Mapeo</Text>
        </Pressable>
        <Pressable
          style={{...globalStyles.btnPrimary, marginTop: 4}}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={{color:  'white', textAlign: 'center'}}>LoginScreen</Text>
        </Pressable>

    </View>
    )
  }


  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
        <Text>Habilitar Ubicación</Text>
        <Pressable
          style={globalStyles.btnPrimary}
          onPress={requestLocationPermission}
        >
          <Text style={{color:  'white', textAlign: 'center'}}>Habilitar Localización</Text>
        </Pressable>

        <Text>Estado actual: {locationStatus} </Text>
    </View>
  )
}
