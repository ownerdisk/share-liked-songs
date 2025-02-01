interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    hidden?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="button w-full flex items-center appearance-none bg-gray-200 rounded-full border-0 text-gray-800 cursor-pointer text-base justify-center min-h-[calc(1.5rem+16px)] select-none disabled:cursor-default disabled:opacity-65 focus:outline-2 focus:outline-gray-200 focus:outline-offset-2 hover:scale-105" type="button"
        >
            {children}
        </button>
    )
}

export default Button