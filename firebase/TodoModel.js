import todosApp from './Connect'

import {getFirestore,collection,query,getDocs,orderBy,limit,where,addDoc,doc,updateDoc,deleteDoc} from 'firebase/firestore'

const db = getFirestore(todosApp)

const todosColl = collection(db,"todos")
const usersColl = collection(db,"users")


export const getAllTodos =async(success,unsuccess)=>{
    console.log("GetAllTodos active")
    try{
        const qry= query(todosColl)
        const qrySnapshot = await getDocs(qry)
        qrySnapshot.forEach((doc)=>{
            console.log(`Doc id: ${doc.id} => task: ${doc.data().task}`)
            success(doc)
        })
    }catch(err){
        unsuccess(e)
    }
}