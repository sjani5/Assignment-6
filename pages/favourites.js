import {React} from "react";
import { favouritesAtom } from '@/store';
import { useAtom } from "jotai";
import { Card, Col, Container, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard'; 
function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom);
    if(!favouritesList) return null;
    if (favouritesList.length > 0) {
        return (
            <Container>
              <Row>

                {favouritesList?.map((objectID) => (
                  <Col key={objectID} 
                  md={4} lg={3}
                  >
                    <ArtworkCard objectID={objectID} />
                  </Col>
                ))}
              </Row>
            </Container>
          );
    }
    return (
        <Card>
          <Card.Body>
          <h4>Nothing Here</h4>
          Try adding some new artwork to the list.
          </Card.Body>
        </Card>
      );  
}
export default Favourites;