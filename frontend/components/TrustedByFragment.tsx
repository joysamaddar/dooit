"use client"

import { gql, useQuery } from "@apollo/client"
import client from "../constants/apollo-client"

const totalUsers = gql`
query{
  totalUsers
}
`

export default function TrustedByFragment(){
  const { loading, error, data } = useQuery(totalUsers, {client})

  if(error){
    throw new Error("The backend server seems to be down")
  }

  return(
    <div className="w-full bg-dsecondary text-dlightblue text-md p-2 flex items-center justify-center">Trusted by over {loading? "0":`${data.totalUsers}+`} users!</div>
  )
}