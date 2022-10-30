import { useContractWrite, useToken } from '@web3modal/react';
import LugusSwapper from '../../contracts/LugusSwapper.json';
import SimpleERC20 from '../../contracts/SimpleERC20.json';
// claim and swap for eth
export default function Swap({ token }: any) {
  console.log(token);
  const { data, error, isLoading, write } = useContractWrite({
    address: '0x2cef87A124095d476A6F44d5ebF0d8E2F0c5b4D6',
    abi: LugusSwapper.abi,
    functionName: 'claimAndSwapForEth',
    args: ['0x2d6A20e20911a27d0b4952f88e1dc80f43f18562', token],
    gasLimit: 1000000,
  });
  return (
    <div className='flex justify-center my-6'>
      <button
        className='rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold'
        onClick={() => {
          write?.();
          console.log(data);
          console.log(error);
        }}>
        {isLoading ? 'Loading' : 'Swaped!'}
      </button>
    </div>
  );
}
