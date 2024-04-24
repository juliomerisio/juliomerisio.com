'use client'
import { Trusted } from '@/components/logos'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Image from 'next/image'

// const Scroll = dynamic(() => import('@/templates/Scroll').then((mod) => mod.default), { ssr: false })
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const Quad = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Quad), { ssr: false })
const Cap = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Cap), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

function Nav() {
  return (
    <nav className='grid  grid-cols-12 gap-5 pt-4 text-[12px] uppercase'>

      <a href='/resume-julio.pdf' className='link col-span-8 w-fit' target='_blank'>
        resume
      </a>
      <div className='col-span-4 flex w-fit items-center gap-4 justify-self-end'>
        <a href='https://github.com/juliomerisio/' target='_blank' className='link'>
          GitHub
        </a>
        <a href='https://twitter.com/juliomerisio/' target='_blank' className='link'>
          Twitter
        </a>

        <a className={'link'} href='mailto:contatomerisio@gmail.com'>EMAIL</a>
      </div>
    </nav>
  )
}

function Bento() {
  return (
    <div className='w-full'>
      <div className='grid grid-cols-6 gap-2 lg:grid-cols-12'>
        <div className='col-span-3 lg:col-span-5 lg:row-span-3'>
          <div className='relative h-[526px] overflow-hidden rounded-xl'>
            <Image
              src='/img/julio.webp'
              fill
              alt='Julio taking a selfie'
              className='scale-110 rounded-xl'
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className='col-span-3 rounded-xl lg:col-span-3 lg:row-span-3'>
          <div className='h-[526px] overflow-hidden '>
            <View className='flex size-full flex-col items-center justify-center rounded-xl'>
              <Quad />
            </View>
          </div>
        </div>

        <div className='col-span-6 row-span-6 rounded-xl lg:col-span-4 lg:row-span-5'>
          <div className='size-full h-[324px] rounded-xl bg-[#000000] lg:h-full'>
            <View className='flex size-full flex-col items-center justify-center rounded-xl'>
              <Suspense fallback={null}>
                <Cap>J</Cap>
                <Common />
              </Suspense>
            </View>
          </div>
        </div>

        <div className='col-span-6 row-span-2 lg:col-span-8'>
          <div className='relative  h-[324px] overflow-hidden '>
            <a
              aria-label='Recommendations on LinkedIn'
              href='https://www.linkedin.com/in/juliomerisio/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                fill
                src='/img/testimonials.webp'
                alt='Three post its in a corkboard'
                className='rounded-xl'
                style={{
                  objectFit: 'cover',
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function Page() {
  return (
    <>
      <div className='mx-auto flex flex-col overflow-hidden px-4 pb-6'>
        <Nav />
        <section className='grid h-[93.5dvh] grid-cols-12 grid-rows-4 gap-5 pt-[10dvh] lg:pt-[20dvh]'>
          <div className='col-span-11 row-span-2 grid lg:col-span-9'>
            <h1>Design engineer &mdash; dedication and love for the web.</h1>
          </div>

          <div className='col-span-12 row-span-2 flex flex-col justify-between gap-5 self-end pb-6 align-baseline lg:flex-row'>
            <div className='flex items-end'>
              <Trusted />
            </div>
            <div className='flex flex-col'>
              <span>INTERESTS</span>
              <p>MOTION &#8226; WEBGL &#8226; SVG &#8226; WEB STANDARDS</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
