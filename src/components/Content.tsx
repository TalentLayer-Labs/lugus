export default function Content() {
  return (
    <div className='bg-white'>
      <main>
        {/* Alternating Feature Sections */}
        <div className='relative overflow-hidden pt-16 pb-32'>
          <div
            aria-hidden='true'
            className='absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100'
          />

          <div className='relative'>
            <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8'>
              <div className='mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0'>
                <div>
                  <div className='mt-6'>
                    <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
                      One-Click Claim Management
                    </h2>
                    <p className='mt-4 text-lg text-gray-500'>
                      Lugus allows users to automatically claim and convert crypto from yield,
                      escrow, and other types of smart contracts; turning complicated claim
                      management workflows into a single one-click step.
                    </p>
                    <div className='mt-6'>
                      <a
                        href='/dashboard'
                        className='inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'>
                        Launch Dapp
                      </a>
                    </div>
                  </div>
                </div>
                <div className='mt-8 border-t border-gray-200 pt-6'></div>
              </div>
              <div className='mt-12 sm:mt-16 lg:mt-0'>
                <div className='-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
                  <img
                    className='w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
                    src='public/lugus.webp'
                    alt='Inbox user interface'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='mt-24'>
            <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8'>
              <div className='mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0'>
                <div>
                  <div className='mt-6'>
                    <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
                      Schedule Claims. Convert Claimed Tokens to Your Favorite Crypto.
                    </h2>
                    <p className='mt-4 text-lg text-gray-500'>
                      Go from having claimable tokens across dozens of contracts to receiving
                      scheduled payments in your preferred crypto token; automatically converted and
                      sent to your wallet on a weekly or monthly basis.
                    </p>
                    <div className='mt-6'>
                      <a
                        href='/dashboard'
                        className='inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'>
                        Schedule a Claim
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-12 sm:mt-16 lg:col-start-1 lg:mt-0'>
                <div className='-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
                  <img
                    className='w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none'
                    src='public/popup.webp'
                    alt='Customer profile user interface'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='relative'>
            <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8'>
              <div className='mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0'>
                <div>
                  <div className='mt-6'>
                    <h2 className='text-3xl text-white font-bold tracking-tight text-gray-900'>
                      Ready to use Web3 boilerplate
                    </h2>
                    <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
                      Conjure Lugus: The Patron God of Trade
                    </h2>
                    <p className='mt-4 text-lg text-gray-500'>
                      According to Lusitanian mythology, Lugus is the patron god of trade. This
                      three-faced god was worshiped by Lusithians living in modern-day Porgugal and
                      broader Iberia. Empowered by Lugus, you can wield godly power over your yield
                      and escrow claims; trading to your favorite token at your desire.
                    </p>
                    <div className='mt-6'>
                      <a
                        href='/dashboard'
                        className='inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'>
                        Launch Dapp
                      </a>
                    </div>
                  </div>
                </div>
                <div className='mt-8 border-t border-gray-200 pt-6'></div>
              </div>
              <div className='mt-12 sm:mt-16 lg:mt-0'>
                <div className='-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0'>
                  <img
                    className='w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none'
                    src='public/dash.webp'
                    alt='Inbox user interface'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
