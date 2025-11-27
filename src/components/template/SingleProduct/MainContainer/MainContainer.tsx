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
    tags,
    findProduct,
  }: {
    isLoggedIn: boolean;
    findProductID: string;
    longDescription: string;
    userID: string;
    features: { title: string; description: string }[];
    tags: { _id: string; name: string }[];
    findProduct: any;
  }) => {
    return (
      <div>
        <NavbarContainer />
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
          <RelatedPro tags={tags} findProductID={findProductID.toString()} />
        </div>
      </div>
    );
  }
);

const NavbarContainer = memo(() => {
  return (
    <div>
      <Navbar />
    </div>
  );
});

MainContainer.displayName = "MainContainer";
NavbarContainer.displayName = "NavbarContainer";

export default MainContainer;
