import Geolocation from '@react-native-community/geolocation';
import { Location } from '../../infrastructure/interfaces/location';


export const getCurrentLocation = async (): Promise<Location> => {

    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition((info: any) => {


            resolve({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            })

        }, (error: any) => {
            console.log(error)
            reject(error)
        }, {
            enableHighAccuracy: true
        })
    })
}