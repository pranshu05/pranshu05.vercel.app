import { ReactNode } from 'react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', size = 'sm' }) => {
    const variants = {
        default: 'bg-zinc-800 text-zinc-300',
        secondary: 'bg-zinc-700 text-zinc-200',
        success: 'bg-green-900/50 text-green-300 border border-green-800',
        warning: 'bg-yellow-900/50 text-yellow-300 border border-yellow-800',
        error: 'bg-red-900/50 text-red-300 border border-red-800'
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm'
    };

    return (
        <span className={`inline-flex items-center rounded-full font-medium${variants[variant]}${sizes[size]}`}>{children}</span>
    );
};

export default Badge;