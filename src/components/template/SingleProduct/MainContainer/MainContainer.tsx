import Navbar from "./Navbar";
import Description from "./Description";
import Specifications from "./Specifications";
import CommentContainer from "./Comment/CommentContainer";
import RelatedPro from "./RelatedPro/RelatedPro";

function MainContainer({ isLoggedIn, findProductID , userID , longDescription }: { isLoggedIn: boolean; findProductID: string; longDescription: string }) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-5">
        <Description longDescription={longDescription} />
      </div>
      <div className="mt-5">
        <Specifications />
      </div>
      <div className="mt-5">
        <CommentContainer userID={userID} isLoggedIn={isLoggedIn} findProductID={findProductID} />
      </div>
      <div className="mt-5">
        <RelatedPro />
      </div>
    </div>
  );
}

export default MainContainer;
