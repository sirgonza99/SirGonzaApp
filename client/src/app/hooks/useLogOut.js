"use client";
import { useRouter } from "next/navigation";
import { useLogOutMutation } from "@/redux/services/userApi";
import { useState } from "react";

export const useLogOut = () => {
    const [isRedirecting,setIsRedirecting]=useState(false)
    const router = useRouter();
    const [logOut] = useLogOutMutation();

    const logout=async()=>{
        setIsRedirecting(true);
        if ('serviceWorker' in navigator) {
            try {
                // Tomamos el Service Worker que está corriendo actualmente
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.getSubscription();
                if (subscription) {
                    await subscription.unsubscribe(); // Desactiva el token push localmente
                        console.log("Suscripción Push cancelada con éxito.");
                    }
                } catch (swError) {
                    console.error("Error al eliminar el Service Worker: ", swError);
                }
        }
            
        try{
            await logOut().unwrap();
            router.push("/IniciarSesion");
        } catch (error) {
            console.log("Error al cerrar sesion: " + error.data);
        } 
    }

    return {logout,isRedirecting}
}
