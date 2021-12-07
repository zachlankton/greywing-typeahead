import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CatSearch from '../components/CatSearch'

export default function Home() {


  return (
    <>
      <h1>Cat Search</h1>
      <CatSearch />
    </>
  )
}
