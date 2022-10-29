import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

const smartContracts = [
  {
    id: 1,
    unavailable: false,
    type: 'staking',
    name: 'Mock Staking',
    address: '0xAe46E37B5628947aC159F001a847E874521GAA20',
  },
  {
    id: 2,
    unavailable: false,
    type: 'escrow',
    name: 'Mock Escrow',
    address: '0xAe46E37B5628947aC159F001a847E874521GAA20',
  },
];

const schedule = [
  {
    id: 1,
    unavailable: false,
    type: 'now',
    name: 'Now',
  },
  {
    id: 2,
    unavailable: false,
    type: 'weekly',
    name: 'Weekly',
  },
  {
    id: 3,
    unavailable: false,
    type: 'monthly',
    name: 'Montly',
  },
];

const token = [
  {
    id: 1,
    unavailable: false,
    type: 'eth',
    name: 'Ethereum',
  },
  {
    id: 2,
    unavailable: false,
    type: 'escrow',
    name: 'USDC',
  },
];

export default function Content() {
  const [selectedSmartContract, setSelectedSmartContract] = useState(smartContracts[0]);
  const [selectedSchedule, setSelectedSchedule] = useState(schedule[0]);
  const [selectedToken, setSelectedToken] = useState(token[0]);
  return (
    <div className='bg-white'>
      <main>
        {/* Alternating Feature Sections */}

        <div className='min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
          <div className='mx-auto max-w-max'>
            <main className='sm'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900'>Schedule A Claim</h2>
              <p className='mt-4 text-lg text-gray-500'>
                Automatically claim and convert crypto from yield, escrow, and other types of smart
                contracts.
              </p>
              <form>
                {/* Form Field Contracts */}
                <div className='mt-6'>
                  <label>
                    <p className='mt-4 text-lg text-gray-500'>
                      <strong>Choose Your Claimable Contract</strong>
                    </p>
                    <p className='mt-4 text-mc text-gray-500'>
                      Choose the smart contract you would like to claim earnings from.
                    </p>
                    <div className='mt-6'>
                      <Listbox value={selectedSmartContract} onChange={setSelectedSmartContract}>
                        <div className='relative mt-1'>
                          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                            <span className='block truncate'>{selectedSmartContract.name}</span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                              <ChevronUpDownIcon
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'>
                            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                              {smartContracts.map(contract => (
                                <Listbox.Option
                                  key={contract.id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                  }
                                  value={contract}>
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                        }`}>
                                        {contract.name} <p>{contract.address}</p>
                                      </span>
                                      {selected ? (
                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </label>
                </div>
                {/* Form Field Schedule */}                   
                <div className='mt-6'>
                  <label>
                    <p className='mt-4 text-lg text-gray-500'>
                      <strong>Schedule Your Claim Frequency</strong>
                    </p>
                    <p className='mt-4 text-mc text-gray-500'>
                    Choose how frequently your earnings are auto-claimed by Lugus. Choose "now" to
                      claim once, without scheduling auto-claims.
                    </p>
                    <div className='mt-6'>
                      <Listbox value={selectedSchedule} onChange={setSelectedSchedule}>
                        <div className='relative mt-1'>
                          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                            <span className='block truncate'>{selectedSchedule.name}</span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                              <ChevronUpDownIcon
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'>
                            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                              {schedule.map(schedule => (
                                <Listbox.Option
                                  key={schedule.id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                  }
                                  value={schedule}>
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                        }`}>
                                        {schedule.name}
                                      </span>
                                      {selected ? (
                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>
                  </label>
                </div>
                {/* Form Field Token */}
                <div className='mt-6'>
                  <label>
                    <p className='mt-4 text-lg text-gray-500'>
                      <strong>Select Your Preffered Token</strong>
                    </p>
                    <p className='mt-4 text-mc text-gray-500'>
                    Your claimed crypto will automatically be converted to your preffered token
                      when claimed.
                    </p>
                    <div className='mt-6'>
                      <Listbox value={selectedToken} onChange={setSelectedToken}>
                        <div className='relative mt-1'>
                          <Listbox.Button className='relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                            <span className='block truncate'>{selectedToken.name}</span>
                            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                              <ChevronUpDownIcon
                                className='h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'>
                            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                              {token.map(token => (
                                <Listbox.Option
                                  key={token.id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                  }
                                  value={token}>
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected ? 'font-medium' : 'font-normal'
                                        }`}>
                                        {token.name}
                                      </span>
                                      {selected ? (
                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
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
                      By submitting your claim settings, you will allow Lugus to claim and exchange
                      crypto on your behalf.
                    </i>
                  </p>
                </div>
              </form>
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}
