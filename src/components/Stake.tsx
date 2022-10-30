import { useContractWrite } from '@web3modal/react';
import MockStacking from '../../contracts/MockStacking.json';
import SimpleERC20 from '../../contracts/SimpleERC20.json';

export default function Stake({ token }: any) {
  console.log(token);
  const { data, error, isLoading, write } = useContractWrite({
    address: '0x2d6A20e20911a27d0b4952f88e1dc80f43f18562',
    abi: MockStacking.abi,
    functionName: 'stake',
    args: [token, 9400000],
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
