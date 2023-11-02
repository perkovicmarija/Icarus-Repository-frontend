import React from 'react';
import BookmarkItem from './BookmarkItem';

const BookmarkItemChildren = ({ items, pdfLinkService, onZoomManualChange }) => {
    return (
        <div className="outlineItems">
            {items.map((item, index) => (
                <BookmarkItem
                    key={item.title + '-' + index}
                    item={item}
                    pdfLinkService={pdfLinkService}
                    onZoomManualChange={onZoomManualChange}
                />
            ))}
        </div>
    );
};

export default BookmarkItemChildren;
