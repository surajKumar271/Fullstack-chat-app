import {create} from 'zustand';
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from './useAuthStore';


export const useChatStore =create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    showOnlineOnly:false,




    getUsers:async()=>{
        set({isUsersLoading:true});
        try {
            const res=await axiosInstance.get("/messages/users");
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading:false});
        }
    },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to load messages");
        }finally{
            set({isMessagesLoading:false});
        }   

    },

    sendMessages:async(messageData)=>{
        const {selectedUser,messages}=get()
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData); 
            set({messages:[...messages,res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages:()=>{
        const {selectedUser}=get();
        if(!selectedUser) return;

        const socket =useAuthStore.getState().socket;

        
        socket.on("newMessage",(newmessage)=>{
            const isMessageSentFromSelectedUser= newmessage.senderId === selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;
            set({
                messages: [...get().messages,newmessage],
            });
        });
    },

    unsubscribeFromMessages:()=>{
        const socket =useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    // set the currently selected user
    setSelectedUser:(selectedUser)=>{
        console.log("useChatStore.setSelectedUser", selectedUser);
        set({selectedUser});
    },

    setShowOnlineOnly:(showOnlineOnly)=>{
        set({showOnlineOnly});
    },
}));