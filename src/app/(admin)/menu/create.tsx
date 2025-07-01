import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native"
import { defaultPizzaImage } from "@/components/ProductListItem"
import Button from "@/components/Button"
import { useEffect, useState } from "react"
import Colors from "@/constants/Colors"
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from "@/api/products"
import { randomUUID } from "expo-crypto"
import { supabase } from "@/lib/supabase"
import * as FileSystem from 'expo-file-system'
import {decode} from 'base64-arraybuffer'

const CreateProductScreen = () => {
    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [errors,setErrors] = useState('')
    const [image,setImage] = useState<string | null>(null)

    const {id: idString} = useLocalSearchParams()
    const id = parseFloat(
        typeof idString == "string" ? idString: idString?.[0]
    )

    const isUpdating = !!idString


    const {mutate: insertProduct} = useInsertProduct()
    const {mutate: updateProduct} = useUpdateProduct()
    const {data: updatingProduct} = useProduct(id)
    const {mutate: deleteProduct} = useDeleteProduct()

    const router = useRouter()

    useEffect(() => {
        if(updatingProduct) {
            setName(updatingProduct.name)
            setPrice(updatingProduct.price.toString())
            setImage(updatingProduct.image)
        }
    }, [updatingProduct])

    //console.log(isUpdating)

    const resetField = () => {
        setName('')
        setPrice('')
        setErrors('')
    }

    const onCreate = async () => {

        if(!validateInput()){
            return
        }

        const imagePath = await uploadImage()

        console.log("create product")
        
        //Save in the database
        insertProduct(
        { name, image: imagePath, price:parseFloat(price) },
        {
            onSuccess: () => {
                resetField()
                router.back()
            }
        })
    }

    const onUpdate = async () => {

        if(!validateInput()){
            return
        }

        const imagePath = await uploadImage()

        console.log("updating product")
        
        //Save in the database
        updateProduct({id, name ,image: imagePath ,price:parseFloat(price)},{
            onSuccess: () => {
                resetField()
                router.back()
            }
        })

    }

    const onDelete = () => {
        console.warn("Na delete")   
        deleteProduct(id,{
            onSuccess: () => {
                resetField()
                router.replace("/(admin)")
            }
        })
    }

    const onSubmit = () => {

        if(isUpdating){
            onUpdate()
        } else {
            onCreate()
        }
    }

    const confirmDelete = () => {
        console.warn("DELETE!!!!!")

        Alert.alert("Confirm", "Are you sure you want to delete this item?",
            [
                {
                    text: "Cancel",
                },
                {
                    text: 'Delete',
                    //style: "destructive", //pang iphone
                    onPress: onDelete
                }
            ]
        )




    }


    
    const validateInput = () => {
        if(!name) {
            setErrors('Name is required.')
            return false
        }
        if(!price) {
            setErrors('Price is required.')
            return false
        }
        if(isNaN(parseFloat(price))) {
            setErrors('Price is not a number.')
            return false
        }

        return true
    }


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        }
    };




    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(image, {
            encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, decode(base64), { contentType });

        if (error) {
            console.log(error)
        }

        if (data) {
            return data.path;
        }
    };


    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdating ? "Update product":"Create Product"}} /> 


            <Image style={styles.image} source={{uri: image || defaultPizzaImage}} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>


            <Text style={styles.label}>Name</Text>
            <TextInput 
                style={styles.input} 
                value={name}
                onChangeText={setName}
                placeholder="test pizza name" 
            />

            <Text style={styles.label}>Price ($)</Text>
            <TextInput 
                style={styles.input} 
                value={price}
                onChangeText={setPrice}
                placeholder="69" 
                keyboardType="decimal-pad"
            />

            <Text style={styles.errorText}>{errors}</Text>
            <Button 
                text={isUpdating ?"Update":"Create"} 
                onPress= {onSubmit}
            />
            {isUpdating && <Text style={styles.textButton} onPress={confirmDelete}>Delete</Text>}
        </View>
    )
}








const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        padding: 10,
        justifyContent: "center"
    },
    image: {
        width: "50%",
        aspectRatio: 1,
        alignSelf: "center",
        resizeMode: "contain"
    },
    input: {
        backgroundColor: "gainsboro",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20
    },
    label: {
        color: "gray",
        fontSize: 16
    },
    errorText: {
        color: "red",
        fontWeight:"600"
    },
    textButton: {
        alignSelf: "center",
        fontWeight: "bold",
        color: Colors.light.tint,
        marginVertical: 10
    },
})


export default CreateProductScreen