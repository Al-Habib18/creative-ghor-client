/** @format */

const ErrorMessage = ({
    message = "Something went wrong.",
}: {
    message?: string;
}) => {
    return (
        <div className="text-center text-red-500 py-4">
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;
