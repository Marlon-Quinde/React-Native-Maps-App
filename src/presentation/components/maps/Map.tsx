import React from 'react';
import {Platform} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location } from '../../../infrastructure/interfaces/location';
import { FAB } from '../ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';


interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location
}

export const Map = ({showsUserLocation = true, initialLocation}: Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <>
      <MapView
      showsUserLocation={showsUserLocation}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{flex: 1}}
        region={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
            {/* <Marker 
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title='Test'
                description='Test'
                image={require('../../../assets/custom-marker.png')}
            /> */}
        </MapView>
        <FAB iconName='compass-outline' onPress={() => console.log('Hola mundo')} style={{bottom: 100, right: 20}}/>
        <FAB iconName='log-out-outline' onPress={() => navigation.navigate('PermissionsScreen')} style={{bottom: 20, right: 20}}/>
    </>
  );
};
