import { PERMISSIONS, PermissionStatus as RNPermissionStatus, openSettings, request } from "react-native-permissions"
import { PermissionStatus } from "../../infrastructure/interfaces/permissions"
import { Platform } from "react-native"

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable'

    if(Platform.OS === 'ios'){
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    } else if (Platform.OS === 'android') {
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

    } else {
        throw new Error('Unsupport platform')
    }


    if(status === 'blocked') {
        await openSettings();
        // return await checkLocationPermission();
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        blocked: 'blocked',
        denied: 'denied',
        limited: 'limited',
        unavailable: 'unavailable',

    }

    return permissionMapper[status] ?? 'unavailable'
}

export const CheckLocationPermission = async (): Promise<PermissionStatus> => {}