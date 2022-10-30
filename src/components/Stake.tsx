import { useContractWrite, useToken } from '@web3modal/react';
import MockStacking from '../../contracts/MockStacking.json';
import SimpleERC20 from '../../contracts/SimpleERC20.json';

export default function Stake({ token }: any) {
  console.log(token);
  const { data, error, isLoading, write } = useContractWrite({
    address: token,
    abi: MockStacking.abi,
    functionName: 'stake',
    args: [token, 1],
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
        {isLoading ? 'Loading' : 'Stacked!'}
      </button>
    </div>
  );
}
