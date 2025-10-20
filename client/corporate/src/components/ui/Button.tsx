const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" {...props}>
    {children}
  </button>
);
export default Button;
