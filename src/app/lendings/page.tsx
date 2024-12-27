import Lendings from "@/components/lendings/lendings";
import React, {Suspense} from 'react'

const Page = () => {
  return (
    <Suspense>
        <Lendings />
    </Suspense>
  )
}

export default Page;