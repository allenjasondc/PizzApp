import { View, Text, ActivityIndicator } from 'react-native';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import {useAuth} from '@/providers/AuthProvider';
import { supabase } from "@/lib/supabase"


const index = () => {

  const {session, loading} = useAuth()

  //console.log(session)
  if(loading){
    return <ActivityIndicator />
  }

  if(!session){
    //{console.log("auto direct")}
    return <Redirect href={"/sign-in"} />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={'/sign-in'} asChild>
        <Button text="Sign in" />
      </Link>
        <Button text="Sign out" onPress={()=>supabase.auth.signOut()}/>
    </View>
  );
};

export default index;