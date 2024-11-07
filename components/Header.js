export default function Header(props){
    return (
        <>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-700 mb-3 sm:mb-8">
                {props.children}
            </h1>
        </>
    );
}