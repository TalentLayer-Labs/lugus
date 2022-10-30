import { useContractWrite, useToken } from '@web3modal/react';
import MockStacking from '../../contracts/MockStacking.json';
import SimpleERC20 from '../../contracts/SimpleERC20.json';

export default function Approve({ token }: any) {
  console.log(token);

  const token_result = useToken({
    address: token,
  });
  const { data, error, isLoading, write } = useContractWrite({
    address: token,
    abi: SimpleERC20.abi,
    functionName: 'approve',
    args: ['0x2d6a20e20911a27d0b4952f88e1dc80f43f18562', 100000000000000000],
  });
  // const { data, error, isLoading, write } = useContractWrite({
  //   address: '0x2d6A20e20911a27d0b4952f88e1dc80f43f18562',
  //   abi: MockStacking.abi,
  //   functionName: 'allowClaim',
  //   args: ['0x2cef87A124095d476A6F44d5ebF0d8E2F0c5b4D6'],
  // });
  return (
    <div className='flex justify-center my-6'>
      {token_result.isLoading ? (
        'loeading'
      ) : (
        <button
          className='rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold'
          onClick={() => {
            // write?.();
            console.log(error);
            write?.();
            console.log(data);
          }}>
          {token_result.isLoading ? 'Loading' : 'Ready to approve'}
        </button>
      )}
    </div>
  );
}
