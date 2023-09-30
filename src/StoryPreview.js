import './StoryPreview.css';
function StoryPreview ({title, content, dateCreated}) {
    return (
        <div className="story-preview">
            <p><b>{title}</b></p>
            <p className="content">{content}</p>
            <p className="date">Date Created: {dateCreated}</p>
        </div>
    )
}

export default StoryPreview;