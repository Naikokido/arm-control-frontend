import React from 'react';

const Container = ({ children }) => {
  return (
    <main className="flex-1 pb-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow">
          <div className="py-6">
            <div className="mx-auto px-6 lg:px-8">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Container;
