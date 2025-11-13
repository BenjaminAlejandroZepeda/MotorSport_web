import Card from "react-bootstrap/Card";

function NewsCard({ title, imageUrl, body, link }) {
  return (
    <Card className="news-card">
      <div className="news-image-container">
        <Card.Img src={imageUrl} alt={title} className="news-image" />
      </div>

      <Card.Body className="news-content">
        <div>
          <Card.Title className="news-title">{title}</Card.Title>
          <Card.Text className="news-body">{body}</Card.Text>
        </div>
        {link && (
          <small className="caption">
            <a href={link} target="_blank" rel="noopener noreferrer">
              Leer más
            </a>
          </small>
        )}
      </Card.Body>
    </Card>
  );
}

export default NewsCard;