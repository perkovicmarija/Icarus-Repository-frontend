import React, { useState } from 'react';
import BookmarkItemChildren from './BookmarkItemChildren';

const bookmarkStyling = (item) => {
    let className = '';
    if (item.bold) {
        className += 't-bold ';
    }
    if (item.italic) {
        className += 't-italic';
    }
    return className;
};

const BookmarkItem = ({ item, pdfLinkService, onZoomManualChange }) => {
    const [toggled, setToggled] = useState(false);

    const toggleOnClick = () => {
        setToggled(!toggled);
    };

    const onBookmarkClick = () => {
        if (item.dest) {
            pdfLinkService.navigateTo(item.dest);
            onZoomManualChange('page-actual');
        }
        return false;
    };

    let toggleClass = toggled ? 'outlineItemToggler' : 'outlineItemToggler outlineItemsHidden';

    return (
        <div className="outlineItem">
            {item.items.length > 0 && (
                <div className={toggleClass} onClick={toggleOnClick}></div>
            )}
            <a className={bookmarkStyling(item)} onClick={onBookmarkClick}>
                {item.title}
            </a>
            <BookmarkItemChildren items={item.items} pdfLinkService={pdfLinkService} onZoomManualChange={onZoomManualChange} />
        </div>
    );
};

export default BookmarkItem;
