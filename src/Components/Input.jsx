import { forwardRef,useId} from "react";

const Input=forwardRef(function(
    {
        label,
        type='text',
        classname='',
        placeholder,
        ...otherProps
    },ref
){
    const id=useId()
    return(
        <div className='flex flex-col gap-y-2'>
            <label htmlFor={id}>
                {label}
            </label>
            <input 
                type={type} 
                placeholder={placeholder}
                className={`bg-white outline-none border-2 border-black rounded-lg px-3 py-2
                focus:border-gray-200 ${classname}`}
                ref={ref}
                id={id}
                {...otherProps}
            />
        </div>
    )
})

export default Input