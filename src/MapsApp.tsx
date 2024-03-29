import 'react-native-gesture-handler';
import 'react-native-svg';

import {enableLatestRenderer} from 'react-native-maps';


import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { PermissionsChecked } from './presentation/providers/PermissionsChecked';

enableLatestRenderer();
export const MapsApp = () => {
  return (
    <NavigationContainer>
      <PermissionsChecked>
        <StackNavigator />
      </PermissionsChecked>
    </NavigationContainer>
  )
}
