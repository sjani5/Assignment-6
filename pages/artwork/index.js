/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Shao Qiao  Student ID: 145954210  Date: 2023-11-17
*
*
********************************************************************************/ 

import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Card, Col, Pagination, Row } from 'react-bootstrap';
import Error from "next/error";
import ArtworkCard from '@/components/ArtworkCard'; // Import the ArtworkCard component
import validObjectIDList from '@/public/data/validObjectIDList.json'
const PER_PAGE = 12;

const Artwork = () => {
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
 
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  const [artworkList, setArtworkList] = React.useState(null);
  const [page, setPage] = React.useState(1);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  };

React.useEffect(() => {
    if (data) {
      const results = [];
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
    }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList !== null) {
    return (
      <div>
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1].map((currentObjectID) => (
              <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
              </Col>
            ))
          ) : (
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          )}
        </Row>

        {artworkList.length > 0 && (
          <Row className="justify-content-center">
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        )}
      </div>
    );
  }

  return null;
};

export default Artwork;