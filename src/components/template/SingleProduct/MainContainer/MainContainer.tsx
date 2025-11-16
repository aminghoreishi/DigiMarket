import Navbar from "./Navbar";
import Description from "./Description";
import Specifications from "./Specifications";
import CommentContainer from "./Comment/CommentContainer";
import RelatedPro from "./RelatedPro/RelatedPro";
import { memo } from "react";

const MainContainer = memo(
  ({
    isLoggedIn,
    findProductID,
    userID,
    longDescription,
    features,
  }: {
    isLoggedIn: boolean;
    findProductID: string;
    longDescription: string;
    userID: string;
  }) => {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="mt-5">
          <Description longDescription={longDescription} />
        </div>
        <div className="mt-5">
          <Specifications features={features} />
        </div>
        <div className="mt-5">
          <CommentContainer
            userID={userID}
            isLoggedIn={isLoggedIn}
            findProductID={findProductID.toString()}
          />
        </div>
        <div className="mt-5">
          <RelatedPro />
        </div>
      </div>
    );
  }
);

export default MainContainer;
