import { supabase } from "@/lib/supabase"
import { Session } from "@supabase/supabase-js"
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"

type AuthData = {
    session: Session | null,
    loading: boolean,
    profile: any,
    isAdmin: boolean
}

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false
})

export default function AuthProvider({children}:PropsWithChildren){
    const [session,setSession]=useState<Session | null>(null)
    const [profile,setProfile]=useState(null)
    const [loading,setLoading]=useState(true)
    

    useEffect(()=>{
        //console.log("Auth provider is mounted")
        const fetchSession = async () => {
            const {data: {session}} = await supabase.auth.getSession();
            //console.log(data.session)
            setSession(session)


            if (session) {
            // fetch profile
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
            setProfile(data || null);
            }

            setLoading(false)
        }

        fetchSession()

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        });


    },[])
    
    //console.log(profile)

    return (
        <AuthContext.Provider value={{session, loading, profile, isAdmin: profile?.group =="ADMIN"}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)




