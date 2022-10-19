import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';


const HEIGHT = Dimensions.get('window').height;

const Spinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center',
        alignItems: 'center',
        height: HEIGHT - 100,
        marginBottom: 100,
    },
})

export default Spinner;

