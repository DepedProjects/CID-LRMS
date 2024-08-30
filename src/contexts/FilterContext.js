import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        gradeLevel: '',
        learningArea: '',
        resourceType: '',
        // other filters
    });

    const resetFilters = () => {
        setFilters({
            gradeLevel: '',
            learningArea: '',
            resourceType: '',
            // reset other filters
        });
    };

    return (
        <FilterContext.Provider value={{ filters, setFilters, resetFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => useContext(FilterContext);