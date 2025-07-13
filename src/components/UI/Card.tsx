import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false, padding = 'md' }) => {
    const paddingClasses = {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6'
    };

    return (
        <div className={`bg-zinc-900/50 border border-zinc-800/50 rounded-lg backdrop-blur-sm${hover ? 'hover:bg-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300' : ''}${paddingClasses[padding]}${className}`}>{children}</div>
    );
};

export default Card;