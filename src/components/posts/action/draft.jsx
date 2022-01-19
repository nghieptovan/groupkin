import React from 'react'

export const ExampleCustomInput = ({ condition, value, onClick }) => {
    return (
        <button className={"btn btn-custom ml10 bg-f0ad4e " + (condition ? 'require-status-success' : 'require-status-error')} onClick={onClick}>
            <i className="fas fa-calendar-day"></i>
            Lên lịch
        </button>
    )
}

