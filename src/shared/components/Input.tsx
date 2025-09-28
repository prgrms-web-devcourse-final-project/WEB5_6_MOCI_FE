/**
 * 공통 인풋 컴포넌트
 */

import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.RefObject<HTMLInputElement | null>;
};

function Input({ ref: outRef, className, placeholder, ...rest }: InputProps) {
  return (
    <input
      ref={outRef}
      type="text"
      placeholder={placeholder}
      className={clsx(
        //공통 스타일
        "w-full h-[48px] rounded-lg border border-black px-3 py-2 text-xl",
        "placeholder:text-gray",
        "focus:outline-none focus:border-green-default focus:border-2",
        className
      )}
      {...rest}
    />
  );
}
export default Input;
