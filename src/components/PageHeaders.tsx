import React from 'react';

interface Props {
    title: string;
    subTitle: string;
}

const PageHeaders: React.FC<Props> = ({ title, subTitle }) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <div>
                <p className="text-xs text-slate-500 dark:text-gray-400">{subTitle}</p>
                <h2 className="text-xl font-medium dark:text-white">{title}</h2>
            </div>
        </div>
    );
};

export { PageHeaders };
