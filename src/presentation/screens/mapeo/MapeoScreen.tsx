import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { API_URL } from '../../../config/api/general'

export const MapeoScreen = () => {

    const [peticion, setPeticion] = useState<any>()

    const getCountries = async ()  => {
        const response = await API_URL.get('/all')
        console.log(response.data)
        setPeticion(response) 
    }

    useEffect(  () => {
        getCountries()
        
    

    }, [])
    
  return (
    <View>
        { peticion? <Text>Hay data</Text> : <Text>Nada aun</Text>  }
    </View>
  )
}
