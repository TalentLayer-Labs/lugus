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
    args: [token, 100],
  });
  return (
    <div className='flex justify-center my-6'>
      {token_result.isLoading ? (
        'loeading'
      ) : (
        <button
          className='rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold'
          onClick={() => {
            write?.();
            console.log(data);
          }}>
          {token_result.isLoading ? 'Loading' : 'Ready to approve'}
        </button>
      )}
    </div>
  );
}
