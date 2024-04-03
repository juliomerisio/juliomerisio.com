import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import localFont from 'next/font/local'
const sfPro = localFont({ src: '../public/fonts/SFRounded-Regular-low.woff2' })

export const metadata = {
  title: 'Julio Merisio | Design Engineer',
  description: 'design engineer, dedication and love for the web',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={sfPro.className}>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
