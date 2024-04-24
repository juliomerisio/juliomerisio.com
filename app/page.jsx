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
export default function Page() {
  return (
    <>
      <div className='mx-auto flex flex-col overflow-hidden px-4 pb-6'>
        <Nav />
        <section className='grid h-[93.5dvh] grid-cols-12 grid-rows-4 gap-5 pt-[10dvh] lg:pt-[20dvh]'>
          <div className='col-span-11 row-span-2 grid lg:col-span-9'>
            <h1>Julio is a <br/> Design engineer</h1>
          </div>

          <div className='col-span-12 row-span-2 flex flex-col justify-between gap-5 self-end pb-6 align-baseline lg:flex-row'>
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
