/**
 * 공통 인풋 컴포넌트
 */

import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Input({
  className,
  placeholder,
  ...rest
}:InputProps) {
  return (
    <input 
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
  )
}
export default Input