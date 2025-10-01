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
        unsuccess(err)
    }
}

export const getUserByEmail = async (email,success,unsuccess)=>{
    console.log(`email : ${email}`)
    let userRefID
    try{
        let qry = query(usersColl,where("email","==",email))
        let qrySnapshot=  await getDocs(qry)
        qrySnapshot.forEach((doc)=>{
            userRefID = doc.ref
        })
        console.log(`userRefID : ${userRefID}`)

        qry = query(todosColl,where("user_id","==",userRefID))
        qrySnapshot = await getDocs(qry)
        qrySnapshot.forEach((doc)=>{
            success(doc)
        })
    }catch(err){
        unsuccess(err)
    }

}    