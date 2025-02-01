import { Toaster } from 'sonner';

const Toast = () => (
    <Toaster
        visibleToasts={3}
        position="bottom-center"
        theme="dark"
        className="fixed"
        offset="calc(8px + 0.9lh)" />
);

export default Toast;