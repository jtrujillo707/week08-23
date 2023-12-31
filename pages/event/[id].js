import React from "react";
import Link from "next/link";
import {
    Box,
    Heading,
    SimpleGrid,
    Text
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import{
    doc,
    getDoc
} from "firebase/firestore";
import {db} from "../../firebase";
//import { getServerSideProps } from "next/dist/build/templates/pages";

// define the jsx component to show just one single to do in our ui
const EventItem = ({itemData}) => {
    // enforce user login
    const { user } = useAuth() || {};
    if (!user){
        return;
    }
    //if our code continues exectuion to here, a user is logged in
    // finally return the jsx component
    return(
        <Box mt={5} padding={"1%"}>
            <Heading as="h3" fontSize={"xl"}>
                {itemData.title}
            </Heading>
            <Text>
                {itemData.description}
            </Text>
            <Text>
                {itemData.status}
            </Text>
            <Text>
                {itemData.createdAt}
            </Text>
            <Link href="/" style={{ color: 'grey' }}>Return Home</Link>
        </Box>
    );
};

// define the REQUIRED getServerSideProps() funciton that Next.js will call
// when it gets a dynamically-routed URL: /todo/blah <- here the id will = blah
export async function getServerSideProps (context){
    // our function will receive all it needs from Next.js variable
    // if we want to get the url parameter that next.js set for id 'cause[id].js
    // context.params.id has it!
    let itemData = null; 
    // get a doc from firestore collection
    const docRef = doc(db,'event', context.params.id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists() ){
        itemData = docSnap.data();
    }
    return{
        props:{
            itemData
        }
    };
}   

// export the component
export default EventItem;