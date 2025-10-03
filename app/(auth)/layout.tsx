

import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div  className='flex h-full flex-col items-center justify-center'>
       <div className='space-y-4'>
         {children}
       </div>
    </div>
  )
}

export default layout