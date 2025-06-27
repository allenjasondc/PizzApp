import Button from "@/components/Button"
import Colors from "@/constants/Colors"
import { Link, Redirect, Stack } from "expo-router"
import { useState } from "react"
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { supabase } from "@/lib/supabase"



const SignIn = () => { 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorText,setErrorText] = useState('')
    const [loading,setLoading]=useState(false)

    async function signInWithEmail() {
        setLoading(true)
        const {error} = await supabase.auth.signInWithPassword({email, password})

        if(error){ 
            Alert.alert(error.message) 
            setLoading(false)
            return
        }

        setLoading(false)
        resetField()
    }

    const resetField = () => {
        setEmail('')
        setPassword('')
        setErrorText('')
    }

    const validateLogin = () => {
        
        if (!email) {
            setErrorText('Email is required')
            return false
        }

        if (!password) {
            setErrorText('Password is required')
            return false
        }
        
        return true
    }


    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: "Sign In"}} />

            <Text style={styles.label}>Email</Text>
            <TextInput 
                style={styles.inputBox}
                placeholder="sample@gmail.com"
                value={email}
                onChangeText={setEmail}
                inputMode="email"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.inputBox}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />


            <Text style={styles.errorText}>{errorText}</Text>
            <Button onPress={signInWithEmail} disabled={loading} text={loading?"Signing in...":"Sign in"} />
            <Link style={styles.createLabel} href="/sign-up" >
                Create an account
            </Link>
            
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        flex: 1,
        justifyContent:"center",
    },
    label: {
        fontSize: 16,
        fontWeight: "500"
    },
    inputBox: {
        backgroundColor: 'gainsboro',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
        padding: 10
    },
    createLabel: {
        marginTop: 10,
        color: Colors.light.tint,
        alignSelf: "center"
    },
    errorText: {
        color: "red",
        fontSize: 16,
        fontWeight: "600"
    },
})




export default SignIn