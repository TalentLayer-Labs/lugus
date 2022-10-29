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
            <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense'>
              <div className='mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0'>
                <div>
                  <div className='mt-6'>
                    <h2 className='text-3xl font-bold tracking-tight text-gray-900'>
                      Schedule A Claim
                    </h2>
                    <p className='mt-4 text-lg text-gray-500'>
                      Automatically claim and convert crypto from yield, escrow, and other types of
                      smart contracts.
                    </p>
                    <form>
                      <div className='mt-6'>
                        <label>
                          <p className='mt-4 text-lg text-gray-500'>
                            <strong>Choose Your Claimable Contract</strong>
                          </p>
                          <p className='mt-4 text-mc text-gray-500'>
                            Choose the smart contract you would like to claim earnings from.
                          </p>
                          <div className='mt-6'>
                            <select>
                              <option value='staking'>Mock Staking</option>
                              <option value='escrow'>Mock Escrow</option>
                            </select>
                          </div>
                        </label>
                      </div>
                      <div className='mt-6'>
                        <label>
                          <p className='mt-4 text-lg text-gray-500'>
                            <strong>Schedule Your Claim Frequency</strong>
                          </p>
                          <p className='mt-4 text-mc text-gray-500'>
                            Choose how frequently your earnings are auto-claimed by Lugus. Choose
                            "now" to claim once, without scheduling auto-claims.
                          </p>
                          <div className='mt-6'>
                            <select>
                              <option value='grapefruit'>Now</option>
                              <option value='lime'>Weekly</option>
                              <option selected value='coconut'>
                                Monthly
                              </option>
                            </select>
                          </div>
                        </label>
                      </div>
                      <div className='mt-6'>
                        <label>
                          <p className='mt-4 text-lg text-gray-500'>
                            <strong>Select Your Preffered Token</strong>
                          </p>
                          <p className='mt-4 text-md text-gray-500'>
                            Your claimed crypto will automatically be converted to your preffered
                            token when claimed.
                          </p>
                          <div className='mt-6'>
                            <select>
                              <option value='grapefruit'>USDC</option>
                              <option value='lime'>Ethereum</option>
                            </select>
                          </div>
                        </label>
                      </div>
                      <div className='mt-6'>
                        <input
                          type='submit'
                          value='Submit Claim Settings'
                          className='inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'
                        />
                        <p className='mt-4 text-lg text-gray-500'>
                          <i>
                            By submitting your claim settings, you will allow Lugus to claim and
                            exchange crypto on your behalf.
                          </i>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
