export default function Logo() {
  return (
    <div className='bg-white'>
      <main>
        {/* Logo Cloud */}
        <div className='bg-gray-100'>
          <div className='mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8'>
            <p className='text-center text-base font-semibold text-gray-500'>
              We're Proudly Built With
            </p>
            <div className='mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5'>
              <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                <img
                  className='h-12'
                  src='https://upload.wikimedia.org/wikipedia/en/2/24/Polygon_blockchain_logo.png'
                  alt='Polygon'
                />
              </div>
              <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                <img
                  className='h-12'
                  src='https://cronoscan.com/images/logo.svg?v=22.10.3.0'
                  alt='Chronos'
                />
              </div>
              <div className='col-span-1 flex justify-center md:col-span-2 lg:col-span-1'>
                <img className='h-12' src='https://altlayer.io/logo.svg' alt='AltLayer' />
              </div>
              <div className='col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1'>
                <img
                  className='h-12'
                  src='https://authentrend.com/wp-content/uploads/2020/11/walletconnect-logo.e1cb8d21.png'
                  alt='WalletConnect'
                />
              </div>
              <div className='col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1'>
                <img
                  className='h-12'
                  src='https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png'
                  alt='React'
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
