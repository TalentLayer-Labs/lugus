import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className='bg-white'>
      {/* Hero section */}
      <div className='relative'>
        <div className='absolute inset-x-0 bottom-0 h-1/2 bg-white' />
        <div className='mx-auto py-10 max-w-7xl sm:px-6 lg:px-8'>
          <div className='relative shadow-xl sm:overflow-hidden sm:rounded-2xl'>
            <div className='absolute inset-0'>
              <img
                className='h-full w-full object-cover'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiowYceGGqXVty5XET-gp1PkKHiQqIxoYNvIVS-uj5eCxA1Aaf3QaFE0XAdkusj_R_Srs&usqp=CAU'
                alt='People working on laptops'
              />
              <div className='absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply' />
            </div>
            <div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8'>
              <h1 className='text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
                <span className='block text-white'>Meet Lugus</span>
                <span className='block text-indigo-200'>the automatic claim aggregator & scheduler</span>
              </h1>
              <p className='mx-auto mt-6 max-w-lg text-center text-xl text-indigo-200 sm:max-w-3xl'>
              Claim tokens from yield or escrow contracts. Convert baskets to your preferred token. Schedule payouts. All in one click!
              </p>
              <div className='mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center'>
                <div className='space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0'>
                  <Link
                    to='/dashboard'
                    className='flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-8'>
                    Schedule Claims
                  </Link>
                  <a
                    href='/dashboard'
                    className='flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8'>
                    View My Scheduled Claims
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
