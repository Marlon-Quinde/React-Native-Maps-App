import React, {PropsWithChildren, useEffect} from 'react';
import {AppState} from 'react-native';
import {usePermissionStore} from '../store/permissions/usePermissionStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';

export const PermissionsChecked = ({children}: PropsWithChildren) => {
  const {locationStatus, checkLocationPermission} = usePermissionStore();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if(locationStatus === 'granted'){
        navigation.reset({
            index: 0,
            routes: [{name: 'MapeoScreen'}]
        })
    } else if (locationStatus != 'undetermined') {
        navigation.navigate('PermissionsScreen')
    }
  }, [locationStatus]);


  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
};
