import React from "react";
import {Row,Col} from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import {router,useRouter} from "next/router";
const ArtworkById = () => {
    const router = useRouter();
    const { objectID } = router.query;
  
    return (
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    );
  };
  
  export default ArtworkById;