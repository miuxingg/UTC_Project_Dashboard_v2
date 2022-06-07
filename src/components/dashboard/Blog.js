import { Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';

const Blog = ({ image, title, subtitle, text, color }) => {
  return (
    <Card>
      <img alt='Card image cap' src={image} />
      <CardBody className='p-4' style={{ height: '250px' }}>
        <CardTitle tag='h5'>{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText
          className='mt-3'
          style={{ height: '96px', overflow: 'hidden' }}
        >
          {text}
        </CardText>
        {/* <Button color={color}>Read More</Button> */}
      </CardBody>
    </Card>
  );
};

Blog.propTypes = {
  title: PropTypes.string,
  image: PropTypes.any,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
};
export default Blog;
