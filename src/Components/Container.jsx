export default function Container({children}){
    return(
        <div className="w-full max-w-7xl flex justify-center items-center mx-auto">
            {children}
        </div>
    )
}